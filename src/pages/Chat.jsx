import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';
export default function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoaded, selectIsLoaded] = useState(false);

    const sample = async () => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            selectIsLoaded(true);
        }
    }
    useEffect(() => {
        sample();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);//when current user is logged in we pass id to global map
        }
    }, [currentUser]);

    const checkUser = async () => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                setContacts(data.data);
            } else {
                navigate("/setAvatar");
            }
        }

    }
    useEffect(() => {
        checkUser();
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };


    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />

                {isLoaded && currentChat === undefined ? (
                    <Welcome currentUser={currentUser} />
                ) : (
                    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />

                )}

            </div>
        </Container>
    )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #F0FFFF;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
