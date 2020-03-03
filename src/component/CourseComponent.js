import React, {Component} from "react";
import CourseDataService from "../service/CourseDataService";
import {Field, Form, Formik} from "formik";

class CourseComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: ''
        }
    }

    componentDidMount() {
        console.log(this.state.id);

        if (this.state.id === 0) {
            return;
        }

        CourseDataService.retrieveCourse(this.state.id).then(response =>
            this.setState({name: response.data.name, description: response.data.description})
        )
    }

    render() {
        let {id, name, description} = this.state;
        console.log(id, name, description);

        return (
            <div>
                <h3>Course {id}</h3>
                <div className="container">
                    <Formik initialValues={{ id, description }}>
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>ID</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default CourseComponent;