import "./AvatarCircle.css";
import { avatarCircleProps } from "../../types/avatarType";
import APP from "../../constants/configs";

const AvatarCircle = ({
    index,
    username,
    image,
    position,
    handleClickAvatar
}: avatarCircleProps) => {
    const onAvatarClick = () => {
        handleClickAvatar(index);
    };

    return (
        <div className="avatarCircle" onClick={onAvatarClick}>
            <div className="avatarCircle__avatar">
                <div className="avatarCircle__avatar__image-box">
                    <img
                        className="avatarCircle__avatar__image-img"
                        src={`${APP.API_URL}/api/v1/studio/s3/get_binary/?bucket_name=${APP.BUCKET_S3}&path=${image}&type=image`}
                    />
                </div>
            </div>
            <div className="avatarCircle__content">
                <div className="avatarCircle__content-text">{username}</div>
                <div className="avatarCircle__content-text--second">{position}</div>
            </div>
        </div>
    );
};

export default AvatarCircle;
