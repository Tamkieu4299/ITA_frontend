/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { useEffect } from "react";
import APP from "../../../../constants/configs";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authSelector, studioSelector } from "store/selectors";
import { getGenerationByUser } from "pages/Studio/studioSlice";

export const Final = () => {
    const dispatch = useAppDispatch();
    const { avatarList } = useAppSelector(studioSelector);
    const { userInfo } = useAppSelector(authSelector);

    useEffect(() => {
        // eslint-disable-next-line camelcase
        dispatch(
            getGenerationByUser({
                user_id: userInfo?.id,
                type: "base"
            })
        );
    }, []);

    return (
        <div className="preview">
            <div className="preview__container__right">
                {avatarList &&
                    avatarList.map((v, index) => (
                        <div key={index} className="preview__video">
                            <Player
                                src={`${APP.API_URL}/api/v1/studio/s3/get_binary_video_convert_codecs/?bucket_name=${v.bucket_s3}&path=${v.path_s3}&type=video`}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};
