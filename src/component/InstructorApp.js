import React, {Component} from "react";
import ListCoursesComponent from "./ListCoursesComponent";
import CourseComponent from "./CourseComponent";
import {BrowserRouter, Route, Switch} from "react-router-dom";

class InstructorApp extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <h1>Instructor Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListCoursesComponent} />
                        <Route path="/courses" exact component={ListCoursesComponent} />
                        <Route path="/courses/:id" component={CourseComponent} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default InstructorApp