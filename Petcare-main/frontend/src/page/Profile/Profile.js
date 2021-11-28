import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Button, Header, Image, Input, List } from 'semantic-ui-react';
import Alert from '../../Components/Alert/Alert';
import Layout from '../../Components/Layout/Layout'
import { getProfilerConfigReadOnly, getProfilerConfigEdit } from '../../config/profiler.config'
import { notifyError, notifySuccess } from '../../config/toastify.config';
import { UpdateUser } from '../../services/auth.service';
const Profile = () => {
    const userData = useSelector(state => state.userData);
    const [isShow, setIsShow] = useState(false)
    const [changes, setChanges] = useState({})
    const nav = useNavigate()
    const trackChange = (key, value) => {
        setChanges({ ...changes, [key]: value })
    }
    const updateProfile = async () => {
        const [status, res] = await UpdateUser(userData, changes)
        if (status) {
            notifySuccess('Update profile success')
            setTimeout(() => { nav('/Logout'); }, 1000)
        } else {
            notifyError(res)
        }
    }
    console.log(changes)
    return (
        <Layout>
            <Header as="h1" >
                Presonal Details:
            </Header>
            <List divided verticalAlign='middle'>
                {Object.keys(getProfilerConfigReadOnly).map(key => (
                    <List.Item key={key}>
                        <List.Content>
                            <List.Header as='a'>{getProfilerConfigReadOnly[key]}</List.Header>
                            <List.Description>{userData[key]}</List.Description>
                        </List.Content>
                    </List.Item>
                ))}
                <Header as="h1" >
                    Edit Your Profile
                </Header>
                {Object.keys(getProfilerConfigEdit).map(key => userData[key] && (
                    <List.Item key={key}>
                        <List.Content className="content-test">
                            <List.Header as='a'>{getProfilerConfigEdit[key]}</List.Header>
                            <List.Header><Input placeholder={userData[key]} onChange={(e) => trackChange(key, e.target.value)} /></List.Header>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
            <Button style={{ marginTop: '1rem' }} onClick={() => Object.keys(changes).length === 0 ? notifyError('You Havent Updated anything') : setIsShow(true)} color="red">Update Profile</Button>
            <Alert isShow={isShow} setIsShow={setIsShow} onSuccess={updateProfile} header={'You Are About To Update Your Profile'} />
        </Layout>
    )
}

export default Profile
