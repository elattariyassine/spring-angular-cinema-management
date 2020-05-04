package com.shanks.cinema.dao;

import com.shanks.cinema.entities.Categorie;
import com.shanks.cinema.entities.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Categorie, Long> {
}
