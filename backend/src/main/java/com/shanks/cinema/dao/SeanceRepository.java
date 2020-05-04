package com.shanks.cinema.dao;

import com.shanks.cinema.entities.Cinema;
import com.shanks.cinema.entities.Seance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeanceRepository extends JpaRepository<Seance, Long> {
}
