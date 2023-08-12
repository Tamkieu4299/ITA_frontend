import React, { useEffect } from "react";
import "./ThankYou.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_URL } from "constants/configs";
import WrapperContainer from "components/WrapperContainer";
import { Check } from "assets";
import CButton from "components/CButton";

const ThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "";

    useEffect(() => {
        if (from !== PAGE_URL.INTERVIEW_SESSION) {
            navigate(PAGE_URL.HOME);
        }
    }, [from]);

    return (
        <div className="thank-you">
            <div className="thank-you-hero">
                <h1>Thank You</h1>
            </div>
            <WrapperContainer bodyContent>
                <div className="thank-you-content">
                    <img src={Check} alt="thankyou" />
                    <p>Thank you for attending the interview</p>
                    <p>Your answers have been submitted, we will get back to you soon.</p>
                    <CButton
                        className="mt-4"
                        variant="contained"
                        onClick={() => navigate(PAGE_URL.HOME)}
                    >
                        Back To Home Page
                    </CButton>
                </div>
            </WrapperContainer>
        </div>
    );
};

export default ThankYou;
