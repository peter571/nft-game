import React from "react";
import { CharacterData } from "../types";

interface RexProp extends CharacterData {}

export default function Rex(props: RexProp) {
  return (
    <div className="">
      <div className={``}>
        <h2>🔥 {props.name} 🔥</h2>
        <div className="">
          <img
            className="h-[150px] w-[200px] object-cover"
            src={props.imageURI}
            alt={`props ${props.name}`}
          />
          <div className="">
            <progress value={props.hp} max={props.maxHp} />
            <p>{`${props.hp} / ${props.maxHp} HP`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
