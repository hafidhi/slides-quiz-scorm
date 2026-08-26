// src/utils/userDataExtractor.ts
export interface UserData {
    name: string
    email: string
    photoUrl: string
}

/**
 * Mengekstrak data pengguna dari string HTML halaman utama LMS.
 * Mencari tag <script id="__NEXT_DATA__"> dan mem-parsing JSON-nya.
 */
const extractFromHtml = (html: string): UserData | null => {
    const regex = /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
    const match = html.match(regex)
    if (!match) return null
    try {
        const data = JSON.parse(match[1])
        const session = data.props?.pageProps?.session
        if (session?.user) {
            const user = session.user
            if (user.name && user.email && user.image_url) {
                return {
                    name: user.name,
                    email: user.email,
                    photoUrl: user.image_url,
                }
            }
        }
    } catch (e) {
        console.warn('Failed to parse __NEXT_DATA__ from HTML', e)
    }
    return null
}

/**
 * Fallback: ekstrak data dari DOM menggunakan selektor yang sudah dikenal.
 */
// const extractFromDOM = (doc: Document): UserData | null => {
//   let name = "";
//   let email = "";
//   let photoUrl = "";

//   // Desktop dropdown
//   const desktopName = doc.querySelector(
//     ".navbar-dropdown .has-text-weight-semibold",
//   );
//   const desktopEmail = doc.querySelector(
//     ".navbar-dropdown .is-size-7.has-text-weight-light",
//   );
//   const desktopPhoto = doc.querySelector(
//     ".navbar-dropdown .is-rounded.thumb-profile",
//   );
//   if (desktopName && desktopEmail && desktopPhoto) {
//     name = desktopName.textContent?.trim() || "";
//     email = desktopEmail.textContent?.trim() || "";
//     photoUrl = (desktopPhoto as HTMLImageElement).src || "";
//     if (name && email && photoUrl) return { name, email, photoUrl };
//   }

//   // Mobile menu
//   const mobileNameSpan = doc.querySelector(".user-media-list .has-text-light");
//   if (mobileNameSpan) {
//     const text = mobileNameSpan.textContent?.trim() || "";
//     const match = text.match(/Hi,\s*(.*?)\s*!/);
//     name = match ? match[1].trim() : text;
//   }
//   const mobileEmail = doc.querySelector(
//     ".user-media-list .media-content .content p + p",
//   );
//   if (mobileEmail) email = mobileEmail.textContent?.trim() || "";
//   const mobilePhoto = doc.querySelector(
//     ".user-media-list .img-circle.thumb-profile",
//   );
//   if (mobilePhoto) photoUrl = (mobilePhoto as HTMLImageElement).src || "";
//   if (name && email && photoUrl) return { name, email, photoUrl };

//   // Fallback: cari elemen dengan atribut umum
//   if (!name) {
//     const anyName = doc.querySelector(
//       "[data-user-name], [data-name], .user-name, .user_name",
//     );
//     if (anyName) name = anyName.textContent?.trim() || "";
//   }
//   if (!email) {
//     const anyEmail = doc.querySelector(
//       "[data-user-email], [data-email], .user-email, .user_email",
//     );
//     if (anyEmail) email = anyEmail.textContent?.trim() || "";
//   }
//   if (!photoUrl) {
//     const anyPhoto = doc.querySelector('img[src*="GetPhotoUrl"]');
//     if (anyPhoto) photoUrl = (anyPhoto as HTMLImageElement).src;
//   }

//   if (name && email && photoUrl) return { name, email, photoUrl };
//   return null;
// };

/**
 * Ekstrak data pengguna dari halaman https://klc2.kemenkeu.go.id/.
 * Hanya berfungsi jika aplikasi berjalan di domain yang sama (same-origin).
 * Saat berjalan di localhost, mengembalikan data dummy untuk pengembangan.
 */
export const extractUserData = async (): Promise<UserData | null> => {
    const TARGET_ORIGIN = 'https://klc2.kemenkeu.go.id'

    // Data dummy untuk pengembangan atau saat tidak berada di klc2
    const dummyData: UserData = {
        name: 'Muhammad Al Hafidhi',
        email: 'al.hafidhi@kemenkeu.go.id',
        photoUrl:
            'https://aset-satu.kemenkeu.go.id/api/photo/GetPhotoUrl/KYu1d5HMZVLRY89Tg7ADu45yPMK2k_HZRcZWbXY2Tr0',
    }

    // Jika berjalan di localhost, kembalikan data dummy
    if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
    ) {
        return dummyData
    }

    // Jika tidak di domain target, gunakan data dummy juga
    if (window.location.origin !== TARGET_ORIGIN) {
        console.warn('Not running on klc2.kemenkeu.go.id, using dummy data')
        return dummyData
    }

    try {
        // Fetch halaman utama (same-origin, cookie sesi akan ikut)
        const response = await fetch('/', {
            credentials: 'include',
            headers: { Accept: 'text/html' },
        })
        if (response.ok) {
            const html = await response.text()
            const userData = extractFromHtml(html)
            if (userData) {
                console.log(
                    'User data extracted from https://klc2.kemenkeu.go.id/',
                )
                return userData
            }
        } else {
            console.warn(`Failed to fetch homepage: ${response.status}`)
        }
    } catch (e) {
        console.warn('Fetch to homepage failed:', e)
    }

    return null
}
