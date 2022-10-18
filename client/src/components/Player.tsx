import React from "react";
import { useContract } from "../contexts/SmartContractProvider";
import { CharacterData } from "../types";

export default function Player(props: CharacterData) {
  const { attack } = useContract();

  return (
    <div className="players-container">
      <div className="player-container">
        <div className="player">
          <div className="image-content">
            <h2>{props.name}</h2>
            <img
              className="object-cover w-[100px] h-[150px]"
              src={props.imageURI}
              alt={`Character ${props.name}`}
            />
            <div className="health-bar">
              <progress value={props.hp} max={props.maxHp} />
              <p>{`${props.hp} / ${props.maxHp} HP`}</p>
            </div>
          </div>
          <div className="stats">
            <h4>{`⚔️ Attack Damage: ${props.attackDamage}`}</h4>
          </div>
          <div className="stats">
            <button className="btn" onClick={() => attack()}>
              Attack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
