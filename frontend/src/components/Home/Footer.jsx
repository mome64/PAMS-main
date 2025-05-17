import styled from "styled-components";
import { 
  FaRegCalendarCheck,
  FaRegFileAlt,
  FaRegChartBar,
  FaRegQuestionCircle,
  FaRegEnvelope,
  FaUniversity,
  FaIndustry,
  FaUserGraduate
} from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: var(--color-grey-100);
  padding: 4rem 2rem 2rem;
  border-top: 2px solid var(--color-grey-200);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const FooterColumn = styled.div`
  h3 {
    color: var(--color-primary);
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid var(--color-grey-200);
  }
`;

const FooterItem = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
  
  .icon {
    color: var(--color-primary);
    font-size: 1.8rem;
    margin-top: 0.3rem;
    min-width: 2rem;
  }
  
  .content {
    h4 {
      margin: 0 0 0.4rem 0;
      font-size: 1.2rem;
      color: var(--color-grey-800);
      font-weight: 600;
    }
    
    p {
      margin: 0;
      font-size: 1rem;
      color: var(--color-grey-600);
      line-height: 1.5;
    }
  }
`;

const SystemStats = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  text-align: center;
`;

const StatItem = styled.div`
  .number {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary-dark);
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 1.1rem;
    color: var(--color-grey-700);
    font-weight: 500;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--color-grey-200);
  
  p {
    font-size: 1.1rem;
    color: var(--color-grey-600);
    margin: 0.5rem 0;
    
    &:first-child {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        {/* System Features */}
        <FooterColumn>
          <h3>System Features</h3>
          
          <FooterItem>
            <div className="icon"><FaRegCalendarCheck /></div>
            <div className="content">
              <h4>Application Tracking</h4>
              <p>Monitor your attachment application status in real-time with our comprehensive tracking system</p>
            </div>
          </FooterItem>
          
          <FooterItem>
            <div className="icon"><FaRegFileAlt /></div>
            <div className="content">
              <h4>Document Submission</h4>
              <p>Securely upload all required documents through our user-friendly portal with instant verification</p>
            </div>
          </FooterItem>
          
          <FooterItem>
            <div className="icon"><FaRegChartBar /></div>
            <div className="content">
              <h4>Performance Evaluation</h4>
              <p>Receive detailed evaluations from supervisors and track your progress throughout the attachment period</p>
            </div>
          </FooterItem>
        </FooterColumn>
        
        {/* Quick Support */}
        <FooterColumn>
          <h3>Quick Support</h3>
          
          <FooterItem>
            <div className="icon"><FaRegQuestionCircle /></div>
            <div className="content">
              <h4>FAQs & Help Center</h4>
              <p>Comprehensive answers to frequently asked questions about the entire attachment process</p>
            </div>
          </FooterItem>
          
          <FooterItem>
            <div className="icon"><FaRegEnvelope /></div>
            <div className="content">
              <h4>Dedicated Support Team</h4>
              <p>attachment-support@haramaya.edu.et<br/>+251 25 553 0353 (Ext. 412)<br/>Guaranteed response within 24 hours</p>
            </div>
          </FooterItem>
          
          <FooterItem>
            <div className="icon"><FaUniversity /></div>
            <div className="content">
              <h4>Department Contacts</h4>
              <p>Direct access to your department's attachment coordinator and faculty supervisors</p>
            </div>
          </FooterItem>
        </FooterColumn>
        
        {/* User Guides */}
        <FooterColumn>
          <h3>Resources & Guides</h3>
          
          <FooterItem>
            <div className="icon"><FaUserGraduate /></div>
            <div className="content">
              <h4>Student Handbook</h4>
              <p>Complete guide covering application procedures, expectations, and evaluation criteria for students</p>
            </div>
          </FooterItem>
          
          <FooterItem>
            <div className="icon"><FaIndustry /></div>
            <div className="content">
              <h4>Organization Manual</h4>
              <p>Detailed instructions for host organizations covering supervision, evaluation, and reporting</p>
            </div>
          </FooterItem>
          
          <FooterItem>
            <div className="icon"><FaUniversity /></div>
            <div className="content">
              <h4>Faculty Resources</h4>
              <p>Comprehensive materials for academic supervisors including evaluation forms and grading rubrics</p>
            </div>
          </FooterItem>
        </FooterColumn>
      </FooterGrid>
      
      {/* System Statistics */}
      <SystemStats>
        <h3>2023 Practical Attachment Program Achievements</h3>
        <StatsGrid>
          <StatItem>
            <div className="number">1,850+</div>
            <div className="label">Students Successfully Placed</div>
          </StatItem>
          <StatItem>
            <div className="number">320+</div>
            <div className="label">Partner Organizations</div>
          </StatItem>
          <StatItem>
            <div className="number">92%</div>
            <div className="label">Student Satisfaction Rate</div>
          </StatItem>
          <StatItem>
            <div className="number">45</div>
            <div className="label">Academic Programs Participating</div>
          </StatItem>
        </StatsGrid>
      </SystemStats>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} Haramaya University - Practical Attachment Management System</p>
        <p>Developed by the Career Services Directorate in collaboration with the ICT Department | Version 3.2.1</p>
        <p>Main Campus: Haramaya, Oromia Regional State, Ethiopia | P.O. Box 138, Dire Dawa</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;