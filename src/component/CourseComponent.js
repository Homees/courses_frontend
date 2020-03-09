import React, {Component} from "react";
import CourseDataService from "../service/CourseDataService";
import {ErrorMessage, Field, Form, Formik} from "formik";

class CourseComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values) {
        let course = {
            id: this.state.id,
            name: values.name,
            description: values.description,
            targetDate: values.targetDate
        };

        if (this.state.id === '0') {
            console.log('post request');
            CourseDataService.createCourse(course).then(() => this.props.history.push('/courses'));
        }
        else {
            CourseDataService.updateCourse(this.state.id, course).then(() => this.props.history.push('/courses'))
        }
    }

    validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = 'Enter a name of course teacher!';
        }
        if (!values.description) {
            errors.description = 'Enter a description of a course';
        }
        else if (values.description.length < 5) {
            errors.description = 'Enter a description longer than 5 characters'
        }

        return errors;
    }

    componentDidMount() {
        console.log('id: ', this.state.id);

        if (this.state.id !== '0') {
            CourseDataService.retrieveCourse(this.state.id).then(response =>
                this.setState({name: response.data.name, description: response.data.description})
            )
        }
    }

    render() {
        let {id, name, description} = this.state;
        console.log('render: ', id, name, description);

        return (
            <div>
                <h3>Course {id}</h3>
                <div className="container">
                    <Formik initialValues={{id, name, description}} onSubmit={this.onSubmit}
                            validate={this.validate} validateOnChange={false} validateOnBlur={false}
                            enableReinitialize={true}>
                        {(
                            <Form>
                                <ErrorMessage name="name" component="div" className="alert alert-warning" />
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
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
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}

export default CourseComponent;