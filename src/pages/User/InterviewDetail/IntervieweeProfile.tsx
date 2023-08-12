/* eslint-disable camelcase */
import { DefaultUser } from "assets";
import React from "react";
import { PairValueType } from "types/addedInformation";
import GetAppIcon from "@mui/icons-material/GetApp";
import { CVType } from "types/generatedAvatar";

interface Props {
    data: CVType;
}

const IntervieweeProfile = (props: Props) => {
    const { data } = props;
    const { full_name, email, phone_number } = data;
    const profileInfo: PairValueType[] = [
        { title: "Fullname", value: full_name },
        { title: "Phone", value: phone_number },
        { title: "Email", value: email },
        { title: "CV", value: "Candidate-cv.pdf" }
    ];

    return (
        <div className="profile-card">
            <div className="profile-upper">
                <div className="profile-upper__avatar">
                    <img src={DefaultUser} alt="user" />
                </div>
            </div>
            <div className="profile-lower">
                <div className="profile-info">
                    {profileInfo.map((info, idx) => (
                        <div key={info.title} className="flex items-center">
                            <div className="profile-info__title">{info.title}:</div>
                            <div className="profile-info__value ellipsis">
                                <span className={idx === profileInfo.length - 1 ? "cv-value" : ""}>
                                    {info.value}{" "}
                                    {idx === profileInfo.length - 1 && (
                                        <GetAppIcon sx={{ fontSize: 18 }} />
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IntervieweeProfile;
