import React from "react";
import { useSelector } from "react-redux";

function MainSection() {
  const state = useSelector((state) => state.msc);

  return (
    <div className="mainSection">
      {state.content == "findFriends" ? <div>asdf</div> : <div>dfgsdfcvb </div>}
    </div>
  );
}

export default React.memo(MainSection);
