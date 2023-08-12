import "./AvatarInterviewCard.css";
import ReactAudioPlayer from "react-audio-player";
import APP from "../../constants/configs";
import { AvatarInterviewCardProps } from "../../types/avatarType";

const AvatarInterviewCard = ({
    audioID,
    username,
    userID,
    position,
    avatar,
    handleOpenTerms
}: AvatarInterviewCardProps) => {
    const onInterviewClick = () => {
        handleOpenTerms(userID);
    };
    return (
        <div className="avatarInterviewCard">
            <div className="avatarInterviewCard__container">
                <div className="avatarInterviewCard__top">
                    <div className="avatarInterviewCard__top__image-box">
                        <video
                            autoPlay
                            src={`${APP.API_URL}/api/v1/studio/s3/get_binary_video_convert_codecs/?bucket_name=${APP.BUCKET_S3}&path=${avatar}&type=video`}
                            loop
                            className="avatarInterviewCard__top__image-item"
                        ></video>
                    </div>
                </div>
                <div className="avatarInterviewCard__info">
                    <div className="avatarInterviewCard__info__text-title">{username}</div>
                    <div className="avatarInterviewCard__info__text-title--dark">{position}</div>
                </div>
                <button
                    className="avatarInterviewCard__controllers__button"
                    onClick={onInterviewClick}
                >
                    Interview
                </button>
                <div className="avatarInterviewCard__voice">
                    <div className="avatarInterviewCard__voice__desc">Listen to {username}</div>
                    <ReactAudioPlayer
                        src={`${APP.API_URL}/api/v1/studio/s3/get_binary/?bucket_name=${APP.BUCKET_S3}&path=server-test-01/audio/${userID}/${audioID}.wav&type=audio`}
                        className=""
                        controls
                    />
                </div>
            </div>
        </div>
    );
};

export default AvatarInterviewCard;
