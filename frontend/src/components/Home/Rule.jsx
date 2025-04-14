import { useState } from "react";
import styled from "styled-components";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { faqData } from "./FAQData";

// Styled components for FAQ
const FAQContainer = styled.div`
  margin-top: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FAQItem = styled.div`
  width: 100%;
  max-width: 700px;
  background-color: var(--color-grey-200);
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AnswerList = styled.ul`
  padding-left: 20px;
`;

const AnswerItem = styled.li`
  margin-bottom: 5px;
`;

// FAQ component
const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleExpand = (index) => {
    if (index === expandedIndex) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <FAQContainer>
      {faqData.map((item, index) => (
        <FAQItem key={index} onClick={() => handleToggleExpand(index)}>
          <Question>
            <span>{item.question}</span>
            {expandedIndex === index ? (
              <HiOutlineChevronUp />
            ) : (
              <HiOutlineChevronDown />
            )}
          </Question>
          {expandedIndex === index && (
            <AnswerList>
              {item.answer.map((answerItem, i) => (
                <AnswerItem key={i}>{answerItem}</AnswerItem>
              ))}
            </AnswerList>
          )}
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQ;
