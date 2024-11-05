import React from "react";
//material-ui를 이용한 디자인
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
} from "@material-ui/core";

class ToDo extends React.Component {
    //constructor는 데이터에 관한 부분
    constructor(props) {
        //props 오브젝트 초기화
        super(props);
        //상위 컴포넌트로부터 넘겨받은 item 속성의 값을 item이라는 이름으로 저장
        this.state = { item: props.item };
    }
    //화면에 관한 부분
    render() {
        //item이라고 줄여서 쓰려고
        const item = this.state.item;
        return (
            //HTML태그를 사용하지 않고 material-ui를 이용
            <ListItem>
                <Checkbox checked={item.done} />
                <ListItemText>
                <InputBase
                    inputProps={{ "aria-label": "naked" }}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}/>
                </ListItemText>
            </ListItem>
        );
    }
}
export default ToDo;