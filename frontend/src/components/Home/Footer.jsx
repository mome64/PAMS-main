import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaRegCalendarCheck,
  FaRegFileAlt,
  FaRegChartBar,
  FaRegQuestionCircle,
  FaRegEnvelope,
  FaUniversity,
  FaIndustry,
  FaUserGraduate,
} from "react-icons/fa";

// Convert styled components to motion components
const FooterContainer = styled(motion.footer)`
  background-color: var(--color-grey-100);
  padding: 4rem 2rem 2rem;
  border-top: 2px solid var(--color-grey-200);
`;

const FooterGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const FooterColumn = styled(motion.div)`
  h3 {
    color: var(--color-primary);
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid var(--color-grey-200);
  }
`;

const FooterItem = styled(motion.div)`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }

  .icon {
    color: var(--color-primary);
    font-size: 1.8rem;
    margin-top: 0.3rem;
    min-width: 2rem;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  &:hover .icon {
    transform: scale(1.2);
    color: var(--color-primary-dark);
  }

  .content {
    h4 {
      margin: 0 0 0.4rem 0;
      font-size: 1.2rem;
      color: var(--color-grey-800);
      font-weight: 600;
      transition: color 0.3s ease;
    }

    p {
      margin: 0;
      font-size: 1rem;
      color: var(--color-grey-600);
      line-height: 1.5;
      transition: color 0.3s ease;
    }
  }

  &:hover .content h4,
  &:hover .content p {
    color: var(--color-grey-900);
  }
`;

const SystemStats = styled(motion.div)`
  background-color: var(--color-primary-light);
  padding: 2.5rem;
  border-radius: 12px;
  margin: 3rem auto;
  max-width: 1400px;

  h3 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--color-primary-dark);
    font-size: 1.6rem;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  .number {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary-dark);
    margin-bottom: 0.5rem;
    transition: transform 0.3s ease;
  }

  .label {
    font-size: 1.1rem;
    color: var(--color-grey-700);
    font-weight: 500;
    transition: color 0.3s ease;
  }

  &:hover {
    .number {
      transform: scale(1.1);
    }
    .label {
      color: var(--color-primary);
    }
  }
`;

const Copyright = styled(motion.div)`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--color-grey-200);

  p {
    font-size: 1.1rem;
    color: var(--color-grey-600);
    margin: 0.5rem 0;
    transition: color 0.3s ease;

    &:first-child {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }

  &:hover p {
    color: var(--color-grey-800);
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.8,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "backOut",
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const statItemVariants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const Footer = () => {
  return (
    <FooterContainer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <FooterGrid>
        {/* System Features */}
        <FooterColumn variants={columnVariants}>
          <h3>System Features</h3>

          <FooterItem variants={itemVariants} whileHover="hover">
            <div className="icon">
              <FaRegCalendarCheck />
            </div>
            <div className="content">
              <h4>Application Tracking</h4>
              <p>
                Monitor your attachment application status in real-time with our
                comprehensive tracking system
              </p>
            </div>
          </FooterItem>

          <FooterItem variants={itemVariants} whileHover="hover">
            <div className="icon">
              <FaRegFileAlt />
            </div>
            <div className="content">
              <h4>Document Submission</h4>
              <p>
                Securely upload all required documents through our user-friendly
                portal with instant verification
              </p>
            </div>
          </FooterItem>

          <FooterItem variants={itemVariants} whileHover="hover">
            <div className="icon">
              <FaRegChartBar />
            </div>
            <div className="content">
              <h4>Performance Evaluation</h4>
              <p>
                Receive detailed evaluations from supervisors and track your
                progress throughout the attachment period
              </p>
            </div>
          </FooterItem>
        </FooterColumn>

        {/* Quick Support */}
        <FooterColumn variants={columnVariants}>
          <h3>Quick Support</h3>

          <FooterItem variants={itemVariants} whileHover="hover">
            <div className="icon">
              <FaRegQuestionCircle />
            </div>
            <div className="content">
              <h4>FAQs & Help Center</h4>
              <p>
                Comprehensive answers to frequently asked questions about the
                entire attachment process
              </p>
            </div>
          </FooterItem>

          <FooterItem variants={itemVariants} whileHover="hover">
            <div className="icon">
              <FaRegEnvelope />
            </div>
            <div className="content">
              <h4>Dedicated Support Team</h4>
              <p>
                attachment-support@haramaya.edu.et
                <br />
                +251 25 553 0353 (Ext. 412)
                <br />
                Guaranteed response within 24 hours
              </p>
            </div>
          </FooterItem>

          <FooterItem variants={itemVariants} whileHover="hover">
            <div className="icon">
              <FaUniversity />
            </div>
            <div className="content">
              <h4>Department Contacts</h4>
              <p>
                Direct access to your department's attachment coordinator and
                faculty supervisors
              </p>
            </div>
          </FooterItem>
        </FooterColumn>

        {/* User Guides */}
        <FooterColumn variants={columnVariants}>
          <h3>Resources & Guides</h3>

          <FooterItem variants={itemVariants} whileHover="hover">
            <div className="icon">
              <FaUserGraduate />
            </div>
            <div className="content">
              <h4>Student Handbook</h4>
              <p>
                Complete guide covering application procedures, expectations,
                and evaluation criteria for students
              </p>
            </div>
          </FooterItem>

          <FooterItem variants={itemVariants} whileHover="hover">
            <div className="icon">
              <FaIndustry />
            </div>
            <div className="content">
              <h4>Organization Manual</h4>
              <p>
                Detailed instructions for host organizations covering
                supervision, evaluation, and reporting
              </p>
            </div>
          </FooterItem>

          <FooterItem variants={itemVariants} whileHover="hover">
            <div className="icon">
              <FaUniversity />
            </div>
            <div className="content">
              <h4>Faculty Resources</h4>
              <p>
                Comprehensive materials for academic supervisors including
                evaluation forms and grading rubrics
              </p>
            </div>
          </FooterItem>
        </FooterColumn>
      </FooterGrid>

      <Copyright variants={columnVariants}>
        <p>
          &copy; {new Date().getFullYear()} Haramaya University - Practical
          Attachment Management System
        </p>
        <p>
          Developed by the Career Services Directorate in collaboration with the
          ICT Department | Version 3.2.1
        </p>
        <p>
          Main Campus: Haramaya, Oromia Regional State, Ethiopia | P.O. Box 138,
          Dire Dawa
        </p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
