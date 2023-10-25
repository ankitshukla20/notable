import styles from "../styles/utils.module.css";
import privacyStyles from "../styles/Privacy.module.css";
import { RiTwitterXFill } from "react-icons/ri";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

const PrivacyPage = () => {
  return (
    <div className={styles.flexCenter}>
      <div className={privacyStyles.page}>
        <h1 className={privacyStyles.heading}>Privacy Policy</h1>

        <div className={privacyStyles.text}>
          <p>
            Welcome to Notable. We respect your privacy and are committed to
            protecting your personal information. This Privacy Policy is
            designed to explain how we collect, use, and protect the data we
            gather. By using our notes app, you consent to the practices
            described in this policy.
          </p>
          <h5 className={privacyStyles.subHeading}>Information We Collect</h5>
          <p>
            When you create an account, you provide your username, email
            address, and password. Your email is used for account-related
            notifications.
          </p>
          <h5 className={privacyStyles.subHeading}>
            How We Use Your Information
          </h5>
          <ol>
            <li>
              <em>User Authentication</em>: We use your username, email, and
              hashed password to enable secure login and authentication.
            </li>
            <li>
              <em>Communication</em>: We may use your email address to send
              important service-related notifications.
            </li>
          </ol>
          <h5 className={privacyStyles.subHeading}>Data Security</h5>
          <p>
            We take data security seriously and employ measures to protect your
            information. Your password is securely hashed using the bcrypt
            algorithm, making it virtually impossible for anyone, including us,
            to retrieve or decipher your actual password. Your data is stored in
            a secure environment, and we take reasonable precautions to protect
            it.
          </p>
          <h5 className={privacyStyles.subHeading}>
            Data Sharing and Disclosure
          </h5>
          <p>
            We do not share your personal information with third parties, except
            in the following circumstances:
          </p>
          <p>
            Legal Requirements: We may disclose your information to comply with
            legal obligations or respond to lawful requests from government and
            regulatory authorities.
          </p>

          <h5 className={privacyStyles.subHeading}>Changes to this Policy</h5>
          <p>
            We may update this Privacy Policy periodically. We encourage you to
            review it regularly for any changes. By continuing to use our app
            after such changes, you agree to the revised policy.
          </p>
        </div>

        <footer className={privacyStyles.footer}>
          <div className={styles.flexCenter}>
            <h5 className={privacyStyles.footerHeading}>Contact us</h5>
          </div>
          <div className={privacyStyles.footerIcons}>
            <a href="#">
              <RiTwitterXFill color="#67c2ff" fontSize="1.5rem" />
            </a>
            <a href="#">
              <BsGithub color="#67c2ff" fontSize="1.5rem" />
            </a>
            <a href="#">
              <BsLinkedin color="#67c2ff" fontSize="1.5rem" />
            </a>
            <a href="#">
              <BsInstagram color="#67c2ff" fontSize="1.5rem" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPage;
