CREATE (iron_man:movie {title:"Iron Man"})
CREATE (ready_player_one:movie {title:"Ready Player One"})
CREATE (spiderman:movie {title:"Spiderman"})
CREATE (gotg:movie {title:"Guardianes de la Galaxia"})

CREATE (baby_bomer:gen {name:"Baby Boomers"})
CREATE (gen_x:gen {name:"Generación X"})
CREATE (millenials:gen {name:"Milenials"})
CREATE (gen_z:gen {name:"Generación Z"})
CREATE (gen_t:gen {name:"Generación T"})


CREATE (diego:person {name:"Diego Morales"})
CREATE (pablo:person {name:"Pablo"})
CREATE (erick:person {name:"Erick Guerra"})

CREATE (steven_spielberg:person {name:"Steven Spielberg"})
CREATE (jon_favreau:person {name:"Jon Favreau"})
CREATE (marc_webb:person {name:"Marc Webb"})
CREATE (james_gunn:person {name:"James Gunn"})


CREATE (under60:person {min:0, max:60, name:"Menor a 60 min"})
CREATE (under90:person {min:61, max:90, name:"Menor a 90 min"})
CREATE (under120:person {min:91, max:120, name:"Menor a 120 min"})
CREATE (under150:person {min:121, max:150, name:"Menor a 150 min"})
CREATE (under180:person {min:151, max:180, name:"Menor a 180 min"})
CREATE (above180:person {min:181, max:500, name:"Mayor a 180 min"})


CREATE (rdj:person {name:"Rober Downey jr"})
CREATE (sheridan:person {name:"Tye Sheridan"})
CREATE (gardfield:person {name:"Andrew Garfield"})
CREATE (pratt:person {name:"Chris Pratt"})


CREATE (spanish:language {name:"Espanol"})
CREATE (english:language {name:"Ingles"})
CREATE (french:language {name:"Frances"})


CREATE (usa:country {name:"Estados Unidos"})
CREATE (guatemala:country {name:"Guatemala"})


CREATE (year_2014:year {year:"2014"})
CREATE (year_2018:year {year:"2018"})
CREATE (year_2008:year {year:"2008"})


CREATE (comics:movieGender {name:"Peliculas de comics"})
CREATE (scifi:movieGender {name:"Science Fiction"})


CREATE (masculine:sex {name:"Masculino"})
CREATE (Femenino:sex {name:"Femenino"})

// Relaciones de pelicula

CREATE (iron_man)-[:DURATION]->(under150)
CREATE (ready_player_one)-[:DURATION]->(under180)
CREATE (spiderman)-[:DURATION]->(under150)
CREATE (gotg)-[:DURATION]->(under120)

CREATE (iron_man)-[:DIRECTOR]->(jon_favreau)
CREATE (ready_player_one)-[:DIRECTOR]->(steven_spielberg)
CREATE (spiderman)-[:DIRECTOR]->(marc_webb)
CREATE (gotg)-[:DIRECTOR]->(james_gunn)


CREATE (iron_man)-[:MAIN_CHARACTER]->(rdj)
CREATE (ready_player_one)-[:MAIN_CHARACTER]->(sheridan)
CREATE (spiderman)-[:MAIN_CHARACTER]->(gardfield)
CREATE (gotg)-[:MAIN_CHARACTER]->(pratt)

CREATE (iron_man)-[:LANGUAGE]->(english)
CREATE (ready_player_one)-[:LANGUAGE]->(english)
CREATE (spiderman)-[:LANGUAGE]->(english)
CREATE (gotg)-[:LANGUAGE]->(english)

CREATE (iron_man)-[:ORIGIN_COUNTRY]->(usa)
CREATE (ready_player_one)-[:ORIGIN_COUNTRY]->(usa)
CREATE (spiderman)-[:ORIGIN_COUNTRY]->(usa)
CREATE (gotg)-[:ORIGIN_COUNTRY]->(usa)

CREATE (iron_man)-[:GENDER]->(comics)
CREATE (ready_player_one)-[:GENDER]->(scifi)
CREATE (spiderman)-[:GENDER]->(comics)
CREATE (gotg)-[:GENDER]->(comics)

CREATE (iron_man)-[:RELEASE_YEAR]->(year_2008)
CREATE (ready_player_one)-[:RELEASE_YEAR]->(year_2018)
CREATE (spiderman)-[:RELEASE_YEAR]->(year_2014)
CREATE (gotg)-[:RELEASE_YEAR]->(year_2014)


// Relaciones de usuarios

CREATE (diego)-[:SEX]->(masculine)
CREATE (pablo)-[:SEX]->(masculine)
CREATE (erick)-[:SEX]->(masculine)

CREATE (diego)-[:NACIONALITY]->(guatemala)
CREATE (pablo)-[:NACIONALITY]->(usa)
CREATE (erick)-[:NACIONALITY]->(guatemala)

CREATE (diego)-[:LANGUAGE]->(spanish)
CREATE (pablo)-[:LANGUAGE]->(english)
CREATE (erick)-[:LANGUAGE]->(french)

CREATE (diego)-[:AGE]->(gen_z)
CREATE (pablo)-[:AGE]->(gen_x)
CREATE (erick)-[:AGE]->(baby_bomer)


// Peliculas gustadas
CREATE (diego)-[:LIKED_MOVIES]->(ready_player_one)
CREATE (diego)-[:LIKED_MOVIES]->(gotg)
CREATE (pablo)-[:LIKED_MOVIES]->(iron_man)
CREATE (erick)-[:LIKED_MOVIES]->(spiderman)



// MATCH p = allShortestPaths((spiderman:movie {title:"Spiderman"})-[*..6]-(ready_player_one:movie {title:"Ready Player One"})) RETURN p;
//     MATCH p = allShortestPaths((gotg:movie {title:"Guardianes de la Galaxia"})-[*..6]-(ready_player_one:movie {title:"Ready Player One"})) RETURN p;
// MATCH p = allShortestPaths((spiderman:movie {title:"Spiderman"})-[*..6]-(iron_man:movie {title:"Iron Man"})) RETURN p;

// MATCH (n)
// DETACH DELETE n