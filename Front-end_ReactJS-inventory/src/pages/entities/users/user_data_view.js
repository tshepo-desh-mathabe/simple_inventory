import React from 'react';
import { Link } from 'react-router-dom';

export const ViewAll = (props) => {
    if (props.showData === true) {
        return (
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        {/* <th>Date Created</th> */}
                        <th>Date Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.users.map(e => {
                            return (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.firstName}</td>
                                    <td>{e.lastName}</td>
                                    <td>
                                        <Link
                                            to={`system-user/${e.id}/view`}>
                                            {e.username}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={`system-user/${e.id}/view`}>
                                            {e.email}
                                        </Link>
                                    </td>
                                    <td>
                                        {e.roles.map(i => {
                                            return (<div key={i.id}>{i.name}</div>)
                                        })}
                                    </td>
                                    {/* <td>{e.createdAt}</td> */}
                                    <td>{e.updatedAt}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    } else {
        return (
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.users.map(e => {
                            return (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.firstName}</td>
                                    <td>
                                        <Link
                                            to={`system-user/${e.id}/view`}>
                                            {e.username}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={`system-user/${e.id}/view`}>
                                            {e.email}
                                        </Link>
                                    </td>
                                    <td>
                                        {e.roles.map(i => {
                                            return (<div key={i.id}>{i.name}</div>)
                                        })}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
}