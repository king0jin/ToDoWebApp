import React from "react";

class ToDo extends React.Component {
    render() {
        return (
            <div className="ToDo">
                <input type="checkbox" id="todobox" name="todobox" value="todobox" />
                <label for="todobox">ToDo 컴포넌트 만들기</label>
            </div>
         );
     }
}
export default ToDo;