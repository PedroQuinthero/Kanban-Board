import { useNavigate } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler, useState, useEffect } from 'react';
import Auth from '../utils/auth';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(false);

   const checkLogin = () => {
      if (Auth.loggedIn()) {
        setLoginCheck(true);
      } else {
        setLoginCheck(false);
      }
    };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    if (!isNaN(ticketId)) {
      try {
        const data = await deleteTicket(ticketId);
        return data;
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  const handleEdit = () => {
    if (Auth.isTokenExpired(Auth.getToken())) {
      Auth.logout();
      navigate('/login');
      setLoginCheck(false);
    } else {
      navigate('/edit', { state: { id: ticket.id } });
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <button type='button' onClick={handleEdit} className='editBtn'>Edit</button>
      <button type='button' value={String(ticket.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;