package com.shanks.cinema.dao;

import com.shanks.cinema.entities.Cinema;
import com.shanks.cinema.entities.Salle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalleRepository extends JpaRepository<Salle, Long> {
}
