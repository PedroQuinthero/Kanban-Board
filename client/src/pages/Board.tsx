import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import Auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (Auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  const handleAction = async (action: () => Promise<ApiMessage>): Promise<ApiMessage> => {
    if (Auth.isTokenExpired(Auth.getToken())) {
      Auth.logout();
      navigate('/login');
      setLoginCheck(false);
      return Promise.reject(new Error('Token expired'));
    } else {
      return await action();
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {
        !loginCheck ? (
          <div className='login-notice'>
            <h1>
              Login to create & view tickets
            </h1>
          </div>
        ) : (
          <div className='board'>
            <button type='button' id='create-ticket-link' onClick={() => handleAction(async () => { navigate('/create'); return Promise.resolve({ message: 'Navigated to create' }); })}>
              New Ticket
            </button>
            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredTickets = tickets.filter(ticket => ticket.status === status);
                return (
                  <Swimlane
                    title={status}
                    key={status}
                    tickets={filteredTickets}
                    deleteTicket={(ticketId) => handleAction(() => deleteIndvTicket(ticketId))}
                  />
                );
              })}
            </div>
          </div>
        )
      }
    </>
  );
};

export default Board;