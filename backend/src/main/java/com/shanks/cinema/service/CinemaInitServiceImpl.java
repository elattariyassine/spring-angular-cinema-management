package com.shanks.cinema.service;

import com.shanks.cinema.dao.*;
import com.shanks.cinema.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Stream;

@Service
@Transactional
public class CinemaInitServiceImpl implements ICinemaInitService{

    @Autowired
    private VilleRepository villeRepository;
    @Autowired
    private CinemaRepository cinemaRepository;
    @Autowired
    private SalleRepository salleRepository;
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private SeanceRepository seanceRepository;
    @Autowired
    private FilmRepository filmRepository;
    @Autowired
    private ProjectionRepository projectionRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public void initVilles() {
        Stream.of("Casablanca", "Marrakech", "Youssoufia", "Rabat").forEach(v -> {
            Ville ville = new Ville();
            ville.setName(v);
            villeRepository.save(ville);
        });
    }

    @Override
    public void initCinemas() {
        villeRepository.findAll().forEach(ville -> {
            Stream.of("MegaRAMA", "IMAX", "FOUNOUN", "CHAHRAZAD").forEach(cinemaName -> {
                Cinema cinema = new Cinema();
                cinema.setName(cinemaName);
                cinema.setVille(ville);
                cinema.setNombreSalles(3 + (int) (Math.random() * 7));
                cinemaRepository.save(cinema);
            });
        });
    }

    @Override
    public void initSalles() {
        cinemaRepository.findAll().forEach(cinema -> {
            for(int i=0; i < cinema.getNombreSalles(); i++){
                Salle salle = new Salle();
                salle.setName("Salle " + (i+1));
                salle.setCinema(cinema);
                salle.setNombrePlace(15 +(int) (Math.random() * 20));
                salleRepository.save(salle);
            }
        });
    }

    @Override
    public void initSeances() {
        DateFormat df = new SimpleDateFormat("HH:mm");
        Stream.of("12:00", "15:00", "17:00", "19:00", "21:00").forEach(s -> {
            Seance seance = new Seance();
            try {
                seance.setHeureDebut(df.parse(s));
                seanceRepository.save(seance);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        });
    }

    @Override
    public void initPlaces() {
        salleRepository.findAll().forEach(salle -> {
            for (int i=0; i < salle.getNombrePlace(); i++){
                Place place = new Place();
                place.setNumero(i+1);
                place.setSalle(salle);
                placeRepository.save(place);
            }
        });
    }

    @Override
    public void initFilms() {
        double[] durres = new double[] {1, 1.5, 2, 2.5, 3};
        List<Categorie> categories = categoryRepository.findAll();
        Stream.of("Game of Thrones", "Seigneur des anneaux", "IRON Man", "SpiderMan").forEach(filmTitre -> {
            Film film = new Film();
            film.setTitre(filmTitre);
            film.setDuree(durres[new Random().nextInt(durres.length)]);
            film.setPhoto(filmTitre);
            film.setCategorie(categories.get(new Random().nextInt(categories.size())));
            filmRepository.save(film);
        });
    }

    @Override
    public void initProjections() {
        double[] prices = new double[] {30, 40, 50, 60, 70, 80};
        List<Film> films = filmRepository.findAll();
        villeRepository.findAll().forEach(ville -> {
            ville.getCinemas().forEach(cinema -> {
                cinema.getSalle().forEach(salle -> {
                    int index = new Random().nextInt(films.size());
                    Film film = films.get(index);
                        seanceRepository.findAll().forEach(seance -> {
                            Projection projection = new Projection();
                            projection.setDateProjection(new Date());
                            projection.setFilm(film);
                            projection.setPrix(prices[new Random().nextInt(prices.length)]);
                            projection.setSalle(salle);
                            projection.setSeance(seance);
                            projectionRepository.save(projection);
                        });
                });
            });
        });
    }

    @Override
    public void initTickets() {
        projectionRepository.findAll().forEach(projection -> {
            projection.getSalle().getPlaces().forEach(place -> {
                Ticket ticket = new Ticket();
                ticket.setPlace(place);
                ticket.setPrix(projection.getPrix());
                ticket.setProjection(projection);
                ticket.setReservee(false);
                ticketRepository.save(ticket);
            });
        });
    }

    @Override
    public void initCategories() {
        Stream.of("Action", "Fiction", "Drama", "Histoire").forEach(cat -> {
            Categorie categorie = new Categorie();
            categorie.setName(cat);
            categoryRepository.save(categorie);
        });
    }
}
