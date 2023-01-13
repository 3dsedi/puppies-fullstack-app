import React, { useState } from "react";
import { PuppyInterface } from "../interface/puppyInterface";
import { PuppyCardDetail } from "./PuppyCardDetail";
import { PuppyCardEditing } from "./PuppyCardEditing";

interface Props {
  puppy: PuppyInterface;
  onDeletePuppy: Function;
  onUpdatePuppy: Function;
}

export const PuppyCard = ({ puppy, onDeletePuppy, onUpdatePuppy }: Props) => {
  const { name, id, img } = puppy;
  const [isEditing, setIsEditing] = useState<boolean>();
  const [showDetails, setShowDetails] = useState<boolean>();
  return (
    <div>
      {(isEditing || showDetails) && <div className="coverLayer"></div>}

      {isEditing && (
        <PuppyCardEditing
          puppy={puppy}
          updatePuppy={onUpdatePuppy}
          closeEditing={() => setIsEditing(false)}
        />
      )}

      {showDetails && (
        <PuppyCardDetail
          puppy={puppy}
          closeDetails={() => setShowDetails(false)}
        />
      )}

      <div className="puppyCard">
        <button
          className="button_delete"
          onClick={() => onDeletePuppy(id as number)}
        >
          Delete
        </button>
        <div className="puppyCard_desc">
          <p>{name}</p>
          <img
            alt="pic"
            src={img}
            style={{
              borderRadius: 20,
            }}
          />
        </div>
        <div className="puppyCard_buttons">
          <button onClick={() => setIsEditing(true)}>
            <i className="fa fa-edit" /> Edit
          </button>
          <button onClick={() => setShowDetails(true)}>
            <i className="fa fa-info" /> Details
          </button>
        </div>
      </div>
    </div>
  );
};
