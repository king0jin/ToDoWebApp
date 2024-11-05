import React from "react"
import { 
    TextField, 
    Paper, 
    Button, 
    Grid 
} from "@material-ui/core";

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { title: "" } };
        this.add = props.add;
    }

    //input의 내용이 변경되었을 때 호출되는 함수
    onInputChange = (e) => {
        this.setState({ item: { ...this.state.item, title: e.target.value } });
    };
    // + 버튼을 눌렀을 때 호출되는 함수
    onButtonClick = () => {
        console.log("Adding item:", this.state.item); // 확인용 로그
        this.add(this.state.item);
        this.setState({ item: { title: "" } });
    };
    //Enter를 눌렀을 때 호출되는 함수
    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.onButtonClick(e);// + 버튼을 눌렀을 때 호출되는 함수
        }
    };

    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                        <TextField 
                            placeholder="Add Todo here" 
                            fullWidth
                            value={this.state.item.title}
                            onChange={this.onInputChange}
                            onKeyPress={this.enterKeyEventHandler}/>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <Button 
                            fullWidth 
                            color="secondary" 
                            variant="outlined" 
                            onClick={this.onButtonClick}
                        > + </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }    
}
export default AddTodo;