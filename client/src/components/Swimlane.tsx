import TicketCard from './TicketCard';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { useState, useEffect } from 'react';

interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
}

const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
  const [sortedTickets, setSortedTickets] = useState<TicketData[]>(tickets);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    setSortedTickets(tickets);
  }, [tickets]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'swim-lane todo';
      case 'In Progress':
        return 'swim-lane inprogress';
      case 'Done':
        return 'swim-lane done';
      default:
        return 'swim-lane';
    }
  };

  const sortTickets = () => {
    const sorted = [...sortedTickets].sort((a, b) => {
      if (isAscending) {
        return (a.name ?? '').localeCompare(b.name ?? '');
      } else {
        return (b.name ?? '').localeCompare(a.name ?? '');
      }
    });
    setSortedTickets(sorted);
    setIsAscending(!isAscending);
  };

  return (
    <div className={`swimlane ${getStatusClass(title)}`}>
      <h2>{title}</h2>
      <button onClick={sortTickets} className='sort-btn'>
        Sort by Name {isAscending ? '▲' : '▼'}
      </button>
      {sortedTickets.map(ticket => (
        <TicketCard 
          key={ticket.id}
          ticket={ticket}
          deleteTicket={deleteTicket}
        />
      ))}
    </div>
  );
};

export default Swimlane;