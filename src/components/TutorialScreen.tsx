// src/components/TutorialScreen.tsx
import VideoTutorialPlayer from './VideoTutorialPlayer'

interface TutorialScreenProps {
    onUnderstand: () => void
}

const TutorialScreen: React.FC<TutorialScreenProps> = ({ onUnderstand }) => {
    return (
        <div className="relative h-screen w-screen">
            <VideoTutorialPlayer onUnderstand={onUnderstand} />
        </div>
    )
}

export default TutorialScreen
