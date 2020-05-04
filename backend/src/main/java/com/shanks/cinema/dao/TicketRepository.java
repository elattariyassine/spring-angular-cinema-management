package com.shanks.cinema.dao;

import com.shanks.cinema.entities.Cinema;
import com.shanks.cinema.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
