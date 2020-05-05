package com.shanks.cinema.entities;

import org.springframework.data.rest.core.config.Projection;

import java.util.Collection;
import java.util.Date;

@Projection(name="p1", types = {com.shanks.cinema.entities.Projection.class})
public interface ProjectionProj {
    public long getId();
    public double getPrix();
    public Date getDateProjection();
    public Salle getSalle();
    public Film getFilm();
    public Seance getSeance();
    public Collection<Ticket> getTickets();
}
