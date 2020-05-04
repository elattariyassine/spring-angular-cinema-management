package com.shanks.cinema.dao;

import com.shanks.cinema.entities.Cinema;
import com.shanks.cinema.entities.Ville;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VilleRepository extends JpaRepository<Ville, Long> {
}
