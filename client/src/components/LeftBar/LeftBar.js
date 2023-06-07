import React from "react";

import { useDispatch } from "react-redux";
import { changeSectionContent } from "../../redux/features/mainSectionContent/mscSlice";

function LeftBar() {
  const dispatch = useDispatch();
  const findFriends = () => {
    dispatch(changeSectionContent("findFriends"));
  };

  return (
    <aside className="leftBar">
      <ul>
        <li>
          <button onClick={findFriends}>Find Friends</button>
        </li>
      </ul>
    </aside>
  );
}

export default React.memo(LeftBar);
