import React from 'react'
import { useDrag } from 'react-dnd';
import { FaXmark } from "react-icons/fa6";


const Keyword = ({ name, index, handleRemove }) => {
    const [, drag] = useDrag({
      type: "KEYWORD",
      item: { index },
    });
  
    return (
      <div ref={drag} className="keyword-items">
        <div className="keyword">{name}</div>
        <div className="keyword-icon" onClick={() => handleRemove(index)}>
          <FaXmark />
        </div>
      </div>
    );
  };

export default Keyword
