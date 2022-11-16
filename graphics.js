//updating whether tabs are available
function tabs_update() {
    if (game.color_boosts >= 10 || game.prestige >= 1 || game.ascend >= 1) {
        if (game.tab === 1)
            document.getElementById("prestige").className = "tab selected"
        else document.getElementById("prestige").className = "tab unlocked"
        document.getElementById("prestige").innerHTML = "PRESTIGE"
    } else {
        document.getElementById("prestige").className = "tab locked"
        document.getElementById("prestige").innerHTML = "LOCKED"
    }

    if (game.prestige_bought[25]) {
        if (game.tab === 2)
            document.getElementById("ascension").className = "tab selected"
        else document.getElementById("ascension").className = "tab unlocked"
        document.getElementById("ascension").innerHTML = "ASCENSION"
    } else {
        document.getElementById("ascension").className = "tab locked"
        document.getElementById("ascension").innerHTML = "LOCKED"
    }
}

//graphics updates for spice generators
function spice_update() {
    document.getElementById("red_spice_num").innerHTML =
        format_idec(game.red_spice, game.notation) + " g"
    document.getElementById("red_spice_up").innerHTML =
        "+" +
        format_idec(
            game.red_spice_gen[0].floor().mul(game.total_red_spice_boost[0]),
            game.notation
        ) +
        " g red spice/sec"
    if (game.ascend_bought[30] && game.ascend_challenge !== 6) {
        if (game.prestige_bought[11] >= 1) {
            document.getElementById("red_spice_up").innerHTML =
                "+" +
                format_idec(
                    game.red_spice_gen[0]
                        .floor()
                        .mul(game.total_red_spice_boost[0]),
                    game.notation
                ) +
                " g red spice/sec<br>Your red spice is boosting yellow, green, blue, & pink spice production " +
                format_idec(game.red_spice.pow(0.0075).add(1), game.notation) +
                "x,<br>boosting crystallized spice production " +
                format_idec(game.red_spice.pow(0.00004).add(1), game.notation) +
                "x,<br>and boosting arcane spice production " +
                format_idec(
                    game.red_spice.pow(0.00000025).add(1),
                    game.notation
                )
        }
    } else if (
        game.ascend_bought[18] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    ) {
        if (game.prestige_bought[11] >= 1) {
            document.getElementById("red_spice_up").innerHTML =
                "+" +
                format_idec(
                    game.red_spice_gen[0]
                        .floor()
                        .mul(game.total_red_spice_boost[0]),
                    game.notation
                ) +
                " g red spice/sec<br>Your red spice is boosting yellow, green, blue, & pink spice production " +
                format_idec(game.red_spice.pow(0.0075).add(1), game.notation) +
                "x,<br>and boosting crystallized spice production " +
                format_idec(game.red_spice.pow(0.00004).add(1), game.notation) +
                "x"
        }
    } else {
        if (game.prestige_bought[11] >= 1) {
            if (game.ascend_bought[0]) {
                document.getElementById("red_spice_up").innerHTML =
                    "+" +
                    format_idec(
                        game.red_spice_gen[0]
                            .floor()
                            .mul(game.total_red_spice_boost[0]),
                        game.notation
                    ) +
                    " g red spice/sec<br>Your red spice is boosting yellow, green, blue, & pink spice production " +
                    format_idec(
                        game.red_spice.pow(0.0075).add(1),
                        game.notation
                    ) +
                    "x"
            } else {
                document.getElementById("red_spice_up").innerHTML =
                    "+" +
                    format_idec(
                        game.red_spice_gen[0]
                            .floor()
                            .mul(game.total_red_spice_boost[0]),
                        game.notation
                    ) +
                    " g red spice/sec<br>Your red spice is boosting yellow, green, blue, & pink spice production " +
                    format_idec(
                        game.red_spice.pow(0.005).add(1),
                        game.notation
                    ) +
                    "x"
            }
        }
    }

    document.getElementById("yellow_spice_num").innerHTML =
        format_idec(game.yellow_spice, game.notation) + " g"
    document.getElementById("yellow_spice_up").innerHTML =
        "+" +
        format_idec(
            game.yellow_spice_gen[0]
                .floor()
                .mul(game.total_yellow_spice_boost[0]),
            game.notation
        ) +
        " g yellow spice/sec"
    if (
        game.prestige_bought[8] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    )
        document.getElementById("yellow_spice_up").innerHTML =
            "+" +
            format_idec(
                game.yellow_spice_gen[0]
                    .floor()
                    .mul(game.total_yellow_spice_boost[0]),
                game.notation
            ) +
            " g yellow spice/sec<br>Your yellow spice is boosting red spice production " +
            format_idec(game.yellow_spice.pow(0.075).add(1), game.notation) +
            "x"

    document.getElementById("green_spice_num").innerHTML =
        format_idec(game.green_spice, game.notation) + " g"
    document.getElementById("green_spice_up").innerHTML =
        "+" +
        format_idec(
            game.green_spice_gen[0]
                .floor()
                .mul(game.total_green_spice_boost[0]),
            game.notation
        ) +
        " g green spice/sec"
    if (
        game.prestige_bought[8] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    )
        document.getElementById("green_spice_up").innerHTML =
            "+" +
            format_idec(
                game.green_spice_gen[0]
                    .floor()
                    .mul(game.total_green_spice_boost[0]),
                game.notation
            ) +
            " g green spice/sec<br>Your green spice is boosting yellow spice production " +
            format_idec(game.green_spice.pow(0.075).add(1), game.notation) +
            "x"

    document.getElementById("blue_spice_num").innerHTML =
        format_idec(game.blue_spice, game.notation) + " g"
    document.getElementById("blue_spice_up").innerHTML =
        "+" +
        format_idec(
            game.blue_spice_gen[0].floor().mul(game.total_blue_spice_boost[0]),
            game.notation
        ) +
        " g blue spice/sec"
    if (
        game.prestige_bought[8] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    )
        document.getElementById("blue_spice_up").innerHTML =
            "+" +
            format_idec(
                game.blue_spice_gen[0]
                    .floor()
                    .mul(game.total_blue_spice_boost[0]),
                game.notation
            ) +
            " g blue spice/sec<br>Your blue spice is boosting green spice production " +
            format_idec(game.blue_spice.pow(0.075).add(1), game.notation) +
            "x"

    document.getElementById("pink_spice_num").innerHTML =
        format_idec(game.pink_spice, game.notation) + " g"

    let pink_str =
        "+" +
        format_idec(
            game.pink_spice_gen[0].floor().mul(game.total_pink_spice_boost[0]),
            game.notation
        ) +
        " g pink spice/sec"

    if (
        game.ascend_bought[13] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    ) {
        if (
            game.prestige_bought[8] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6
        )
            pink_str +=
                "<br>Your pink spice is boosting blue spice production " +
                format_idec(game.pink_spice.pow(0.075).add(1), game.notation) +
                "x,<br>and boosting crystallized spice production " +
                format_idec(
                    game.pink_spice.pow(0.00008).add(1),
                    game.notation
                ) +
                "x"
        else
            pink_str +=
                "<br>Your pink spice is boosting crystallized spice production " +
                format_idec(
                    game.pink_spice.pow(0.00008).add(1),
                    game.notation
                ) +
                "x"
    } else {
        if (
            game.prestige_bought[8] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6
        )
            pink_str +=
                "<br>Your pink spice is boosting blue spice production " +
                format_idec(game.pink_spice.pow(0.075).add(1), game.notation) +
                "x"
    }

    document.getElementById("pink_spice_up").innerHTML = pink_str

    for (const gen of spice_gen.generators) {
        let element = spice_map.get(gen)
        let info = element.querySelector(".spice_gen_info")
        let boost = element.querySelector(".spice_gen_boost")

        let info_str = ""
        let n = 0
        let price = 0
        switch (gen.color) {
            case "red":
                info_str =
                    "You have " +
                    format_inum(
                        game.red_spice_gen[gen.id].floor(),
                        game.notation
                    ) +
                    " red spice " +
                    gen.plural
                if (
                    game.red_spice_gen[gen.id].cmp(
                        new Decimal(game.red_spice_bought[gen.id])
                    ) === 0
                ) {
                    info_str += ",<br>producing "
                } else {
                    info_str +=
                        " (" +
                        format_small(game.red_spice_bought[gen.id]) +
                        " bought),<br>producing "
                }
                info_str += format_idec(
                    game.red_spice_gen[gen.id]
                        .floor()
                        .mul(game.total_red_spice_boost[gen.id])
                        .div(gen.id + 1),
                    game.notation
                )
                if (gen.id === 0) {
                    info_str += " g red spice/sec"
                } else {
                    info_str +=
                        " red spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                }
                if (game.condensed)
                    info_str =
                        format_inum(
                            game.red_spice_gen[gen.id].floor(),
                            game.notation
                        ) +
                        " " +
                        gen.plural +
                        " <span class='bold'>" +
                        format_idec(
                            game.total_red_spice_boost[gen.id],
                            game.notation
                        ) +
                        "x</span>"
                info.innerHTML = info_str

                boost.innerHTML =
                    "Your red spice " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_red_spice_boost[gen.id],
                        game.notation
                    ) +
                    "x"

                if (game.condensed) boost.style.display = "none"
                else boost.style.display = "block"

                document.getElementById("red_cost" + gen.id).innerHTML =
                    "-" +
                    format_idec(game.red_spice_price[gen.id], game.notation) +
                    " g red spice"
                if (game.red_spice.cmp(game.red_spice_price[gen.id]) >= 0) {
                    document.getElementById("red_cost" + gen.id).className =
                        "red_cost"
                } else {
                    document.getElementById("red_cost" + gen.id).className =
                        "empty_cost"
                }

                n =
                    Math.floor(game.red_spice_bought[gen.id] / 10) * 10 +
                    10 -
                    game.red_spice_bought[gen.id]
                price = game.red_spice_price[gen.id].mul(1 - 1.2 ** n).div(-0.2)
                document.getElementById("red_ucost" + gen.id).innerHTML =
                    "-" + format_idec(price, game.notation) + " g red spice"
                if (game.red_spice.cmp(price) >= 0) {
                    document.getElementById("red_ucost" + gen.id).className =
                        "red_cost"
                } else {
                    document.getElementById("red_ucost" + gen.id).className =
                        "empty_cost"
                }

                if (gen.id === 0) {
                    element.style.display = "block"
                } else {
                    if (
                        game.red_spice_gen[gen.id - 1].cmp(10) >= 0 ||
                        game.color_boosts >= 1 ||
                        game.prestige >= 1 ||
                        game.ascend >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
            case "yellow":
                info_str =
                    "You have " +
                    format_inum(
                        game.yellow_spice_gen[gen.id].floor(),
                        game.notation
                    ) +
                    " yellow spice " +
                    gen.plural
                if (
                    game.yellow_spice_gen[gen.id].cmp(
                        new Decimal(game.yellow_spice_bought[gen.id])
                    ) === 0
                ) {
                    info_str += ",<br>producing "
                } else {
                    info_str +=
                        " (" +
                        format_small(game.yellow_spice_bought[gen.id]) +
                        " bought),<br>producing "
                }
                info_str += format_idec(
                    game.yellow_spice_gen[gen.id]
                        .floor()
                        .mul(game.total_yellow_spice_boost[gen.id])
                        .div(gen.id + 1),
                    game.notation
                )
                if (gen.id === 0) {
                    info_str += " g yellow spice/sec"
                    if (game.prestige_bought[10] >= 1)
                        info_str +=
                            ",<br>and producing " +
                            format_idec(
                                game.yellow_spice_gen[gen.id].floor().pow(0.1),
                                game.notation
                            ) +
                            " red spice galaxies/sec"
                } else {
                    info_str +=
                        " yellow spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                }
                if (game.condensed)
                    info_str =
                        format_inum(
                            game.yellow_spice_gen[gen.id].floor(),
                            game.notation
                        ) +
                        " " +
                        gen.plural +
                        " <span class='bold'>" +
                        format_idec(
                            game.total_yellow_spice_boost[gen.id],
                            game.notation
                        ) +
                        "x</span>"
                info.innerHTML = info_str

                boost.innerHTML =
                    "Your yellow spice " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_yellow_spice_boost[gen.id],
                        game.notation
                    ) +
                    "x"

                if (game.condensed) boost.style.display = "none"
                else boost.style.display = "block"

                document.getElementById("yellow_cost" + gen.id).innerHTML =
                    "-" +
                    format_idec(
                        game.yellow_spice_price[gen.id],
                        game.notation
                    ) +
                    " g yellow spice"
                if (
                    game.yellow_spice.cmp(game.yellow_spice_price[gen.id]) >= 0
                ) {
                    document.getElementById("yellow_cost" + gen.id).className =
                        "yellow_cost"
                } else {
                    document.getElementById("yellow_cost" + gen.id).className =
                        "empty_cost"
                }

                n =
                    Math.floor(game.yellow_spice_bought[gen.id] / 10) * 10 +
                    10 -
                    game.yellow_spice_bought[gen.id]
                price = game.yellow_spice_price[gen.id]
                    .mul(1 - 1.3 ** n)
                    .div(-0.3)
                document.getElementById("yellow_ucost" + gen.id).innerHTML =
                    "-" + format_idec(price, game.notation) + " g yellow spice"
                if (game.yellow_spice.cmp(price) >= 0) {
                    document.getElementById("yellow_ucost" + gen.id).className =
                        "yellow_cost"
                } else {
                    document.getElementById("yellow_ucost" + gen.id).className =
                        "empty_cost"
                }

                if (gen.id === 0) {
                    element.style.display = "block"
                } else {
                    if (
                        game.yellow_spice_gen[gen.id - 1].cmp(10) >= 0 ||
                        game.color_boosts >= 2 ||
                        game.prestige >= 1 ||
                        game.ascend >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
            case "green":
                info_str =
                    "You have " +
                    format_inum(
                        game.green_spice_gen[gen.id].floor(),
                        game.notation
                    ) +
                    " green spice " +
                    gen.plural
                if (
                    game.green_spice_gen[gen.id].cmp(
                        new Decimal(game.green_spice_bought[gen.id])
                    ) === 0
                ) {
                    info_str += ",<br>producing "
                } else {
                    info_str +=
                        " (" +
                        format_small(game.green_spice_bought[gen.id]) +
                        " bought),<br>producing "
                }
                info_str += format_idec(
                    game.green_spice_gen[gen.id]
                        .floor()
                        .mul(game.total_green_spice_boost[gen.id])
                        .div(gen.id + 1),
                    game.notation
                )
                if (gen.id === 0) {
                    info_str += " g green spice/sec"
                    if (game.prestige_bought[10] >= 1)
                        info_str +=
                            ",<br>and producing " +
                            format_idec(
                                game.green_spice_gen[gen.id].floor().pow(0.1),
                                game.notation
                            ) +
                            " yellow spice galaxies/sec"
                } else {
                    info_str +=
                        " green spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                }
                if (game.condensed)
                    info_str =
                        format_inum(
                            game.green_spice_gen[gen.id].floor(),
                            game.notation
                        ) +
                        " " +
                        gen.plural +
                        " <span class='bold'>" +
                        format_idec(
                            game.total_green_spice_boost[gen.id],
                            game.notation
                        ) +
                        "x</span>"
                info.innerHTML = info_str

                boost.innerHTML =
                    "Your green spice " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_green_spice_boost[gen.id],
                        game.notation
                    ) +
                    "x"

                if (game.condensed) boost.style.display = "none"
                else boost.style.display = "block"

                document.getElementById("green_cost" + gen.id).innerHTML =
                    "-" +
                    format_idec(game.green_spice_price[gen.id], game.notation) +
                    " g green spice"
                if (game.green_spice.cmp(game.green_spice_price[gen.id]) >= 0) {
                    document.getElementById("green_cost" + gen.id).className =
                        "green_cost"
                } else {
                    document.getElementById("green_cost" + gen.id).className =
                        "empty_cost"
                }

                n =
                    Math.floor(game.green_spice_bought[gen.id] / 10) * 10 +
                    10 -
                    game.green_spice_bought[gen.id]
                price = game.green_spice_price[gen.id]
                    .mul(1 - 1.4 ** n)
                    .div(-0.4)
                document.getElementById("green_ucost" + gen.id).innerHTML =
                    "-" + format_idec(price, game.notation) + " g green spice"
                if (game.green_spice.cmp(price) >= 0) {
                    document.getElementById("green_ucost" + gen.id).className =
                        "green_cost"
                } else {
                    document.getElementById("green_ucost" + gen.id).className =
                        "empty_cost"
                }

                if (gen.id === 0) {
                    element.style.display = "block"
                } else {
                    if (
                        game.green_spice_gen[gen.id - 1].cmp(10) >= 0 ||
                        game.color_boosts >= 3 ||
                        game.prestige >= 1 ||
                        game.ascend >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
            case "blue":
                info_str =
                    "You have " +
                    format_inum(
                        game.blue_spice_gen[gen.id].floor(),
                        game.notation
                    ) +
                    " blue spice " +
                    gen.plural
                if (
                    game.blue_spice_gen[gen.id].cmp(
                        new Decimal(game.blue_spice_bought[gen.id])
                    ) === 0
                ) {
                    info_str += ",<br>producing "
                } else {
                    info_str +=
                        " (" +
                        format_small(game.blue_spice_bought[gen.id]) +
                        " bought),<br>producing "
                }
                info_str += format_idec(
                    game.blue_spice_gen[gen.id]
                        .floor()
                        .mul(game.total_blue_spice_boost[gen.id])
                        .div(gen.id + 1),
                    game.notation
                )
                if (gen.id === 0) {
                    info_str += " g blue spice/sec"
                    if (game.prestige_bought[10] >= 1)
                        info_str +=
                            ",<br>and producing " +
                            format_idec(
                                game.blue_spice_gen[gen.id].floor().pow(0.1),
                                game.notation
                            ) +
                            " green spice galaxies/sec"
                } else {
                    info_str +=
                        " blue spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                }
                if (game.condensed)
                    info_str =
                        format_inum(
                            game.blue_spice_gen[gen.id].floor(),
                            game.notation
                        ) +
                        " " +
                        gen.plural +
                        " <span class='bold'>" +
                        format_idec(
                            game.total_blue_spice_boost[gen.id],
                            game.notation
                        ) +
                        "x</span>"
                info.innerHTML = info_str

                boost.innerHTML =
                    "Your blue spice " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_blue_spice_boost[gen.id],
                        game.notation
                    ) +
                    "x"

                if (game.condensed) boost.style.display = "none"
                else boost.style.display = "block"

                document.getElementById("blue_cost" + gen.id).innerHTML =
                    "-" +
                    format_idec(game.blue_spice_price[gen.id], game.notation) +
                    " g blue spice"
                if (game.blue_spice.cmp(game.blue_spice_price[gen.id]) >= 0) {
                    document.getElementById("blue_cost" + gen.id).className =
                        "blue_cost"
                } else {
                    document.getElementById("blue_cost" + gen.id).className =
                        "empty_cost"
                }

                n =
                    Math.floor(game.blue_spice_bought[gen.id] / 10) * 10 +
                    10 -
                    game.blue_spice_bought[gen.id]
                price = game.blue_spice_price[gen.id]
                    .mul(1 - 1.5 ** n)
                    .div(-0.5)
                document.getElementById("blue_ucost" + gen.id).innerHTML =
                    "-" + format_idec(price, game.notation) + " g blue spice"
                if (game.blue_spice.cmp(price) >= 0) {
                    document.getElementById("blue_ucost" + gen.id).className =
                        "blue_cost"
                } else {
                    document.getElementById("blue_ucost" + gen.id).className =
                        "empty_cost"
                }

                if (gen.id === 0) {
                    element.style.display = "block"
                } else {
                    if (
                        game.blue_spice_gen[gen.id - 1].cmp(10) >= 0 ||
                        game.color_boosts >= 4 ||
                        game.prestige >= 1 ||
                        game.ascend >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
            case "pink":
                info_str =
                    "You have " +
                    format_inum(
                        game.pink_spice_gen[gen.id].floor(),
                        game.notation
                    ) +
                    " pink spice " +
                    gen.plural
                if (
                    game.pink_spice_gen[gen.id].cmp(
                        new Decimal(game.pink_spice_bought[gen.id])
                    ) === 0
                ) {
                    info_str += ",<br>producing "
                } else {
                    info_str +=
                        " (" +
                        format_small(game.pink_spice_bought[gen.id]) +
                        " bought),<br>producing "
                }
                info_str += format_idec(
                    game.pink_spice_gen[gen.id]
                        .floor()
                        .mul(game.total_pink_spice_boost[gen.id])
                        .div(gen.id + 1),
                    game.notation
                )
                if (gen.id === 0) {
                    info_str += " g pink spice/sec"
                    if (game.prestige_bought[10] >= 1)
                        info_str +=
                            ",<br>and producing " +
                            format_idec(
                                game.pink_spice_gen[gen.id].floor().pow(0.1),
                                game.notation
                            ) +
                            " blue spice galaxies/sec"
                } else {
                    info_str +=
                        " pink spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                }
                if (game.condensed) {
                    if (
                        gen.id === 5 &&
                        game.pink_spice_gen[gen.id].cmp(
                            new Decimal(game.pink_spice_bought[gen.id])
                        ) !== 0
                    ) {
                        info_str =
                            format_inum(
                                game.pink_spice_gen[gen.id].floor(),
                                game.notation
                            ) +
                            " " +
                            gen.plural +
                            " (" +
                            format_small(game.pink_spice_bought[gen.id]) +
                            " bought) <span class='bold'>" +
                            format_idec(
                                game.total_pink_spice_boost[gen.id],
                                game.notation
                            ) +
                            "x</span>"
                    } else {
                        info_str =
                            format_inum(
                                game.pink_spice_gen[gen.id].floor(),
                                game.notation
                            ) +
                            " " +
                            gen.plural +
                            " <span class='bold'>" +
                            format_idec(
                                game.total_pink_spice_boost[gen.id],
                                game.notation
                            ) +
                            "x</span>"
                    }
                }
                info.innerHTML = info_str

                boost.innerHTML =
                    "Your pink spice " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_pink_spice_boost[gen.id],
                        game.notation
                    ) +
                    "x"

                if (game.condensed) boost.style.display = "none"
                else boost.style.display = "block"

                document.getElementById("pink_cost" + gen.id).innerHTML =
                    "-" +
                    format_idec(game.pink_spice_price[gen.id], game.notation) +
                    " g pink spice"
                if (game.pink_spice.cmp(game.pink_spice_price[gen.id]) >= 0) {
                    document.getElementById("pink_cost" + gen.id).className =
                        "pink_cost"
                } else {
                    document.getElementById("pink_cost" + gen.id).className =
                        "empty_cost"
                }

                n =
                    Math.floor(game.pink_spice_bought[gen.id] / 10) * 10 +
                    10 -
                    game.pink_spice_bought[gen.id]
                price = game.pink_spice_price[gen.id]
                    .mul(1 - 1.6 ** n)
                    .div(-0.6)
                document.getElementById("pink_ucost" + gen.id).innerHTML =
                    "-" + format_idec(price, game.notation) + " g pink spice"
                if (game.pink_spice.cmp(price) >= 0) {
                    document.getElementById("pink_ucost" + gen.id).className =
                        "pink_cost"
                } else {
                    document.getElementById("pink_ucost" + gen.id).className =
                        "empty_cost"
                }

                if (gen.id === 0) {
                    element.style.display = "block"
                } else {
                    if (
                        game.pink_spice_gen[gen.id - 1].cmp(10) >= 0 ||
                        game.color_boosts >= 5 ||
                        game.prestige >= 1 ||
                        game.ascend >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
        }
    }

    if (
        game.red_spice_gen[2].cmp(10) >= 0 ||
        game.color_boosts >= 1 ||
        game.prestige >= 1 ||
        game.ascend >= 1
    ) {
        document.getElementById("red_gen_s").style.display = "block"

        let s_str =
            "You have " +
            format_small(game.red_strengthener) +
            " red spice strengtheners,<br>boosting all red spice generators " +
            format_idec(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    game.red_strengthener *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ),
                game.notation
            ) +
            "x"
        if (game.prestige_bought[18] >= 1)
            s_str =
                "You have " +
                format_small(game.red_strengthener) +
                " red spice strengtheners,<br>boosting all red spice generators " +
                format_idec(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        game.red_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ),
                    game.notation
                ) +
                "x"
        if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
            "You have " +
                format_small(game.red_strengthener) +
                " red spice strengtheners,<br>boosting all red spice generators " +
                format_idec(
                    Decimal.pow(2, game.red_strengthener),
                    game.notation
                ) +
                "x"
        if (
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6
        )
            s_str +=
                ",<br>boosting all yellow spice generators " +
                format_idec(
                    Decimal.pow(
                        1 + 0.2 * game.prestige_bought[5],
                        game.red_strengthener
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 1)
            s_str +=
                ",<br>boosting all yellow spice generators " +
                format_idec(
                    Decimal.pow(1.05, game.red_strengthener),
                    game.notation
                ) +
                "x"

        document.getElementById("red_info_s").innerHTML = s_str
        document.getElementById("red_cost_s").innerHTML =
            "-" +
            format_idec(game.red_strengthener_price, game.notation) +
            " g red spice"
        if (game.red_spice.cmp(game.red_strengthener_price) >= 0) {
            document.getElementById("red_cost_s").className = "red_cost"
        } else {
            document.getElementById("red_cost_s").className = "empty_cost"
        }
    } else {
        document.getElementById("red_gen_s").style.display = "none"
    }

    if (
        game.yellow_spice_gen[2].cmp(10) >= 0 ||
        game.color_boosts >= 2 ||
        game.prestige >= 1 ||
        game.ascend >= 1
    ) {
        document.getElementById("yellow_gen_s").style.display = "block"

        let s_str = ""
        s_str =
            "You have " +
            format_small(game.yellow_strengthener) +
            " yellow spice strengtheners,<br>boosting all red & yellow spice generators " +
            format_idec(
                new Decimal(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14])
                ).pow(
                    game.yellow_strengthener *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ),
                game.notation
            ) +
            "x"
        if (game.prestige_bought[18] >= 1)
            s_str =
                "You have " +
                format_small(game.yellow_strengthener) +
                " yellow spice strengtheners,<br>boosting all red & yellow spice generators " +
                format_idec(
                    new Decimal(
                        6 + 2 * (game.ascend_bought[2] + game.ascend_bought[14])
                    ).pow(
                        game.yellow_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ),
                    game.notation
                ) +
                "x"
        if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
            s_str =
                "You have " +
                format_small(game.yellow_strengthener) +
                " yellow spice strengtheners,<br>boosting all red & yellow spice generators " +
                format_idec(
                    new Decimal(2).pow(game.yellow_strengthener),
                    game.notation
                ) +
                "x"
        if (
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 2 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6
        )
            s_str +=
                ",<br>boosting all green spice generators " +
                format_idec(
                    new Decimal(1 + 0.2 * game.prestige_bought[5]).pow(
                        game.yellow_strengthener
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 2)
            s_str +=
                ",<br>boosting all green spice generators " +
                format_idec(
                    new Decimal(1.05).pow(game.yellow_strengthener),
                    game.notation
                ) +
                "x"
        document.getElementById("yellow_info_s").innerHTML = s_str
        document.getElementById("yellow_cost_s").innerHTML =
            "-" +
            format_idec(game.yellow_strengthener_price, game.notation) +
            " g yellow spice"
        if (game.yellow_spice.cmp(game.yellow_strengthener_price) >= 0) {
            document.getElementById("yellow_cost_s").className = "yellow_cost"
        } else {
            document.getElementById("yellow_cost_s").className = "empty_cost"
        }
    } else {
        document.getElementById("yellow_gen_s").style.display = "none"
    }

    if (
        game.green_spice_gen[2].cmp(10) >= 0 ||
        game.color_boosts >= 3 ||
        game.prestige >= 1 ||
        game.ascend >= 1
    ) {
        document.getElementById("green_gen_s").style.display = "block"

        let s_str = ""
        s_str =
            "You have " +
            format_small(game.green_strengthener) +
            " green spice strengtheners,<br>boosting all red, yellow & green spice generators " +
            format_idec(
                new Decimal(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14])
                ).pow(
                    game.green_strengthener *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ),
                game.notation
            ) +
            "x"
        if (game.prestige_bought[18] >= 1)
            s_str =
                "You have " +
                format_small(game.green_strengthener) +
                " green spice strengtheners,<br>boosting all red, yellow & green spice generators " +
                format_idec(
                    new Decimal(
                        6 + 2 * (game.ascend_bought[2] + game.ascend_bought[14])
                    ).pow(
                        game.green_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ),
                    game.notation
                ) +
                "x"
        if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
            s_str =
                "You have " +
                format_small(game.green_strengthener) +
                " green spice strengtheners,<br>boosting all red, yellow & green spice generators " +
                format_idec(
                    new Decimal(2).pow(game.green_strengthener),
                    game.notation
                ) +
                "x"
        if (
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 3 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6
        )
            s_str +=
                ",<br>boosting all blue spice generators " +
                format_idec(
                    new Decimal(1 + 0.2 * game.prestige_bought[5]).pow(
                        game.green_strengthener
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 3)
            s_str +=
                ",<br>boosting all blue spice generators " +
                format_idec(
                    new Decimal(1.05).pow(game.green_strengthener),
                    game.notation
                ) +
                "x"
        document.getElementById("green_info_s").innerHTML = s_str
        document.getElementById("green_cost_s").innerHTML =
            "-" +
            format_idec(game.green_strengthener_price, game.notation) +
            " g green spice"
        if (game.green_spice.cmp(game.green_strengthener_price) >= 0) {
            document.getElementById("green_cost_s").className = "green_cost"
        } else {
            document.getElementById("green_cost_s").className = "empty_cost"
        }
    } else {
        document.getElementById("green_gen_s").style.display = "none"
    }

    if (
        game.blue_spice_gen[2].cmp(10) >= 0 ||
        game.color_boosts >= 4 ||
        game.prestige >= 1 ||
        game.ascend >= 1
    ) {
        document.getElementById("blue_gen_s").style.display = "block"

        let s_str = ""
        s_str =
            "You have " +
            format_small(game.blue_strengthener) +
            " blue spice strengtheners,<br>boosting all red, yellow, green & blue spice generators " +
            format_idec(
                new Decimal(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14])
                ).pow(
                    game.blue_strengthener *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ),
                game.notation
            ) +
            "x"
        if (game.prestige_bought[18] >= 1)
            s_str =
                "You have " +
                format_small(game.blue_strengthener) +
                " blue spice strengtheners,<br>boosting all red, yellow, green & blue spice generators " +
                format_idec(
                    new Decimal(
                        6 + 2 * (game.ascend_bought[2] + game.ascend_bought[14])
                    ).pow(
                        game.blue_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ),
                    game.notation
                ) +
                "x"
        if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
            s_str =
                "You have " +
                format_small(game.blue_strengthener) +
                " blue spice strengtheners,<br>boosting all red, yellow, green & blue spice generators " +
                format_idec(
                    new Decimal(2).pow(game.blue_strengthener),
                    game.notation
                ) +
                "x"
        if (
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 4 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6
        )
            s_str +=
                ",<br>boosting all pink spice generators " +
                format_idec(
                    new Decimal(1 + 0.2 * game.prestige_bought[5]).pow(
                        game.blue_strengthener
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 4)
            s_str +=
                ",<br>boosting all pink spice generators " +
                format_idec(
                    new Decimal(1.05).pow(game.blue_strengthener),
                    game.notation
                ) +
                "x"
        document.getElementById("blue_info_s").innerHTML = s_str
        document.getElementById("blue_cost_s").innerHTML =
            "-" +
            format_idec(game.blue_strengthener_price, game.notation) +
            " g blue spice"
        if (game.blue_spice.cmp(game.blue_strengthener_price) >= 0) {
            document.getElementById("blue_cost_s").className = "blue_cost"
        } else {
            document.getElementById("blue_cost_s").className = "empty_cost"
        }
    } else {
        document.getElementById("blue_gen_s").style.display = "none"
    }

    if (
        game.pink_spice_gen[2].cmp(10) >= 0 ||
        game.color_boosts >= 5 ||
        game.prestige >= 1 ||
        game.ascend >= 1
    ) {
        document.getElementById("pink_gen_s").style.display = "block"

        document.getElementById("pink_info_s").innerHTML =
            "You have " +
            format_small(game.pink_strengthener) +
            " pink spice strengtheners,<br>boosting ALL spice generators " +
            format_idec(
                new Decimal(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14])
                ).pow(
                    game.pink_strengthener *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ),
                game.notation
            ) +
            "x"
        if (game.prestige_bought[18] >= 1)
            document.getElementById("pink_info_s").innerHTML =
                "You have " +
                format_small(game.pink_strengthener) +
                " pink spice strengtheners,<br>boosting ALL spice generators " +
                format_idec(
                    new Decimal(
                        6 + 2 * (game.ascend_bought[2] + game.ascend_bought[14])
                    ).pow(
                        game.pink_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ),
                    game.notation
                ) +
                "x"
        if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
            document.getElementById("pink_info_s").innerHTML =
                "You have " +
                format_small(game.pink_strengthener) +
                " pink spice strengtheners,<br>boosting ALL spice generators " +
                format_idec(
                    new Decimal(2).pow(game.pink_strengthener),
                    game.notation
                ) +
                "x"
        document.getElementById("pink_cost_s").innerHTML =
            "-" +
            format_idec(game.pink_strengthener_price, game.notation) +
            " g pink spice"
        if (game.pink_spice.cmp(game.pink_strengthener_price) >= 0) {
            document.getElementById("pink_cost_s").className = "pink_cost"
        } else {
            document.getElementById("pink_cost_s").className = "empty_cost"
        }
    } else {
        document.getElementById("pink_gen_s").style.display = "none"
    }

    let scaling = 1
    if (game.ascend_challenge === 3) scaling = 10

    if (
        game.red_spice_gen[5].cmp(10) >= 0 ||
        game.color_boosts >= 1 ||
        game.prestige >= 1 ||
        game.ascend >= 1
    ) {
        document.getElementById("color_shift").style.display = "block"
        if (game.color_boosts < 4) {
            document.getElementById("color_shift_header").innerHTML =
                "Color Shift"
            document.getElementById("color_shift_info").innerHTML =
                "You have " +
                format_small(game.color_boosts) +
                " color shifts,<br>boosting ALL spice generators " +
                format_idec(
                    new Decimal(
                        2 +
                            0.2 * game.prestige_bought[2] +
                            2 * (game.ascend_bought[2] + game.ascend_bought[14])
                    ).pow(game.color_boosts),
                    game.notation
                ) +
                "x"
            if (game.prestige_bought[18] >= 1)
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color shifts,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(
                            6 +
                                2 *
                                    (game.ascend_bought[2] +
                                        game.ascend_bought[14])
                        ).pow(game.color_boosts),
                        game.notation
                    ) +
                    "x"
            if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color shifts,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(2).pow(game.color_boosts),
                        game.notation
                    ) +
                    "x"
            document.getElementById("color_shift_button").innerHTML =
                "Reset for a new spice color"
        } else {
            document.getElementById("color_shift_header").innerHTML =
                "Color Boost"
            document.getElementById("color_shift_info").innerHTML =
                "You have " +
                format_small(game.color_boosts) +
                " color boosts,<br>boosting ALL spice generators " +
                format_idec(
                    new Decimal(
                        2 +
                            0.2 * game.prestige_bought[2] +
                            2 * (game.ascend_bought[2] + game.ascend_bought[14])
                    ).pow(game.color_boosts * 2 - 4),
                    game.notation
                ) +
                "x"
            if (game.prestige_bought[18] >= 1)
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color boosts,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(
                            6 +
                                2 *
                                    (game.ascend_bought[2] +
                                        game.ascend_bought[14])
                        ).pow(game.color_boosts * 2 - 4),
                        game.notation
                    ) +
                    "x"
            if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color boosts,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(2).pow(game.color_boosts * 2 - 4),
                        game.notation
                    ) +
                    "x"
            document.getElementById("color_shift_button").innerHTML =
                "Reset for a spice boost"
        }
        if (
            game.color_boosts >= 6 &&
            game.color_boosts < 10 &&
            game.prestige === 0 &&
            game.ascend === 0
        )
            document.getElementById("color_shift_unlock").style.display =
                "block"
        else
            document.getElementById("color_shift_unlock").style.display = "none"
        switch (game.color_boosts) {
            case 0:
                document.getElementById("color_shift_req").innerHTML =
                    "Requires " +
                    format_small(50 * scaling) +
                    " red spice galaxies"
                break
            case 1:
                document.getElementById("color_shift_req").innerHTML =
                    "Requires " +
                    format_small(50 * scaling) +
                    " yellow spice galaxies"
                break
            case 2:
                document.getElementById("color_shift_req").innerHTML =
                    "Requires " +
                    format_small(50 * scaling) +
                    " green spice galaxies"
                break
            case 3:
                document.getElementById("color_shift_req").innerHTML =
                    "Requires " +
                    format_small(50 * scaling) +
                    " blue spice galaxies"
                break
            default:
                if (game.prestige_bought[24] === 0) {
                    if (game.color_boosts <= 8)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 25 - 50) * scaling
                            ) +
                            " pink spice galaxies"
                    else if (game.color_boosts <= 29)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 50 - 250) * scaling
                            ) +
                            " pink spice galaxies"
                    else if (game.color_boosts <= 133)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 75 - 975) * scaling
                            ) +
                            " pink spice galaxies"
                    else if (game.color_boosts <= 223)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 100 - 4300) * scaling
                            ) +
                            " pink spice galaxies"
                    else if (game.color_boosts <= 523)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 150 - 15450) * scaling
                            ) +
                            " pink spice galaxies"
                    else if (game.color_boosts <= 1201)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 200 - 41600) * scaling
                            ) +
                            " pink spice galaxies"
                    else if (game.color_boosts <= 4104)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 300 - 161700) * scaling
                            ) +
                            " pink spice galaxies"
                    else if (game.color_boosts <= 7501)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 500 - 982500) * scaling
                            ) +
                            " pink spice galaxies"
                    else if (game.color_boosts <= 50003)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 1000 - 4733000) * scaling
                            ) +
                            " pink spice galaxies"
                    else if (game.color_boosts <= 2000000)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 2500 - 79737500) * scaling
                            ) +
                            " pink spice galaxies"
                    else
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (((game.color_boosts - 1997500) *
                                    (game.color_boosts - 1997499)) /
                                    2 +
                                    4917136250) *
                                    scaling
                            ) +
                            " pink spice galaxies"
                } else {
                    if (game.color_boosts <= 8)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 25 - 50) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else if (game.color_boosts <= 29)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 50 - 250) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else if (game.color_boosts <= 133)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 75 - 975) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else if (game.color_boosts <= 223)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 100 - 4300) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else if (game.color_boosts <= 523)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 150 - 15450) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else if (game.color_boosts <= 1201)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 200 - 41600) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else if (game.color_boosts <= 4104)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 300 - 161700) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else if (game.color_boosts <= 7500)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 500 - 982500) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else if (game.color_boosts <= 50003)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 1000 - 4733000) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else if (game.color_boosts <= 2000000)
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (game.color_boosts * 2500 - 79737500) * scaling
                            ) +
                            " bought pink spice galaxies"
                    else
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                (((game.color_boosts - 1997500) *
                                    (game.color_boosts - 1997499)) /
                                    2 +
                                    4917136250) *
                                    scaling
                            ) +
                            " bought pink spice galaxies"
                }
                break
        }
    } else {
        document.getElementById("color_shift").style.display = "none"
    }

    let can_boost = false
    switch (game.color_boosts) {
        case 0:
            if (game.red_spice_gen[5].cmp(50 * scaling) >= 0) can_boost = true
            break
        case 1:
            if (game.yellow_spice_gen[5].cmp(50 * scaling) >= 0)
                can_boost = true
            break
        case 2:
            if (game.green_spice_gen[5].cmp(50 * scaling) >= 0) can_boost = true
            break
        case 3:
            if (game.blue_spice_gen[5].cmp(50 * scaling) >= 0) can_boost = true
            break
        default:
            if (game.color_boosts <= 8) {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 25 - 50) * scaling
                )
                    can_boost = true
            } else if (game.color_boosts <= 29) {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 50 - 250) * scaling
                )
                    can_boost = true
            } else if (game.color_boosts <= 133) {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 75 - 975) * scaling
                )
                    can_boost = true
            } else if (game.color_boosts <= 223) {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 100 - 4300) * scaling
                )
                    can_boost = true
            } else if (game.color_boosts <= 523) {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 150 - 15450) * scaling
                )
                    can_boost = true
            } else if (game.color_boosts <= 1201) {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 200 - 41600) * scaling
                )
                    can_boost = true
            } else if (game.color_boosts <= 4104) {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 300 - 161700) * scaling
                )
                    can_boost = true
            } else if (game.color_boosts <= 7501) {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 500 - 982500) * scaling
                )
                    can_boost = true
            } else if (game.color_boosts <= 50003) {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 1000 - 4733000) * scaling
                )
                    can_boost = true
            } else {
                if (
                    game.pink_spice_bought[5] >=
                    (game.color_boosts * 2500 - 79737500) * scaling
                )
                    can_boost = true
            }
            break
    }

    if (can_boost) {
        if (game.color_boosts >= 4) {
            document.getElementById("color_shift_button").className =
                "spice_buy boost"
        } else if (game.color_boosts === 3) {
            document.getElementById("color_shift_button").className =
                "spice_buy shift4"
        } else if (game.color_boosts === 2) {
            document.getElementById("color_shift_button").className =
                "spice_buy shift3"
        } else if (game.color_boosts === 1) {
            document.getElementById("color_shift_button").className =
                "spice_buy shift2"
        } else if (game.color_boosts === 0) {
            document.getElementById("color_shift_button").className =
                "spice_buy shift1"
        }
    } else {
        document.getElementById("color_shift_button").className =
            "spice_buy noshift"
    }

    if (game.color_boosts >= 1 && game.tab === 0) {
        document.getElementById("spices_tabs").style.display = "flex"
        document.getElementById("red_max_all").style.display = "block"

        if (game.color_boosts >= 2) {
            document.getElementById("yellow_max_all").style.display = "block"
            document.getElementById("green").innerHTML = "GREEN"
            if (game.subtab[0] === 2)
                document.getElementById("green").className = "subtab selected"
            else document.getElementById("green").className = "subtab unlocked"

            if (game.color_boosts >= 3) {
                document.getElementById("green_max_all").style.display = "block"
                document.getElementById("blue").innerHTML = "BLUE"
                if (game.subtab[0] === 3)
                    document.getElementById("blue").className =
                        "subtab selected"
                else
                    document.getElementById("blue").className =
                        "subtab unlocked"

                if (game.color_boosts >= 4) {
                    document.getElementById("blue_max_all").style.display =
                        "block"
                    document.getElementById("pink").innerHTML = "PINK"
                    if (game.subtab[0] === 4)
                        document.getElementById("pink").className =
                            "subtab selected"
                    else
                        document.getElementById("pink").className =
                            "subtab unlocked"

                    if (game.color_boosts >= 5)
                        document.getElementById("pink_max_all").style.display =
                            "block"
                    else
                        document.getElementById("pink_max_all").style.display =
                            "none"
                } else {
                    document.getElementById("blue_max_all").style.display =
                        "none"
                    document.getElementById("pink").innerHTML = "LOCKED"
                    document.getElementById("pink").className = "subtab locked"
                }
            } else {
                document.getElementById("green_max_all").style.display = "none"
                document.getElementById("blue").innerHTML = "LOCKED"
                document.getElementById("blue").className = "subtab locked"
            }
        } else {
            document.getElementById("yellow_max_all").style.display = "none"
            document.getElementById("green").innerHTML = "LOCKED"
            document.getElementById("green").className = "subtab locked"
        }
    } else {
        document.getElementById("spices_tabs").style.display = "none"
        document.getElementById("red_max_all").style.display = "none"
    }

    if (game.prestige >= 1 || game.ascend >= 1) {
        document.getElementById("red_max_all").style.display = "inline"
        document.getElementById("yellow_max_all").style.display = "inline"
        document.getElementById("green_max_all").style.display = "inline"
        document.getElementById("blue_max_all").style.display = "inline"
        document.getElementById("pink_max_all").style.display = "inline"

        if (game.prestige_bought[0] >= 1)
            document.getElementById("red_auto").style.display = "inline"
        else document.getElementById("red_auto").style.display = "none"
        if (game.prestige_bought[0] >= 2)
            document.getElementById("yellow_auto").style.display = "inline"
        else document.getElementById("yellow_auto").style.display = "none"
        if (game.prestige_bought[0] >= 3)
            document.getElementById("green_auto").style.display = "inline"
        else document.getElementById("green_auto").style.display = "none"
        if (game.prestige_bought[0] >= 4)
            document.getElementById("blue_auto").style.display = "inline"
        else document.getElementById("blue_auto").style.display = "none"
        if (game.prestige_bought[0] >= 5)
            document.getElementById("pink_auto").style.display = "inline"
        else document.getElementById("pink_auto").style.display = "none"

        if (game.prestige_bought[7] >= 1)
            document.getElementById("boost_auto").style.display = "inline"
        else document.getElementById("boost_auto").style.display = "none"
    } else {
        document.getElementById("red_auto").style.display = "none"
        document.getElementById("yellow_auto").style.display = "none"
        document.getElementById("green_auto").style.display = "none"
        document.getElementById("blue_auto").style.display = "none"
        document.getElementById("pink_auto").style.display = "none"
        document.getElementById("boost_auto").style.display = "none"
    }
}

//graphics updates for prestige page
function prestige_update() {
    document.getElementById("rainbow_spice_num").innerHTML =
        format_idec(game.rainbow_spice, game.notation) + " μg"
    document.getElementById("rainbow_spice_num2").innerHTML =
        format_idec(game.rainbow_spice, game.notation) + " μg"
    document.getElementById("rainbow_spice_num3").innerHTML =
        format_idec(game.rainbow_spice, game.notation) + " μg"

    if (game.color_boosts >= 10) {
        document.getElementById("prestige_button").className =
            "prestige_button p_unlocked"
        document.getElementById("prestige_up").style.display = "block"
        if (
            game.ascend_bought[15] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6
        ) {
            if (game.color_boosts <= 16)
                document.getElementById("prestige_up").innerHTML =
                    "+" +
                    format_idec(
                        new Decimal(2).pow(
                            (game.color_boosts - 10) / 3 + game.ascend / 20
                        ),
                        game.notation
                    ) +
                    " μg rainbow spice"
            else
                document.getElementById("prestige_up").innerHTML =
                    "+" +
                    format_idec(
                        new Decimal(2).pow(
                            (game.color_boosts - 8) / 4 + game.ascend / 20
                        ),
                        game.notation
                    ) +
                    " μg rainbow spice"
        } else {
            if (game.color_boosts <= 16)
                document.getElementById("prestige_up").innerHTML =
                    "+" +
                    format_idec(
                        new Decimal(2).pow((game.color_boosts - 10) / 3),
                        game.notation
                    ) +
                    " μg rainbow spice"
            else
                document.getElementById("prestige_up").innerHTML =
                    "+" +
                    format_idec(
                        new Decimal(2).pow((game.color_boosts - 8) / 4),
                        game.notation
                    ) +
                    " μg rainbow spice"
        }
        document.getElementById("prestige_req").style.color = "white"
        document.getElementById("prestige_req").innerHTML =
            format_small(game.color_boosts) + " color boosts done"
    } else {
        document.getElementById("prestige_button").className =
            "prestige_button p_locked"
        document.getElementById("prestige_up").style.display = "none"
        document.getElementById("prestige_req").style.color = "grey"
        document.getElementById("prestige_req").innerHTML =
            "10 color boosts required"
    }

    if (game.prestige_bought[12] >= 1) {
        document.getElementById("prestige_tabs").style.display = "flex"
    } else {
        document.getElementById("prestige_tabs").style.display = "none"
    }

    if (game.prestige_bought[15] >= 1) {
        document.getElementById("prestige_auto_block").style.display = "block"

        if (game.autopr_mode === 0) {
            document.getElementById("prestige_boosts").style.display = "flex"
            document.getElementById("prestige_spice").style.display = "none"
            document.getElementById("prestige_time").style.display = "none"
            if (game.ascend_bought[9]) {
                document.getElementById("prestige_boosts_delta").style.display =
                    "flex"
            } else {
                document.getElementById("prestige_boosts_delta").style.display =
                    "none"
            }
            document.getElementById("prestige_spice_delta").style.display =
                "none"
        } else if (game.autopr_mode === 1) {
            document.getElementById("prestige_boosts").style.display = "none"
            document.getElementById("prestige_spice").style.display = "flex"
            document.getElementById("prestige_time").style.display = "none"
            document.getElementById("prestige_boosts_delta").style.display =
                "none"
            if (game.ascend_bought[9]) {
                document.getElementById("prestige_spice_delta").style.display =
                    "flex"
            } else {
                document.getElementById("prestige_spice_delta").style.display =
                    "none"
            }
        } else if (game.autopr_mode === 2) {
            document.getElementById("prestige_boosts").style.display = "none"
            document.getElementById("prestige_spice").style.display = "none"
            document.getElementById("prestige_time").style.display = "flex"
            document.getElementById("prestige_boosts_delta").style.display =
                "none"
            document.getElementById("prestige_spice_delta").style.display =
                "none"
        }
    } else {
        document.getElementById("prestige_auto_block").style.display = "none"
    }

    if (game.ascend_bought[8]) {
        document.getElementById("upgrade_auto_toggle").style.display = "block"
        document.getElementById("upgrade_auto_toggle2").style.display = "block"
    } else {
        document.getElementById("upgrade_auto_toggle").style.display = "none"
        document.getElementById("upgrade_auto_toggle2").style.display = "none"
    }

    if (game.ascend_bought[25]) {
        document.getElementById("rainbow_spice_up").style.display = "block"
        document.getElementById("rainbow_spice_up2").style.display = "block"
        document.getElementById("rainbow_spice_up3").style.display = "block"

        let amount = new Decimal(0)
        if (game.color_boosts <= 16)
            amount = new Decimal(2).pow((game.color_boosts - 10) / 3)
        else amount = new Decimal(2).pow((game.color_boosts - 8) / 4)
        if (
            game.ascend_bought[15] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6
        )
            amount = amount.mul(Decimal.pow(2, game.ascend / 20))

        let str =
            "+" +
            format_idec(amount.div(10), game.notation) +
            " μg rainbow spice/sec"

        document.getElementById("rainbow_spice_up").innerHTML = str
        document.getElementById("rainbow_spice_up2").innerHTML = str
        document.getElementById("rainbow_spice_up3").innerHTML = str
    } else {
        document.getElementById("rainbow_spice_up").style.display = "none"
        document.getElementById("rainbow_spice_up2").style.display = "none"
        document.getElementById("rainbow_spice_up3").style.display = "none"
    }

    for (const u of prestige_upgrade.upgrades) {
        switch (u.id) {
            case 0:
                switch (game.prestige_bought[u.id]) {
                    case 0:
                        u.desc = "Unlocks automation for red spice"
                        break
                    case 1:
                        u.desc = "Unlocks automation for yellow spice"
                        break
                    case 2:
                        u.desc = "Unlocks automation for green spice"
                        break
                    case 3:
                        u.desc = "Unlocks automation for blue spice"
                        break
                    case 4:
                    default:
                        u.desc = "Unlocks automation for pink spice"
                        break
                }
                break
            case 1:
                if (game.prestige >= 1)
                    if (game.ascend_bought[1]) {
                        if (game.prestige >= 1000000) {
                            u.desc =
                                "Times Prestiged stat boosts all spice production<br>(Currently: " +
                                format_idec(
                                    Decimal.pow(
                                        10 ** 25,
                                        10 * (game.prestige - 914447) ** 0.25 +
                                            829.5
                                    ),
                                    game.notation
                                ) +
                                "x)"
                        } else {
                            u.desc =
                                "Times Prestiged stat boosts all spice production<br>(Currently: " +
                                format_idec(
                                    Decimal.pow(
                                        10 ** 25,
                                        game.prestige **
                                            (0.5 + 40 / (game.prestige + 80))
                                    ),
                                    game.notation
                                ) +
                                "x)"
                        }
                    } else {
                        u.desc =
                            "Times Prestiged stat boosts all spice production<br>(Currently: " +
                            format_num(
                                2.5 * game.prestige * (game.prestige + 1),
                                game.notation
                            ) +
                            "x)"
                    }
                else
                    u.desc =
                        "Times Prestiged stat boosts all spice production<br>(Currently: " +
                        format_num(1, game.notation) +
                        "x)"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Times Prestiged stat boosts all spice production<br>(Disabled)"
                break
            case 2:
                if (game.prestige_bought[u.id] < u.max)
                    u.desc =
                        "Increase boost from strengtheners/shifts<br>(" +
                        format_dec(
                            2 + 0.2 * game.prestige_bought[u.id],
                            game.notation
                        ) +
                        "x -> " +
                        format_dec(
                            2.2 + 0.2 * game.prestige_bought[u.id],
                            game.notation
                        ) +
                        "x)"
                else
                    u.desc =
                        "Increase boost from strengtheners/shifts<br>(" +
                        format_dec(5, game.notation) +
                        "x)"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Increase boost from strengtheners/shifts<br>(Disabled)"
                break
            case 3:
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6
                ) {
                    switch (game.prestige_bought[u.id]) {
                        case 0:
                            u.desc =
                                "Boost from buying 10 is squared<br>(Disabled)"
                            break
                        case 1:
                            u.desc =
                                "Boost from buying 10 is cubed<br>(Disabled)"
                            break
                        case 2:
                            u.desc =
                                "Boost from buying 10 is raised to the fourth power<br>(Disabled)"
                            break
                        case 3:
                        default:
                            u.desc =
                                "Boost from buying 10 is raised to the fifth power<br>(Disabled)"
                            break
                    }
                } else {
                    switch (game.prestige_bought[u.id]) {
                        case 0:
                            u.desc = "Boost from buying 10 is squared"
                            break
                        case 1:
                            u.desc = "Boost from buying 10 is cubed"
                            break
                        case 2:
                            u.desc =
                                "Boost from buying 10 is raised to the fourth power"
                            break
                        case 3:
                        default:
                            u.desc =
                                "Boost from buying 10 is raised to the fifth power"
                            break
                    }
                }
                break
            case 4:
                if (game.prestige_bought[u.id] < u.max) {
                    if (game.prestige_bought[u.id] === 0)
                        u.desc =
                            "You start with " + format_small(1) + " color shift"
                    else
                        u.desc =
                            "You start with " +
                            format_small(game.prestige_bought[u.id] + 1) +
                            " color shifts"
                } else
                    u.desc =
                        "You start with " + format_small(4) + " color shifts"
                break
            case 5:
                if (game.prestige_bought[u.id] === 0)
                    u.desc =
                        "Strengtheners boost the next color more<br>(" +
                        format_dec(1.05, 0) +
                        "x -> " +
                        format_dec(1.2, 0) +
                        "x)"
                else if (game.prestige_bought[u.id] < u.max)
                    u.desc =
                        "Strengtheners boost the next color more<br>(" +
                        format_dec(1 + 0.2 * game.prestige_bought[u.id], 0) +
                        "x -> " +
                        format_dec(1.2 + 0.2 * game.prestige_bought[u.id], 0) +
                        "x)"
                else
                    u.desc =
                        "Strengtheners boost the next color more<br>(" +
                        format_dec(2, 0) +
                        "x)"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Strengtheners boost the next color more<br>(Disabled)"
                break
            case 6:
                u.desc =
                    "All spice production is boosted based on unspent rainbow spice<br>(Currently: " +
                    format_idec(
                        game.rainbow_spice.div(256).pow(5).add(1),
                        game.notation
                    ) +
                    "x)"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "All spice production is boosted based on unspent rainbow spice<br>(Disabled)"
                break
            case 8:
                u.desc =
                    "All spices boost the previous color based on that spice's amount"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "All spices boost the previous color based on that spice's amount<br>(Disabled)"
                break
            case 9:
                switch (game.prestige_bought[u.id]) {
                    case 0:
                        u.desc =
                            "Reduce the strengthener price scaling<br>(" +
                            format_small(10) +
                            "x -> " +
                            format_small(8) +
                            "x)"
                        break
                    case 1:
                        u.desc =
                            "Reduce the strengthener price scaling<br>(" +
                            format_small(8) +
                            "x -> " +
                            format_small(6) +
                            "x)"
                        break
                    case 2:
                        u.desc =
                            "Reduce the strengthener price scaling<br>(" +
                            format_small(6) +
                            "x -> " +
                            format_small(4) +
                            "x)"
                        break
                    case 3:
                        u.desc =
                            "Reduce the strengthener price scaling<br>(" +
                            format_small(4) +
                            "x -> " +
                            format_small(3) +
                            "x)"
                        break
                    case 4:
                        u.desc =
                            "Reduce the strengthener price scaling<br>(" +
                            format_small(3) +
                            "x)"
                        break
                }
                break
            case 11:
                u.desc = "Red spice boosts every other color by its amount"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Red spice boosts every other color by its amount<br>(Disabled)"
                break
            case 14:
                u.desc = "Crystallized spice boosts pink spice by its amount"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Crystallized spice boosts pink spice by its amount<br>(Disabled)"
                break
            case 16:
                u.desc =
                    "Crystallized spice also boosts other colors by its amount"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Crystallized spice also boosts other colors by its amount<br>(Disabled)"
                break
            case 17:
                u.desc =
                    "Crystallized spice production is boosted based on your color boosts<br>(Currently: " +
                    format_idec(
                        Decimal.pow(1.0135, game.color_boosts),
                        game.notation
                    ) +
                    "x)"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Crystallized spice production is boosted based on your color boosts<br>(Disabled)"
                break
            case 18:
                switch (game.prestige_bought[u.id]) {
                    case 0:
                        u.desc =
                            "Increase boost from strengtheners/boosts<br>(" +
                            format_dec(5, game.notation) +
                            "x -> " +
                            format_dec(6, game.notation) +
                            "x)"
                        break
                    case 1:
                        u.desc =
                            "Increase boost from strengtheners/boosts<br>(" +
                            format_dec(6, game.notation) +
                            "x)"
                        break
                }
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(Disabled)"
                break
            case 19:
                u.desc =
                    "Crystal infusions also boost crystallized spice production 1.08x"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Crystal infusions also boost crystallized spice production 1.08x<br>(Disabled)"
                break
            case 20:
                if (game.prestige_bought[u.id] < u.max)
                    u.desc =
                        "You get " +
                        format_small(
                            (12 + 12 * game.prestige_bought[u.id]) *
                                (1 + game.ascend_bought[5])
                        ) +
                        " free crystal infusions"
                else
                    u.desc =
                        "You get " +
                        format_small(144 * (1 + game.ascend_bought[5])) +
                        " free crystal infusions"
                break
            case 21:
                u.desc =
                    "Crystallized spice production is boosted by unspent rainbow spice<br>(Currently: " +
                    format_idec(
                        game.rainbow_spice
                            .div(Decimal.pow(2, 292.5))
                            .pow(4 / 3)
                            .add(1),
                        game.notation
                    ) +
                    "x)"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Crystallized spice production is boosted by unspent rainbow spice<br>(Disabled)"
                break
            case 23:
                u.desc =
                    "Crystallized spice furnace multipliers are raised to the 1.25 power"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Crystallized spice furnace multipliers are raised to the 1.25 power<br>(Disabled)"
                break
        }

        let button = prestige_map.get(u)
        button.innerHTML =
            u.desc +
            '<br><span class="bold">-' +
            format_idec(u.price, game.notation) +
            " μg rainbow spice</span>"
        if (u.id === 25) {
            if (game.prestige_bought[u.id] >= u.max) {
                button.className = "prestige_upgrade c_bought p_special"
            } else {
                if (game.rainbow_spice.cmp(u.price) >= 0) {
                    button.className = "prestige_upgrade c_unlocked p_special"
                } else {
                    button.className = "prestige_upgrade p_locked p_special"
                }
            }
        } else if (u.id === 12) {
            if (game.prestige_bought[u.id] >= u.max) {
                button.className = "prestige_upgrade p_bought p_special"
            } else {
                if (game.rainbow_spice.cmp(u.price) >= 0) {
                    button.className = "prestige_upgrade p_unlocked2 p_special"
                } else {
                    button.className = "prestige_upgrade p_locked p_special"
                }
            }
        } else if (u.id < 12) {
            if (game.prestige_bought[u.id] >= u.max) {
                button.className = "prestige_upgrade p_bought"
            } else {
                if (game.rainbow_spice.cmp(u.price) >= 0) {
                    button.className = "prestige_upgrade p_unlocked2"
                } else {
                    button.className = "prestige_upgrade p_locked"
                }
            }
        } else {
            if (game.prestige_bought[u.id] >= u.max) {
                button.className = "prestige_upgrade c_bought"
            } else {
                if (game.rainbow_spice.cmp(u.price) >= 0) {
                    button.className = "prestige_upgrade c_unlocked"
                } else {
                    button.className = "prestige_upgrade p_locked"
                }
            }
        }
    }
}

//graphics updates for crystallized spice
function crystal_update() {
    document.getElementById("crystal_spice_num").innerHTML =
        format_idec(game.crystal_spice, game.notation) + " g"
    document.getElementById("crystal_spice_up").innerHTML =
        "+" +
        format_idec(
            game.crystal_spice_gen[0]
                .floor()
                .mul(game.total_crystal_spice_boost[0])
                .mul(3),
            game.notation
        ) +
        " g crystallized spice/sec"
    if (
        game.prestige_bought[14] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    ) {
        document.getElementById("crystal_spice_up").innerHTML =
            "+" +
            format_idec(
                game.crystal_spice_gen[0]
                    .floor()
                    .mul(game.total_crystal_spice_boost[0])
                    .mul(3),
                game.notation
            ) +
            " g crystallized spice/sec<br>Your crystallized spice is boosting pink spice production " +
            format_idec(game.crystal_spice.pow(3).add(1), game.notation) +
            "x"
        if (game.prestige_bought[16] >= 1)
            document.getElementById("crystal_spice_up").innerHTML =
                "+" +
                format_idec(
                    game.crystal_spice_gen[0]
                        .floor()
                        .mul(game.total_crystal_spice_boost[0])
                        .mul(3),
                    game.notation
                ) +
                " g crystallized spice/sec<br>Your crystallized spice is boosting pink spice production " +
                format_idec(game.crystal_spice.pow(3).add(1), game.notation) +
                "x,<br>and boosting red, yellow, green & blue spice production " +
                format_idec(game.crystal_spice.pow(12).add(1), game.notation) +
                "x"
    }

    for (const gen of spice_gen.generators) {
        let element = spice_map.get(gen)
        let info = element.querySelector(".spice_gen_info")
        let boost = element.querySelector(".spice_gen_boost")

        let info_str = ""
        let n = 0
        let price = 0
        switch (gen.color) {
            case "crystal":
                info_str =
                    "You have " +
                    format_inum(
                        game.crystal_spice_gen[gen.id].floor(),
                        game.notation
                    ) +
                    " crystallized spice " +
                    gen.plural
                if (
                    game.crystal_spice_gen[gen.id].cmp(
                        new Decimal(game.crystal_spice_bought[gen.id])
                    ) === 0
                ) {
                    info_str += ",<br>producing "
                } else {
                    info_str +=
                        " (" +
                        format_small(game.crystal_spice_bought[gen.id]) +
                        " bought),<br>producing "
                }
                if (gen.id === 0) {
                    info_str +=
                        format_idec(
                            game.crystal_spice_gen[gen.id]
                                .floor()
                                .mul(game.total_crystal_spice_boost[gen.id])
                                .mul(3),
                            game.notation
                        ) + " g crystallized spice/sec"
                    if (
                        game.prestige_bought[24] >= 1 &&
                        game.ascend_challenge !== 2
                    ) {
                        info_str +=
                            ",<br>and producing " +
                            format_idec(
                                game.crystal_spice_gen[gen.id].floor().pow(2),
                                game.notation
                            ) +
                            " pink spice galaxies/sec"
                    }
                } else {
                    info_str +=
                        format_idec(
                            game.crystal_spice_gen[gen.id]
                                .floor()
                                .mul(game.total_crystal_spice_boost[gen.id])
                                .mul(3),
                            game.notation
                        ) +
                        " crystallized spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                }
                if (game.condensed)
                    info_str =
                        format_inum(
                            game.crystal_spice_gen[gen.id].floor(),
                            game.notation
                        ) +
                        " " +
                        gen.plural +
                        " <span class='bold'>" +
                        format_idec(
                            game.total_crystal_spice_boost[gen.id],
                            game.notation
                        ) +
                        "x</span>"
                info.innerHTML = info_str

                boost.innerHTML =
                    "Your crystallized spice " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_crystal_spice_boost[gen.id],
                        game.notation
                    ) +
                    "x"

                if (game.condensed) boost.style.display = "none"
                else boost.style.display = "block"

                document.getElementById("crystal_cost" + gen.id).innerHTML =
                    "-" +
                    format_idec(
                        game.crystal_spice_price[gen.id],
                        game.notation
                    ) +
                    " μg rainbow spice"
                if (
                    game.rainbow_spice.cmp(game.crystal_spice_price[gen.id]) >=
                    0
                ) {
                    document.getElementById("crystal_cost" + gen.id).className =
                        "rainbow_cost"
                } else {
                    document.getElementById("crystal_cost" + gen.id).className =
                        "empty_cost"
                }

                n =
                    Math.floor(game.crystal_spice_bought[gen.id] / 5) * 5 +
                    5 -
                    game.crystal_spice_bought[gen.id]
                price = game.crystal_spice_price[gen.id].mul(1 - 2 ** n).div(-1)
                document.getElementById("crystal_ucost" + gen.id).innerHTML =
                    "-" +
                    format_idec(price, game.notation) +
                    " μg rainbow spice"
                if (game.rainbow_spice.cmp(price) >= 0) {
                    document.getElementById(
                        "crystal_ucost" + gen.id
                    ).className = "rainbow_cost"
                } else {
                    document.getElementById(
                        "crystal_ucost" + gen.id
                    ).className = "empty_cost"
                }

                if (gen.id === 0) {
                    element.style.display = "block"
                } else {
                    if (
                        game.crystal_spice_gen[gen.id - 1].cmp(5) >= 0 ||
                        game.ascend >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
        }
    }

    if (game.crystal_spice_gen[2].cmp(5) >= 0 || game.ascend >= 1) {
        document.getElementById("crystal_gen_s").style.display = "block"

        let s_str =
            "You have " +
            format_small(game.crystal_strengthener) +
            " crystallized spice strengtheners,<br>boosting all crystallized spice generators " +
            format_idec(
                Decimal.pow(4, game.crystal_strengthener),
                game.notation
            ) +
            "x"

        document.getElementById("crystal_info_s").innerHTML = s_str
        document.getElementById("crystal_cost_s").innerHTML =
            "-" +
            format_idec(game.crystal_strengthener_price, game.notation) +
            " μg rainbow spice"
        if (game.rainbow_spice.cmp(game.crystal_strengthener_price) >= 0) {
            document.getElementById("crystal_cost_s").className = "rainbow_cost"
        } else {
            document.getElementById("crystal_cost_s").className = "empty_cost"
        }
    } else {
        document.getElementById("crystal_gen_s").style.display = "none"
    }

    let s_str =
        "You have " + format_small(game.crystal_infusion) + " crystal infusions"
    if (game.prestige_bought[20] >= 1)
        s_str +=
            " (+" +
            format_small(
                game.prestige_bought[20] * 12 * (1 + game.ascend_bought[5])
            ) +
            " free)"
    if (
        game.ascend_complete[2] &&
        game.ascend_bought[24] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    ) {
        s_str +=
            ",<br>boosting all normal spice generators " +
            format_idec(
                Decimal.pow(
                    5,
                    (game.crystal_infusion +
                        game.prestige_bought[20] *
                            12 *
                            (1 + game.ascend_bought[5])) *
                        32
                ),
                game.notation
            ) +
            "x"
    } else if (
        game.ascend_bought[7] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    ) {
        s_str +=
            ",<br>boosting all normal spice generators " +
            format_idec(
                Decimal.pow(
                    5,
                    (game.crystal_infusion +
                        game.prestige_bought[20] *
                            12 *
                            (1 + game.ascend_bought[5])) *
                        17.6
                ),
                game.notation
            ) +
            "x"
    } else {
        s_str +=
            ",<br>boosting all normal spice generators " +
            format_idec(
                Decimal.pow(
                    5,
                    (game.crystal_infusion +
                        game.prestige_bought[20] *
                            12 *
                            (1 + game.ascend_bought[5])) *
                        16
                ),
                game.notation
            ) +
            "x"
    }
    if (
        game.prestige_bought[19] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    )
        s_str +=
            ",<br>boosting all crystallized spice generators " +
            format_idec(
                Decimal.pow(
                    1.08 + 0.04 * game.ascend_bought[6],
                    game.crystal_infusion +
                        game.prestige_bought[20] *
                            12 *
                            (1 + game.ascend_bought[5])
                ),
                game.notation
            ) +
            "x"

    document.getElementById("crystal_info_i").innerHTML = s_str
    document.getElementById("crystal_cost_i").innerHTML =
        "-" +
        format_idec(game.crystal_infusion_price, game.notation) +
        " g crystallized spice"
    if (game.crystal_spice.cmp(game.crystal_infusion_price) >= 0) {
        document.getElementById("crystal_cost_i").className = "crystal_cost"
    } else {
        document.getElementById("crystal_cost_i").className = "empty_cost"
    }

    if (game.crystal_spice_bought[5] >= 5 || game.ascend >= 1) {
        document.getElementById("crystal_max_all").style.display = "inline"
    } else {
        document.getElementById("crystal_max_all").style.display = "none"
    }

    if (game.prestige_bought[13] >= 1)
        document.getElementById("infusion_auto").style.display = "inline"
    else document.getElementById("infusion_auto").style.display = "none"

    if (game.ascend_bought[10])
        document.getElementById("crystal_auto").style.display = "inline"
    else document.getElementById("crystal_auto").style.display = "none"
}

//graphics updates for ascension page
function ascension_update() {
    let goal = Decimal.pow(2, 1024)
    if (game.ascend_challenge !== 0) {
        goal = ascension_challenge.challenges[game.ascend_challenge - 1].goal
    }

    if (game.rainbow_spice.cmp(goal) >= 0) {
        document.getElementById("ascend_button").className =
            "ascend_button a_unlocked"
        document.getElementById("ascend_up").style.display = "block"
        let amount = Math.floor(
            (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8
        )
        document.getElementById("ascend_up").innerHTML =
            "+" + format_num(Math.floor(amount), game.notation) + " ᚫ"
        document.getElementById("ascend_req").style.color = "white"
        document.getElementById("ascend_req").innerHTML =
            format_idec(
                Decimal.pow(2, 1024).pow((amount + 1) ** 0.125),
                game.notation
            ) + " μg rainbow spice required"
    } else {
        document.getElementById("ascend_button").className =
            "ascend_button a_locked"
        document.getElementById("ascend_up").style.display = "none"
        document.getElementById("ascend_req").style.color = "grey"
        document.getElementById("ascend_req").innerHTML =
            format_idec(goal, game.notation) + " μg rainbow spice required"
    }

    document.getElementById("ansuz_num").innerHTML =
        format_num(game.ansuz, game.notation) + " ᚫ"

    let rune_speed = 1
    if (game.ascend_challenge === 6) rune_speed = 0

    document.getElementById("jera_text").innerHTML =
        "You have " +
        format_num(game.rune[0], game.notation) +
        " ᛡ, producing " +
        format_num(game.rune[0] * rune_speed, game.notation) +
        " ᛡ power/sec<br>You have " +
        format_num(Math.floor(game.rune_power[0]), game.notation) +
        " ᛡ power, boosting red spice production " +
        format_idec(game.rune_boost[0], game.notation) +
        "x"
    document.getElementById("raido_text").innerHTML =
        "You have " +
        format_num(game.rune[1], game.notation) +
        " ᚱ, producing " +
        format_num(game.rune[1] * rune_speed, game.notation) +
        " ᚱ power/sec<br>You have " +
        format_num(Math.floor(game.rune_power[1]), game.notation) +
        " ᚱ power, boosting yellow, green, & blue spice production " +
        format_idec(game.rune_boost[1], game.notation) +
        "x"
    document.getElementById("othala_text").innerHTML =
        "You have " +
        format_num(game.rune[2], game.notation) +
        " ᛟ, producing " +
        format_num(game.rune[2] * rune_speed, game.notation) +
        " ᛟ power/sec<br>You have " +
        format_num(Math.floor(game.rune_power[2]), game.notation) +
        " ᛟ power, boosting pink spice production " +
        format_idec(game.rune_boost[2], game.notation) +
        "x"

    if (game.distribute_unlocked) {
        document.getElementById("distribute_buttons").style.display = "flex"
    } else {
        document.getElementById("distribute_buttons").style.display = "none"
    }

    if (game.half_distribute_unlocked) {
        document.getElementById("half_distribute").style.display = "block"
    } else {
        document.getElementById("half_distribute").style.display = "none"
    }

    document.getElementById("ansuz_num2").innerHTML =
        format_num(game.ansuz, game.notation) + " ᚫ"
    document.getElementById("ansuz_num3").innerHTML =
        format_num(game.ansuz, game.notation) + " ᚫ"

    if (game.ascend_bought[16]) {
        document.getElementById("ascension_challenges").innerHTML =
            "ASCENSION&nbsp;CHALLENGES"
        if (game.subtab[3] === 2)
            document.getElementById("ascension_challenges").className =
                "subtab selected"
        else
            document.getElementById("ascension_challenges").className =
                "subtab unlocked"
    } else {
        document.getElementById("ascension_challenges").innerHTML = "LOCKED"
        document.getElementById("ascension_challenges").className =
            "subtab locked"
    }

    if (game.ascend_complete[0] && game.ascend_bought[16]) {
        document.getElementById("arcane_spice").innerHTML = "ARCANE&nbsp;SPICE"
        if (game.subtab[3] === 3)
            document.getElementById("arcane_spice").className =
                "subtab selected"
        else
            document.getElementById("arcane_spice").className =
                "subtab unlocked"
    } else {
        document.getElementById("arcane_spice").innerHTML = "LOCKED"
        document.getElementById("arcane_spice").className = "subtab locked"
    }

    for (const u of ascension_upgrade.upgrades) {
        switch (u.id) {
            case 0:
                u.desc =
                    "The boost from red spice amount is " +
                    format_small(50) +
                    "% stronger"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "The boost from red spice amount is " +
                        format_small(50) +
                        "% stronger<br>(Disabled)"
                break
            case 1:
                u.desc = "The boost from Times Prestiged stat is stronger"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "The boost from Times Prestiged stat is stronger<br>(Disabled)"
                break
            case 2:
                if (game.prestige_bought[18] >= 1)
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(" +
                        format_dec(6, game.notation) +
                        "x -> " +
                        format_dec(8, game.notation) +
                        "x)"
                else
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(" +
                        format_dec(
                            2 + 0.2 * game.prestige_bought[2],
                            game.notation
                        ) +
                        "x -> " +
                        format_dec(
                            4 + 0.2 * game.prestige_bought[2],
                            game.notation
                        ) +
                        "x)"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(Disabled)"
                break
            case 4:
                u.desc = "Crystallized spice generator multipliers are stronger"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Crystallized spice generator multipliers are stronger<br>(Disabled)"
                break
            case 6:
                u.desc =
                    "Crystal infusions boost crystallized spice production " +
                    format_dec(1.12) +
                    "x"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Crystal infusions boost crystallized spice production " +
                        format_dec(1.12) +
                        "x<br>(Disabled)"
                break
            case 7:
                u.desc =
                    "Crystal infusions are " + format_small(10) + "% stronger"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Crystal infusions are " +
                        format_small(10) +
                        "% stronger<br>(Disabled)"
                break
            case 11:
                u.desc = "Strengtheners are " + format_small(2) + "x stronger"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Strengtheners are " +
                        format_small(2) +
                        "x stronger<br>(Disabled)"
                break
            case 13:
                u.desc = "Pink spice boosts crystallized spice by its amount"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Pink spice boosts crystallized spice by its amount<br>(Disabled)"
                break
            case 14:
                if (game.prestige_bought[18] >= 1)
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(" +
                        format_dec(8, game.notation) +
                        "x -> " +
                        format_dec(10, game.notation) +
                        "x)"
                else
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(" +
                        format_dec(
                            4 + 0.2 * game.prestige_bought[2],
                            game.notation
                        ) +
                        "x -> " +
                        format_dec(
                            6 + 0.2 * game.prestige_bought[2],
                            game.notation
                        ) +
                        "x)"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(Disabled)"
                break
            case 15:
                if (game.ascend < 20480)
                    u.desc =
                        "Times Ascended stat boosts rainbow spice gains<br>(Currently: " +
                        format_idec(
                            Decimal.pow(2, game.ascend / 20),
                            game.notation
                        ) +
                        "x)"
                else
                    u.desc =
                        "Times Ascended stat boosts rainbow spice gains<br>(Currently: " +
                        format_idec(
                            Decimal.pow(
                                2,
                                10 * (game.ascend - 10480) ** 0.5 + 24
                            ),
                            game.notation
                        ) +
                        "x)"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Times Ascended stat boosts rainbow spice gains<br>(Disabled)"
                break
            case 18:
                u.desc = "Red spice boosts crystallized spice by its amount"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Red spice boosts crystallized spice by its amount<br>(Disabled)"
                break
            case 19:
                if (game.ansuz >= 2.5 * 10 ** 11) {
                    u.desc =
                        "Arcane spice is boosted based on unused Ansuz runes<br>(Currently: " +
                        format_idec(
                            Decimal.pow(
                                game.ansuz / (2.5 * 10 ** 11),
                                2 +
                                    5 *
                                        Math.log10(
                                            game.ansuz / (2.5 * 10 ** 11)
                                        )
                            )
                                .mul(4999)
                                .add(1),
                            game.notation
                        ) +
                        "x)"
                } else {
                    u.desc =
                        "Arcane spice is boosted based on unused Ansuz runes<br>(Currently: " +
                        format_idec(
                            Decimal.pow(game.ansuz / (2.5 * 10 ** 11), 2)
                                .mul(4999)
                                .add(1),
                            game.notation
                        ) +
                        "x)"
                }
                if (game.ascend_challenge === 6)
                    u.desc =
                        "Arcane spice is boosted based on unused Ansuz runes<br>(Disabled)"
                break
            case 21:
                u.desc =
                    "You gain " +
                    format_small(Math.floor(game.color_boosts / 50) + 1) +
                    "x more Times Prestiged stat<br>(based on color boosts)"
                break
            case 22:
                u.desc = "Arcane spice boosts crystallized spice by its amount"
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    u.desc =
                        "Arcane spice boosts crystallized spice by its amount<br>(Disabled)"
                break
            case 26:
                u.desc =
                    "Boosts from rune power are " +
                    format_small(2) +
                    "x stronger"
                break
            case 29:
                u.desc =
                    "Arcane enchantments also boost arcane spice production " +
                    format_dec(4 / 3, game.notation) +
                    "x"
                if (game.ascend_challenge === 6)
                    u.desc =
                        "Arcane enchantments also boost arcane spice production " +
                        format_dec(4 / 3, game.notation) +
                        "x<br>(Disabled)"
                break
            case 30:
                u.desc = "Red spice boosts arcane spice by its amount"
                if (game.ascend_challenge === 6)
                    u.desc =
                        "Red spice boosts arcane spice by its amount<br>(Disabled)"
                break
            case 31:
                u.desc = "Arcane spice boosts itself by its amount"
                if (game.ascend_challenge === 6)
                    u.desc =
                        "Arcane spice boosts itself by its amount<br>(Disabled)"
                break
            case 33:
                u.desc =
                    "Boosts from rune power are " +
                    format_small(8) +
                    "x stronger"
                break
        }

        let button = ascension_map.get(u)
        button.innerHTML =
            u.desc +
            '<br><span class="bold">-' +
            format_num(u.price, game.notation) +
            " ᚫ</span>"
        if (u.id === 34) {
            button.innerHTML = u.desc
        }

        let visible = true

        if (u.id > 2) {
            if (u.req !== undefined) {
                let step = ascension_upgrade.upgrades[u.req]
                if (step.req !== undefined) {
                    if (
                        !game.ascend_bought[
                            ascension_upgrade.upgrades[step.req].id
                        ]
                    ) {
                        visible = false
                    }
                }
                if (step.req2 !== undefined) {
                    if (
                        !game.ascend_bought[
                            ascension_upgrade.upgrades[step.req2].id
                        ]
                    ) {
                        visible = false
                    }
                }
            }
            if (u.req2 !== undefined) {
                let step = ascension_upgrade.upgrades[u.req2]
                if (step.req !== undefined) {
                    if (
                        !game.ascend_bought[
                            ascension_upgrade.upgrades[step.req].id
                        ]
                    ) {
                        visible = false
                    }
                }
                if (step.req2 !== undefined) {
                    if (
                        !game.ascend_bought[
                            ascension_upgrade.upgrades[step.req2].id
                        ]
                    ) {
                        visible = false
                    }
                }
            }
        } else {
            visible = true
        }

        if (game.ascend_bought[u.id]) {
            button.className = "ascension_upgrade a_bought"
            if (u.challenge !== 0)
                button.className = "ascension_upgrade ac_bought"
            button.style.display = "block"
        } else {
            let condition1 = false
            let condition2 = false
            let upgrade1 = u.req
            let upgrade2 = u.req2
            if (upgrade1 !== undefined) {
                if (game.ascend_bought[upgrade1]) {
                    if (ascension_upgrade.upgrades[upgrade1].challenge !== 0) {
                        if (
                            game.ascend_complete[
                                ascension_upgrade.upgrades[upgrade1].challenge -
                                    1
                            ]
                        )
                            condition1 = true
                        else condition1 = false
                    } else {
                        condition1 = true
                    }
                } else condition1 = false
            } else {
                condition1 = true
            }
            if (upgrade2 !== undefined) {
                if (game.ascend_bought[upgrade2]) {
                    if (ascension_upgrade.upgrades[upgrade2].challenge !== 0) {
                        if (
                            game.ascend_complete[
                                ascension_upgrade.upgrades[upgrade1].challenge -
                                    1
                            ]
                        )
                            condition2 = true
                        else condition2 = false
                    } else {
                        condition2 = true
                    }
                } else condition2 = false
            } else {
                condition2 = true
            }

            if (
                game.ansuz >= u.price &&
                condition1 &&
                condition2 &&
                u.id < 34
            ) {
                button.className = "ascension_upgrade a_unlocked2"
                if (u.challenge !== 0)
                    button.className = "ascension_upgrade ac_unlocked"
            } else {
                button.className = "ascension_upgrade a_locked"
                if (u.challenge !== 0)
                    button.className = "ascension_upgrade ac_locked"
            }

            if (visible) {
                button.style.display = "block"
            } else {
                button.style.display = "none"
            }
        }

        if (u.req !== undefined) {
            let line = ascension_map2.get(u)
            let button2 = ascension_map.get(ascension_upgrade.upgrades[u.req])

            let off1 = get_offset(button)
            let off2 = get_offset(button2)
            let x1 = off1.left + off1.width / 2
            let y1 = off1.top + off1.height / 2 - 6
            let x2 = off2.left + off2.width / 2
            let y2 = off2.top + off2.height / 2 - 6
            let length = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
            let cx = (x1 + x2) / 2 - length / 2
            let cy = (y1 + y2) / 2
            var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI)

            line.style.left = cx + "px"
            line.style.top = "calc(" + cy + "px - 0.5em)"
            line.style.width = length + "px"
            line.style.transform = "rotate(" + angle + "deg)"

            if (visible) {
                line.style.display = "block"
            } else {
                line.style.display = "none"
            }
        }

        if (u.req2 !== undefined) {
            let line = ascension_map3.get(u)
            let button2 = ascension_map.get(ascension_upgrade.upgrades[u.req2])

            let off1 = get_offset(button)
            let off2 = get_offset(button2)
            let x1 = off1.left + off1.width / 2
            let y1 = off1.top + off1.height / 2
            let x2 = off2.left + off2.width / 2
            let y2 = off2.top + off2.height / 2
            let length = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
            let cx = (x1 + x2) / 2 - length / 2
            let cy = (y1 + y2) / 2
            var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI)

            line.style.left = cx + "px"
            line.style.top = "calc(" + cy + "px - 0.5em)"
            line.style.width = length + "px"
            line.style.transform = "rotate(" + angle + "deg)"

            if (visible) {
                line.style.display = "block"
            } else {
                line.style.display = "none"
            }
        }
    }

    if (game.ascend_bought[12] && game.ascend_challenge === 0) {
        document.getElementById("ascend_auto_block").style.display = "block"

        if (game.autoas_mode === 0) {
            document.getElementById("ascend_runes").style.display = "flex"
            document.getElementById("ascend_time").style.display = "none"
        } else if (game.autoas_mode === 1) {
            document.getElementById("ascend_runes").style.display = "none"
            document.getElementById("ascend_time").style.display = "flex"
        }
    } else {
        document.getElementById("ascend_auto_block").style.display = "none"
    }

    for (const c of ascension_challenge.challenges) {
        let panel = challenge_map.get(c)
        let button = panel.querySelector(".a_challenge_button")

        if (game.ascend_bought[c.unlock] || game.ascend_complete[c.id]) {
            panel.style.display = "flex"

            if (game.ascend_complete[c.id]) {
                button.className = "a_challenge_button complete"
                button.innerHTML = "Completed"
            } else {
                if (game.ascend_challenge === c.id + 1) {
                    button.className = "a_challenge_button inprogress"
                    button.innerHTML = "In Progress"
                } else {
                    button.className = "a_challenge_button incomplete"
                    button.innerHTML = "Enter Challenge"
                }
            }
        } else {
            panel.style.display = "none"
        }
    }
}

//graphics updates for arcane spice
function arcane_update() {
    document.getElementById("arcane_spice_num").innerHTML =
        format_idec(game.arcane_spice, game.notation) + " g"
    document.getElementById("arcane_spice_up").innerHTML =
        "+" +
        format_idec(
            game.arcane_spice_gen[0]
                .floor()
                .mul(game.total_arcane_spice_boost[0])
                .mul(5),
            game.notation
        ) +
        " g arcane spice/sec"
    if (game.ascend_bought[31] && game.ascend_challenge !== 6) {
        document.getElementById("arcane_spice_up").innerHTML =
            "+" +
            format_idec(
                game.arcane_spice_gen[0]
                    .floor()
                    .mul(game.total_arcane_spice_boost[0])
                    .mul(5),
                game.notation
            ) +
            " g arcane spice/sec<br>Your arcane spice is boosting crystallized spice production " +
            format_idec(game.arcane_spice.pow(10).add(1), game.notation) +
            "x,<br>and boosting arcane spice production " +
            format_idec(game.arcane_spice.pow(0.0175).add(1), game.notation) +
            "x"
    } else if (
        game.ascend_bought[22] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6
    ) {
        document.getElementById("arcane_spice_up").innerHTML =
            "+" +
            format_idec(
                game.arcane_spice_gen[0]
                    .floor()
                    .mul(game.total_arcane_spice_boost[0])
                    .mul(5),
                game.notation
            ) +
            " g arcane spice/sec<br>Your arcane spice is boosting crystallized spice production " +
            format_idec(game.arcane_spice.pow(10).add(1), game.notation) +
            "x"
    }

    for (const gen of spice_gen.generators) {
        let element = spice_map.get(gen)
        let info = element.querySelector(".spice_gen_info")
        let boost = element.querySelector(".spice_gen_boost")

        let info_str = ""
        let n = 0
        let price = 0
        switch (gen.color) {
            case "arcane":
                info_str =
                    "You have " +
                    format_inum(
                        game.arcane_spice_gen[gen.id].floor(),
                        game.notation
                    ) +
                    " arcane spice " +
                    gen.plural
                if (
                    game.arcane_spice_gen[gen.id].cmp(
                        new Decimal(game.arcane_spice_bought[gen.id])
                    ) === 0
                ) {
                    info_str += ",<br>producing "
                } else {
                    info_str +=
                        " (" +
                        format_small(game.arcane_spice_bought[gen.id]) +
                        " bought),<br>producing "
                }
                if (gen.id === 0) {
                    info_str +=
                        format_idec(
                            game.arcane_spice_gen[gen.id]
                                .floor()
                                .mul(game.total_arcane_spice_boost[gen.id])
                                .mul(5),
                            game.notation
                        ) + " g arcane spice/sec"
                    if (game.ascend_bought[32] && game.ascend_challenge !== 2) {
                        info_str +=
                            ",<br>and producing " +
                            format_idec(
                                game.arcane_spice_gen[gen.id].floor().pow(60),
                                game.notation
                            ) +
                            " crystallized spice galaxies/sec"
                    }
                } else {
                    info_str +=
                        format_idec(
                            game.arcane_spice_gen[gen.id]
                                .floor()
                                .mul(game.total_arcane_spice_boost[gen.id])
                                .mul(5),
                            game.notation
                        ) +
                        " arcane spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                }
                if (game.condensed)
                    info_str =
                        format_inum(
                            game.arcane_spice_gen[gen.id].floor(),
                            game.notation
                        ) +
                        " " +
                        gen.plural +
                        " <span class='bold'>" +
                        format_idec(
                            game.total_arcane_spice_boost[gen.id],
                            game.notation
                        ) +
                        "x</span>"
                info.innerHTML = info_str

                boost.innerHTML =
                    "Your arcane spice " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_arcane_spice_boost[gen.id],
                        game.notation
                    ) +
                    "x"

                if (game.condensed) boost.style.display = "none"
                else boost.style.display = "block"

                document.getElementById("arcane_cost" + gen.id).innerHTML =
                    "-" +
                    format_num(
                        Math.round(game.arcane_spice_price[gen.id]),
                        game.notation
                    ) +
                    " ᚫ"
                if (game.ansuz >= game.arcane_spice_price[gen.id]) {
                    document.getElementById("arcane_cost" + gen.id).className =
                        "rune_cost"
                } else {
                    document.getElementById("arcane_cost" + gen.id).className =
                        "empty_cost"
                }

                n =
                    Math.floor(game.arcane_spice_bought[gen.id] / 3) * 3 +
                    3 -
                    game.arcane_spice_bought[gen.id]
                price =
                    (game.arcane_spice_price[gen.id] * (1 - 1.1 ** n)) / -0.1
                document.getElementById("arcane_ucost" + gen.id).innerHTML =
                    "-" + format_num(Math.round(price), game.notation) + " ᚫ"
                if (game.ansuz >= price) {
                    document.getElementById("arcane_ucost" + gen.id).className =
                        "rune_cost"
                } else {
                    document.getElementById("arcane_ucost" + gen.id).className =
                        "empty_cost"
                }

                if (game.arcane_unlocked[gen.id]) {
                    element.style.display = "block"
                } else {
                    element.style.display = "none"
                }
                break
        }
    }

    if (game.arcane_unlocked[3]) {
        document.getElementById("arcane_gen_s").style.display = "block"
        let s_str =
            "You have " +
            format_small(game.arcane_strengthener) +
            " arcane spice strengtheners,<br>boosting all arcane spice generators " +
            format_dec(1, game.notation) +
            "x"
        if (game.arcane_strengthener >= 1) {
            s_str =
                "You have " +
                format_small(game.arcane_strengthener) +
                " arcane spice strengtheners,<br>boosting all arcane spice generators " +
                format_idec(
                    Decimal.pow(
                        3,
                        (game.arcane_strengthener *
                            (game.arcane_strengthener + 1)) /
                            2 +
                            1
                    ),
                    game.notation
                ) +
                "x"
        }

        document.getElementById("arcane_info_s").innerHTML = s_str
        document.getElementById("arcane_cost_s").innerHTML =
            "-" +
            format_num(
                Math.round(game.arcane_strengthener_price),
                game.notation
            ) +
            " ᚫ"
        if (game.ansuz >= game.arcane_strengthener_price) {
            document.getElementById("arcane_cost_s").className = "rune_cost"
        } else {
            document.getElementById("arcane_cost_s").className = "empty_cost"
        }
    } else {
        document.getElementById("arcane_gen_s").style.display = "none"
    }

    let s_str =
        "You have " +
        format_small(game.arcane_enchantment) +
        " arcane enchantments,<br>boosting all crystallized spice generators " +
        format_idec(
            Decimal.pow(4, game.arcane_enchantment * 100),
            game.notation
        ) +
        "x"

    if (game.ascend_bought[29] && game.ascend_challenge !== 6) {
        s_str +=
            ",<br>and boosting all arcane spice generators " +
            format_idec(
                Decimal.pow(4 / 3, game.arcane_enchantment),
                game.notation
            ) +
            "x"
    }
    if (game.ascend_challenge === 5) {
        s_str = "Arcane enchantments refresh spice production for 1 second"
    }

    document.getElementById("arcane_info_n").innerHTML = s_str
    document.getElementById("arcane_cost_n").innerHTML =
        "-" +
        format_idec(game.arcane_enchantment_price, game.notation) +
        " g arcane spice"
    if (game.arcane_spice.cmp(game.arcane_enchantment_price) >= 0) {
        document.getElementById("arcane_cost_n").className = "arcane_cost"
    } else {
        document.getElementById("arcane_cost_n").className = "empty_cost"
    }

    if (game.arcane_max_unlocked) {
        document.getElementById("arcane_max_all").style.display = "inline"

        if (game.half_distribute_unlocked) {
            document.getElementById("arcane_max_half").style.display = "inline"
        } else {
            document.getElementById("arcane_max_half").style.display = "none"
        }
    } else {
        document.getElementById("arcane_max_all").style.display = "none"
        document.getElementById("arcane_max_half").style.display = "none"
    }

    if (game.ascend_bought[17])
        document.getElementById("enchantment_auto").style.display = "inline"
    else document.getElementById("enchantment_auto").style.display = "none"
}

//graphics updates for statistics page
function stats_update() {
    let stats_str =
        "You have " +
        format_idec(game.red_spice, game.notation) +
        " g red spice."

    if (game.color_boosts === 1)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            " g red spice,<br>and " +
            format_idec(game.yellow_spice, game.notation) +
            " g yellow spice."
    else if (game.color_boosts === 2)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            " g red spice,<br>" +
            format_idec(game.yellow_spice, game.notation) +
            " g yellow spice,<br>and " +
            format_idec(game.green_spice, game.notation) +
            " g green spice."
    else if (game.color_boosts === 3)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            " g red spice,<br>" +
            format_idec(game.yellow_spice, game.notation) +
            " g yellow spice,<br>" +
            format_idec(game.green_spice, game.notation) +
            " g green spice,<br>and " +
            format_idec(game.blue_spice, game.notation) +
            " g blue spice."
    else if (game.color_boosts >= 4)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            " g red spice,<br>" +
            format_idec(game.yellow_spice, game.notation) +
            " g yellow spice,<br>" +
            format_idec(game.green_spice, game.notation) +
            " g green spice,<br>" +
            format_idec(game.blue_spice, game.notation) +
            " g blue spice,<br>and " +
            format_idec(game.pink_spice, game.notation) +
            " g pink spice."

    stats_str +=
        "<br><br>You have accumulated a total of " +
        format_idec(game.total_spice, game.notation) +
        " g spice."

    if (game.color_boosts >= 4)
        stats_str +=
            "<br>You have done " +
            format_small(game.color_boosts) +
            " color boosts."
    else if (game.color_boosts >= 1)
        stats_str +=
            "<br>You have done " +
            format_small(game.color_boosts) +
            " color shifts."

    if (game.prestige >= 1 || game.ascend >= 1) {
        if (game.prestige === 1)
            stats_str +=
                "<br><br><br>You have Prestiged " + format_small(1) + " time."
        else
            stats_str +=
                "<br><br><br>You have Prestiged " +
                format_small(game.prestige) +
                " times."

        stats_str +=
            "<br>You have " +
            format_idec(game.rainbow_spice, game.notation) +
            " μg rainbow spice."

        if (game.prestige_bought[12] >= 1)
            stats_str +=
                "<br>You have " +
                format_idec(game.crystal_spice, game.notation) +
                " g crystallized spice."

        stats_str +=
            "<br>You have spent " +
            format_time_long(game.prestige_time_played, game.notation) +
            " in this Prestige."
    }

    if (game.ascend >= 1) {
        if (game.ascend === 1)
            stats_str +=
                "<br><br><br>You have Ascended " + format_small(1) + " time."
        else
            stats_str +=
                "<br><br><br>You have Ascended " +
                format_small(game.ascend) +
                " times."

        stats_str +=
            "<br>You have " + format_num(game.ansuz, game.notation) + " ᚫ."

        stats_str +=
            "<br>You have produced a total of " +
            format_num(Math.floor(game.total_rune_power), game.notation) +
            " rune power."

        if (game.ascend_complete[0] && game.ascend_bought[16])
            stats_str +=
                "<br>You have " +
                format_idec(game.arcane_spice, game.notation) +
                " g arcane spice."

        stats_str +=
            "<br>You have spent " +
            format_time_long(game.ascend_time_played, game.notation) +
            " in this Ascension."
    }

    stats_str +=
        "<br><br><br>You have played for a total of " +
        format_time_long(game.total_time_played, game.notation) +
        "."

    document.getElementById("statistics_text").innerHTML = stats_str

    if (game.prestige >= 1 || game.ascend >= 1)
        document.getElementById("statistics_tabs").style.display = "flex"
    else document.getElementById("statistics_tabs").style.display = "none"

    stats_str = "Last 10 Prestiges:"
    let entries = 0
    let average = new Decimal(0)

    for (let i = 0; i < 10; i++) {
        if (game.prestige_time_history[i] === -1) {
            stats_str += "<br>#" + (i + 1) + " (no data)"
        } else {
            entries++
            average = average.add(
                game.prestige_amount_history[i].div(
                    game.prestige_time_history[i]
                )
            )
            if (
                game.prestige_amount_history[i]
                    .div(game.prestige_time_history[i])
                    .mul(60)
                    .cmp(1) >= 0
            )
                stats_str +=
                    "<br>#" +
                    (i + 1) +
                    " took " +
                    format_time(game.prestige_time_history[i]) +
                    " and gave " +
                    format_idec(
                        game.prestige_amount_history[i],
                        game.notation
                    ) +
                    " μg rainbow spice. +" +
                    format_idec(
                        game.prestige_amount_history[i]
                            .div(game.prestige_time_history[i])
                            .mul(60),
                        game.notation
                    ) +
                    " μg rainbow spice/min"
            else
                stats_str +=
                    "<br>#" +
                    (i + 1) +
                    " took " +
                    format_time(game.prestige_time_history[i]) +
                    " and gave " +
                    format_idec(
                        game.prestige_amount_history[i],
                        game.notation
                    ) +
                    " μg rainbow spice. +" +
                    format_idec(
                        game.prestige_amount_history[i]
                            .div(game.prestige_time_history[i])
                            .mul(3600),
                        game.notation
                    ) +
                    " μg rainbow spice/hour"
        }
    }

    if (entries > 0) {
        average = average.div(entries)
        if (average.mul(60).cmp(1) >= 0)
            stats_str +=
                "<br><br>Average rainbow spice gain: +" +
                format_idec(average.mul(60), game.notation) +
                " μg rainbow spice/min"
        else
            stats_str +=
                "<br><br>Average rainbow spice gain: +" +
                format_idec(average.mul(3600), game.notation) +
                " μg rainbow spice/hour"
    } else {
        stats_str += "<br><br>Average rainbow spice gain: undefined"
    }

    document.getElementById("prestige_statistics_text").innerHTML = stats_str

    if (game.ascend >= 1) {
        document.getElementById("past_ascensions").innerHTML =
            "PAST&nbsp;ASCENSIONS"
        if (game.subtab[2] === 2)
            document.getElementById("past_ascensions").className =
                "subtab selected"
        else
            document.getElementById("past_ascensions").className =
                "subtab unlocked"
    } else {
        document.getElementById("past_ascensions").innerHTML = "LOCKED"
        document.getElementById("past_ascensions").className = "subtab locked"
    }

    stats_str = "Last 10 Ascensions:"
    entries = 0
    average = 0

    for (let i = 0; i < 10; i++) {
        if (game.ascend_time_history[i] === -1) {
            stats_str += "<br>#" + (i + 1) + " (no data)"
        } else {
            entries++
            average +=
                game.ascend_amount_history[i] / game.ascend_time_history[i]
            if (
                (game.ascend_amount_history[i] * 60) /
                    game.ascend_time_history[i] >=
                1
            )
                stats_str +=
                    "<br>#" +
                    (i + 1) +
                    " took " +
                    format_time(game.ascend_time_history[i]) +
                    " and gave " +
                    format_num(game.ascend_amount_history[i], game.notation) +
                    " ᚫ. +" +
                    format_dec(
                        (game.ascend_amount_history[i] * 60) /
                            game.ascend_time_history[i],
                        game.notation
                    ) +
                    " ᚫ/min"
            else
                stats_str +=
                    "<br>#" +
                    (i + 1) +
                    " took " +
                    format_time(game.ascend_time_history[i]) +
                    " and gave " +
                    format_num(game.ascend_amount_history[i], game.notation) +
                    " ᚫ. +" +
                    format_dec(
                        (game.ascend_amount_history[i] * 3600) /
                            game.ascend_time_history[i],
                        game.notation
                    ) +
                    " ᚫ/hour"
        }
    }

    if (entries > 0) {
        average /= entries
        if (average * 60 >= 1)
            stats_str +=
                "<br><br>Average Ansuz rune gain: +" +
                format_dec(average * 60, game.notation) +
                " ᚫ/min"
        else
            stats_str +=
                "<br><br>Average Ansuz rune gain: +" +
                format_dec(average * 3600, game.notation) +
                " ᚫ/hour"
    } else {
        stats_str += "<br><br>Average Ansuz rune gain: undefined"
    }

    document.getElementById("ascension_statistics_text").innerHTML = stats_str
}
