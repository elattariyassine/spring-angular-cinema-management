package com.shanks.cinema.dao;

import com.shanks.cinema.entities.Cinema;
import com.shanks.cinema.entities.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
