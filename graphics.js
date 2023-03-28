//updating whether tabs are available
function tabs_update() {
    if (
        game.color_boosts >= 10 ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
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

    if (game.ascend_complete[5] || game.collapse >= 1) {
        if (game.tab === 3)
            document.getElementById("collapse").className = "tab selected"
        else document.getElementById("collapse").className = "tab unlocked"
        document.getElementById("collapse").innerHTML = "COLLAPSE"
    } else {
        document.getElementById("collapse").className = "tab locked"
        document.getElementById("collapse").innerHTML = "LOCKED"
    }

    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    if (mobile) {
        document.getElementById("prestige_upgrades").innerHTML = "UPGRADES"
        document.getElementById("crystallized_spice").innerHTML =
            "CRYSTAL&nbsp;SPICE"
        document.getElementById("crystal_upgrades").innerHTML = "C.UPGRADES"
        document.getElementById("ascension_upgrades").innerHTML = "UPGRADES"
        document.getElementById("past_prestiges").innerHTML = "PRESTIGES"
    } else {
        document.getElementById("prestige_upgrades").innerHTML =
            "PRESTIGE&nbsp;UPGRADES"
        document.getElementById("crystallized_spice").innerHTML =
            "CRYSTALLIZED&nbsp;SPICE"
        document.getElementById("crystal_upgrades").innerHTML =
            "CRYSTAL&nbsp;UPGRADES"
        document.getElementById("ascension_upgrades").innerHTML =
            "ASCENSION&nbsp;UPGRADES"
        document.getElementById("past_prestiges").innerHTML =
            "PAST&nbsp;PRESTIGES"
    }
}

//graphics updates for spice generators
function spice_update() {
    let antispice_power = 1
    if (game.antispice[1].cmp(1) >= 0) {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[1].log(10) ** 0.75
        )
        antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.013
        if (game.collapse_challenge !== 0)
            antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.0065
    }

    document.getElementById("red_spice_num").innerHTML =
        format_idec(game.red_spice, game.notation) + " g"
    document.getElementById("red_spice_up").innerHTML =
        "+" +
        format_idec(
            game.red_spice_gen[0].floor().mul(game.total_red_spice_boost[0]),
            game.notation
        ) +
        " g red spice/sec"

    let effective_red_spice = game.red_spice
    if (game.red_spice.cmp(Decimal.pow(10, 10 ** 12)) >= 0)
        effective_red_spice = game.red_spice
            .div(Decimal.pow(10, 10 ** 12))
            .pow(1 / 3)
            .mul(Decimal.pow(10, 10 ** 12))

    if (
        game.ascend_bought[30] &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
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
                " g red spice/sec<br><br>Your red spice is boosting yellow, green, blue, & pink spice production " +
                format_idec(
                    effective_red_spice.pow(0.0075).add(1).pow(antispice_power),
                    game.notation
                ) +
                "x,<br>boosting crystallized spice production " +
                format_idec(
                    effective_red_spice
                        .pow(0.00004)
                        .add(1)
                        .pow(antispice_power),
                    game.notation
                ) +
                "x,<br>and boosting arcane spice production " +
                format_idec(
                    effective_red_spice
                        .pow(0.00000025)
                        .add(1)
                        .pow(antispice_power),
                    game.notation
                ) +
                "x"
        }
    } else if (
        game.ascend_bought[18] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
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
                " g red spice/sec<br><br>Your red spice is boosting yellow, green, blue, & pink spice production " +
                format_idec(
                    effective_red_spice.pow(0.0075).add(1).pow(antispice_power),
                    game.notation
                ) +
                "x,<br>and boosting crystallized spice production " +
                format_idec(
                    effective_red_spice
                        .pow(0.00004)
                        .add(1)
                        .pow(antispice_power),
                    game.notation
                ) +
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
                    " g red spice/sec<br><br>Your red spice is boosting yellow, green, blue, & pink spice production " +
                    format_idec(
                        effective_red_spice
                            .pow(0.0075)
                            .add(1)
                            .pow(antispice_power),
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
                    " g red spice/sec<br><br>Your red spice is boosting yellow, green, blue, & pink spice production " +
                    format_idec(
                        effective_red_spice.pow(0.005).add(1),
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
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    )
        document.getElementById("yellow_spice_up").innerHTML =
            "+" +
            format_idec(
                game.yellow_spice_gen[0]
                    .floor()
                    .mul(game.total_yellow_spice_boost[0]),
                game.notation
            ) +
            " g yellow spice/sec<br><br>Your yellow spice is boosting red spice production " +
            format_idec(
                game.yellow_spice.pow(0.075).add(1).pow(antispice_power),
                game.notation
            ) +
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
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    )
        document.getElementById("green_spice_up").innerHTML =
            "+" +
            format_idec(
                game.green_spice_gen[0]
                    .floor()
                    .mul(game.total_green_spice_boost[0]),
                game.notation
            ) +
            " g green spice/sec<br><br>Your green spice is boosting yellow spice production " +
            format_idec(
                game.green_spice.pow(0.075).add(1).pow(antispice_power),
                game.notation
            ) +
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
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    )
        document.getElementById("blue_spice_up").innerHTML =
            "+" +
            format_idec(
                game.blue_spice_gen[0]
                    .floor()
                    .mul(game.total_blue_spice_boost[0]),
                game.notation
            ) +
            " g blue spice/sec<br><br>Your blue spice is boosting green spice production " +
            format_idec(
                game.blue_spice.pow(0.075).add(1).pow(antispice_power),
                game.notation
            ) +
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
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    ) {
        if (
            game.prestige_bought[8] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        )
            pink_str +=
                "<br><br>Your pink spice is boosting blue spice production " +
                format_idec(
                    game.pink_spice.pow(0.075).add(1).pow(antispice_power),
                    game.notation
                ) +
                "x,<br>and boosting crystallized spice production " +
                format_idec(
                    game.pink_spice.pow(0.00008).add(1).pow(antispice_power),
                    game.notation
                ) +
                "x"
        else
            pink_str +=
                "<br><br>Your pink spice is boosting crystallized spice production " +
                format_idec(
                    game.pink_spice.pow(0.00008).add(1).pow(antispice_power),
                    game.notation
                ) +
                "x"
    } else {
        if (
            game.prestige_bought[8] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        )
            pink_str +=
                "<br><br>Your pink spice is boosting blue spice production " +
                format_idec(
                    game.pink_spice.pow(0.075).add(1).pow(antispice_power),
                    game.notation
                ) +
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
                if (game.collapse_challenge === 8 && gen.id === 5) {
                    info_str =
                        "You have " +
                        format_inum(
                            game.red_spice_gen[gen.id]
                                .add(game.free_deity)
                                .floor(),
                            game.notation
                        ) +
                        " red spice " +
                        gen.plural
                    if (
                        game.red_spice_gen[gen.id]
                            .add(game.free_deity)
                            .cmp(new Decimal(game.red_spice_bought[gen.id])) ===
                        0
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
                            .add(game.free_deity)
                            .floor()
                            .mul(game.total_red_spice_boost[gen.id])
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " red spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                    if (game.condensed)
                        info_str =
                            format_inum(
                                game.red_spice_gen[gen.id]
                                    .add(game.free_deity)
                                    .floor(),
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
                } else {
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
                }
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
                        game.ascend >= 1 ||
                        game.collapse >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
            case "yellow":
                if (game.collapse_challenge === 8 && gen.id === 5) {
                    info_str =
                        "You have " +
                        format_inum(
                            game.yellow_spice_gen[gen.id]
                                .add(game.free_deity)
                                .floor(),
                            game.notation
                        ) +
                        " yellow spice " +
                        gen.plural
                    if (
                        game.yellow_spice_gen[gen.id]
                            .add(game.free_deity)
                            .cmp(
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
                            .add(game.free_deity)
                            .floor()
                            .mul(game.total_yellow_spice_boost[gen.id])
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " yellow spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                    if (game.condensed)
                        info_str =
                            format_inum(
                                game.yellow_spice_gen[gen.id]
                                    .add(game.free_deity)
                                    .floor(),
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
                } else {
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
                                    game.yellow_spice_gen[gen.id]
                                        .floor()
                                        .pow(0.1),
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
                }
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
                        game.ascend >= 1 ||
                        game.collapse >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
            case "green":
                if (game.collapse_challenge === 8 && gen.id === 5) {
                    info_str =
                        "You have " +
                        format_inum(
                            game.green_spice_gen[gen.id]
                                .add(game.free_deity)
                                .floor(),
                            game.notation
                        ) +
                        " green spice " +
                        gen.plural
                    if (
                        game.green_spice_gen[gen.id]
                            .add(game.free_deity)
                            .cmp(
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
                            .add(game.free_deity)
                            .floor()
                            .mul(game.total_green_spice_boost[gen.id])
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " green spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                    if (game.condensed)
                        info_str =
                            format_inum(
                                game.green_spice_gen[gen.id]
                                    .add(game.free_deity)
                                    .floor(),
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
                } else {
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
                                    game.green_spice_gen[gen.id]
                                        .floor()
                                        .pow(0.1),
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
                }
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
                        game.ascend >= 1 ||
                        game.collapse >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
            case "blue":
                if (game.collapse_challenge === 8 && gen.id === 5) {
                    info_str =
                        "You have " +
                        format_inum(
                            game.blue_spice_gen[gen.id]
                                .add(game.free_deity)
                                .floor(),
                            game.notation
                        ) +
                        " blue spice " +
                        gen.plural
                    if (
                        game.blue_spice_gen[gen.id]
                            .add(game.free_deity)
                            .cmp(
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
                            .add(game.free_deity)
                            .floor()
                            .mul(game.total_blue_spice_boost[gen.id])
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " blue spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                    if (game.condensed)
                        info_str =
                            format_inum(
                                game.blue_spice_gen[gen.id]
                                    .add(game.free_deity)
                                    .floor(),
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
                } else {
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
                                    game.blue_spice_gen[gen.id]
                                        .floor()
                                        .pow(0.1),
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
                }
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
                        game.ascend >= 1 ||
                        game.collapse >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
            case "pink":
                if (game.collapse_challenge === 8 && gen.id === 5) {
                    info_str =
                        "You have " +
                        format_inum(
                            game.pink_spice_gen[gen.id]
                                .add(game.free_deity)
                                .floor(),
                            game.notation
                        ) +
                        " pink spice " +
                        gen.plural
                    if (
                        game.pink_spice_gen[gen.id]
                            .add(game.free_deity)
                            .cmp(
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
                            .add(game.free_deity)
                            .floor()
                            .mul(game.total_pink_spice_boost[gen.id])
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " pink spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                    if (game.condensed) {
                        if (
                            gen.id === 5 &&
                            game.pink_spice_gen[gen.id]
                                .add(game.free_deity)
                                .cmp(
                                    new Decimal(game.pink_spice_bought[gen.id])
                                ) !== 0
                        ) {
                            info_str =
                                format_inum(
                                    game.pink_spice_gen[gen.id]
                                        .add(game.free_deity)
                                        .floor(),
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
                                    game.pink_spice_gen[gen.id]
                                        .add(game.free_deity)
                                        .floor(),
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
                } else {
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
                                    game.pink_spice_gen[gen.id]
                                        .floor()
                                        .pow(0.1),
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
                        game.ascend >= 1 ||
                        game.collapse >= 1
                    ) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
        }
    }

    let antispice_boosts = 1
    if (game.antispice[2].cmp(1) >= 0) {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[2].log(10) ** 0.75
        )
        antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 100
        if (game.collapse_challenge !== 0)
            antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 50
    }

    if (
        game.red_spice_gen[2].cmp(10) >= 0 ||
        game.color_boosts >= 1 ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
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
                ).pow(antispice_boosts),
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
                    ).pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7
        )
            "You have " +
                format_small(game.red_strengthener) +
                " red spice strengtheners,<br>boosting all red spice generators " +
                format_idec(
                    Decimal.pow(2, game.red_strengthener).pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        )
            s_str +=
                ",<br>boosting all yellow spice generators " +
                format_idec(
                    Decimal.pow(
                        1 + 0.2 * game.prestige_bought[5],
                        game.red_strengthener * antispice_boosts
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 1)
            s_str +=
                ",<br>boosting all yellow spice generators " +
                format_idec(
                    Decimal.pow(1.05, game.red_strengthener * antispice_boosts),
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
        game.ascend >= 1 ||
        game.collapse >= 1
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
                )
                    .pow(
                        game.yellow_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    )
                    .pow(antispice_boosts),
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
                    )
                        .pow(
                            game.yellow_strengthener *
                                (1 + game.ascend_bought[11]) *
                                (1 +
                                    2 *
                                        game.ascend_complete[2] *
                                        game.ascend_bought[24])
                        )
                        .pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7
        )
            s_str =
                "You have " +
                format_small(game.yellow_strengthener) +
                " yellow spice strengtheners,<br>boosting all red & yellow spice generators " +
                format_idec(
                    new Decimal(2)
                        .pow(game.yellow_strengthener)
                        .pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 2 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        )
            s_str +=
                ",<br>boosting all green spice generators " +
                format_idec(
                    new Decimal(1 + 0.2 * game.prestige_bought[5]).pow(
                        game.yellow_strengthener * antispice_boosts
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 2)
            s_str +=
                ",<br>boosting all green spice generators " +
                format_idec(
                    new Decimal(1.05).pow(
                        game.yellow_strengthener * antispice_boosts
                    ),
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
        game.ascend >= 1 ||
        game.collapse >= 1
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
                )
                    .pow(
                        game.green_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    )
                    .pow(antispice_boosts),
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
                    )
                        .pow(
                            game.green_strengthener *
                                (1 + game.ascend_bought[11]) *
                                (1 +
                                    2 *
                                        game.ascend_complete[2] *
                                        game.ascend_bought[24])
                        )
                        .pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7
        )
            s_str =
                "You have " +
                format_small(game.green_strengthener) +
                " green spice strengtheners,<br>boosting all red, yellow & green spice generators " +
                format_idec(
                    new Decimal(2)
                        .pow(game.green_strengthener)
                        .pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 3 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        )
            s_str +=
                ",<br>boosting all blue spice generators " +
                format_idec(
                    new Decimal(1 + 0.2 * game.prestige_bought[5]).pow(
                        game.green_strengthener * antispice_boosts
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 3)
            s_str +=
                ",<br>boosting all blue spice generators " +
                format_idec(
                    new Decimal(1.05).pow(
                        game.green_strengthener * antispice_boosts
                    ),
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
        game.ascend >= 1 ||
        game.collapse >= 1
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
                )
                    .pow(
                        game.blue_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    )
                    .pow(antispice_boosts),
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
                    )
                        .pow(
                            game.blue_strengthener *
                                (1 + game.ascend_bought[11]) *
                                (1 +
                                    2 *
                                        game.ascend_complete[2] *
                                        game.ascend_bought[24])
                        )
                        .pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7
        )
            s_str =
                "You have " +
                format_small(game.blue_strengthener) +
                " blue spice strengtheners,<br>boosting all red, yellow, green & blue spice generators " +
                format_idec(
                    new Decimal(2)
                        .pow(game.blue_strengthener)
                        .pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 4 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        )
            s_str +=
                ",<br>boosting all pink spice generators " +
                format_idec(
                    new Decimal(1 + 0.2 * game.prestige_bought[5]).pow(
                        game.blue_strengthener * antispice_boosts
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 4)
            s_str +=
                ",<br>boosting all pink spice generators " +
                format_idec(
                    new Decimal(1.05).pow(
                        game.blue_strengthener * antispice_boosts
                    ),
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
        game.ascend >= 1 ||
        game.collapse >= 1
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
                )
                    .pow(
                        game.pink_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    )
                    .pow(antispice_boosts),
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
                    )
                        .pow(
                            game.pink_strengthener *
                                (1 + game.ascend_bought[11]) *
                                (1 +
                                    2 *
                                        game.ascend_complete[2] *
                                        game.ascend_bought[24])
                        )
                        .pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7
        )
            document.getElementById("pink_info_s").innerHTML =
                "You have " +
                format_small(game.pink_strengthener) +
                " pink spice strengtheners,<br>boosting ALL spice generators " +
                format_idec(
                    new Decimal(2)
                        .pow(game.pink_strengthener)
                        .pow(antispice_boosts),
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
    if (game.ascend_challenge === 3 || game.collapse_challenge === 7)
        scaling = 10

    if (
        game.red_spice_gen[5].cmp(10) >= 0 ||
        game.color_boosts >= 1 ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        document.getElementById("color_shift").style.display = "block"
        document.getElementById("color_shift_header").className =
            "spice_gen_name"
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
                    ).pow(game.color_boosts * antispice_boosts),
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
                        ).pow(game.color_boosts * antispice_boosts),
                        game.notation
                    ) +
                    "x"
            if (
                game.ascend_challenge === 1 ||
                game.ascend_challenge === 6 ||
                game.collapse_challenge === 7
            )
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color shifts,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(2).pow(
                            game.color_boosts * antispice_boosts
                        ),
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
                    ).pow((game.color_boosts * 2 - 4) * antispice_boosts),
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
                        ).pow((game.color_boosts * 2 - 4) * antispice_boosts),
                        game.notation
                    ) +
                    "x"
            if (
                game.ascend_challenge === 1 ||
                game.ascend_challenge === 6 ||
                game.collapse_challenge === 7
            )
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color boosts,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(2).pow(
                            (game.color_boosts * 2 - 4) * antispice_boosts
                        ),
                        game.notation
                    ) +
                    "x"
            document.getElementById("color_shift_button").innerHTML =
                "Reset for a spice boost"
            if (game.prestige_bought[22] >= 1)
                document.getElementById("color_shift_button").innerHTML =
                    "Gain a spice boost"
        }
        if (
            game.color_boosts >= 2000000 ||
            (game.collapse_challenge === 10 && game.color_boosts >= 4)
        ) {
            document.getElementById("color_shift_header").innerHTML =
                "Color Augment"
            document.getElementById("color_shift_header").className =
                "spice_gen_name boost"
            document.getElementById("color_shift_info").innerHTML =
                "You have " +
                format_small(game.color_boosts) +
                " color augments,<br>boosting ALL spice generators " +
                format_idec(
                    new Decimal(
                        2 +
                            0.2 * game.prestige_bought[2] +
                            2 * (game.ascend_bought[2] + game.ascend_bought[14])
                    ).pow((game.color_boosts * 2 - 4) * antispice_boosts),
                    game.notation
                ) +
                "x<br><br>Color augment scaling is significantly harsher than color boost scaling"
            if (game.prestige_bought[18] >= 1)
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color augments,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(
                            6 +
                                2 *
                                    (game.ascend_bought[2] +
                                        game.ascend_bought[14])
                        ).pow((game.color_boosts * 2 - 4) * antispice_boosts),
                        game.notation
                    ) +
                    "x<br><br>Color augment scaling is significantly harsher than color boost scaling"
            if (
                game.ascend_challenge === 1 ||
                game.ascend_challenge === 6 ||
                game.collapse_challenge === 7
            )
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color augments,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(2).pow(
                            (game.color_boosts * 2 - 4) * antispice_boosts
                        ),
                        game.notation
                    ) +
                    "x<br><br>Color augment scaling is significantly harsher than color boost scaling"
            document.getElementById("color_shift_button").innerHTML =
                "Reset for a spice boost"
            if (game.prestige_bought[22] >= 1)
                document.getElementById("color_shift_button").innerHTML =
                    "Gain a spice boost"
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
                    if (game.collapse_challenge === 10) {
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                Math.ceil(
                                    (game.color_boosts + (33 ** 0.5 - 9) / 2) **
                                        3 -
                                        (9 * 33 ** 0.5 - 125) / 2
                                )
                            ) +
                            " pink spice galaxies"
                    } else {
                        let amount = game.augment_start * 2500 - 79737500
                        if (game.color_boosts <= 8)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 25 - 50) * scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 29)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 50 - 250) * scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 133)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 75 - 975) * scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 223)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 100 - 4300) * scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 523)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 150 - 15450) * scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 1201)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 200 - 41600) * scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 4104)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 300 - 161700) * scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 7501)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 500 - 982500) * scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 50003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1000 - 4733000) *
                                        scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= game.augment_start)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 2500 - 79737500) *
                                        scaling
                                ) +
                                " pink spice galaxies"
                        else
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (((game.color_boosts -
                                        game.augment_start +
                                        2500) *
                                        (game.color_boosts -
                                            game.augment_start +
                                            2501)) /
                                        2 +
                                        amount -
                                        3126250) *
                                        scaling
                                ) +
                                " pink spice galaxies"
                    }
                } else {
                    if (game.collapse_challenge === 10) {
                        document.getElementById("color_shift_req").innerHTML =
                            "Requires " +
                            format_small(
                                Math.ceil(
                                    (game.color_boosts + (33 ** 0.5 - 9) / 2) **
                                        3 -
                                        (9 * 33 ** 0.5 - 125) / 2
                                )
                            ) +
                            " pink spice galaxies"
                    } else {
                        let amount = game.augment_start * 2500 - 79737500
                        if (game.color_boosts <= 8)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 25 - 50) * scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 29)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 50 - 250) * scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 133)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 75 - 975) * scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 223)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 100 - 4300) * scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 523)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 150 - 15450) * scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 1201)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 200 - 41600) * scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 4104)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 300 - 161700) * scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 7500)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 500 - 982500) * scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 50003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1000 - 4733000) *
                                        scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= game.augment_start)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 2500 - 79737500) *
                                        scaling
                                ) +
                                " bought pink spice galaxies"
                        else
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (((game.color_boosts -
                                        game.augment_start +
                                        2500) *
                                        (game.color_boosts -
                                            game.augment_start +
                                            2501)) /
                                        2 +
                                        amount -
                                        3126250) *
                                        scaling
                                ) +
                                " bought pink spice galaxies"
                    }
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
            if (game.collapse_challenge === 10) {
                if (
                    game.pink_spice_bought[5] >=
                    Math.ceil(
                        (game.color_boosts + (33 ** 0.5 - 9) / 2) ** 3 -
                            (9 * 33 ** 0.5 - 125) / 2
                    )
                )
                    can_boost = true
            } else {
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
                } else if (game.color_boosts <= game.augment_start) {
                    if (
                        game.pink_spice_bought[5] >=
                        (game.color_boosts * 2500 - 79737500) * scaling
                    )
                        can_boost = true
                } else {
                    let amount = game.augment_start * 2500 - 79737500
                    if (
                        game.pink_spice_bought[5] >=
                        (((game.color_boosts - game.augment_start + 2500) *
                            (game.color_boosts - game.augment_start + 2501)) /
                            2 +
                            amount -
                            3126250) *
                            scaling
                    )
                        can_boost = true
                }
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

    if (game.prestige >= 1 || game.ascend >= 1 || game.collapse >= 1) {
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
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            let ascend_bonus = game.ascend / 20
            if (game.ascend >= 10240)
                ascend_bonus = 5 * (game.ascend - 7740) ** 0.5 + 262

            if (game.color_boosts <= 16)
                document.getElementById("prestige_up").innerHTML =
                    "+" +
                    format_idec(
                        new Decimal(2).pow(
                            (game.color_boosts - 10) / 3 + ascend_bonus
                        ),
                        game.notation
                    ) +
                    " μg rainbow spice"
            else
                document.getElementById("prestige_up").innerHTML =
                    "+" +
                    format_idec(
                        new Decimal(2).pow(
                            (game.color_boosts - 8) / 4 + ascend_bonus
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
        if (game.color_boosts >= 2000000)
            document.getElementById("prestige_req").innerHTML =
                format_small(game.color_boosts) + " color augments done"
        if (game.color_boosts >= 4 && game.collapse_challenge === 10)
            document.getElementById("prestige_req").innerHTML =
                format_small(game.color_boosts) + " color augments done"
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
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7
        ) {
            if (game.ascend >= 10240) {
                amount = amount.mul(
                    Decimal.pow(2, 5 * (game.ascend - 7740) ** 0.5 + 262)
                )
            } else {
                amount = amount.mul(Decimal.pow(2, game.ascend / 20))
            }
        }

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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Increase boost from strengtheners/shifts<br>(Disabled)"
                break
            case 3:
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "All spice production is boosted based on unspent rainbow spice<br>(Disabled)"
                break
            case 8:
                u.desc =
                    "All spices boost the previous color based on that spice's amount"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Red spice boosts every other color by its amount<br>(Disabled)"
                break
            case 14:
                u.desc = "Crystallized spice boosts pink spice by its amount"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Crystallized spice boosts pink spice by its amount<br>(Disabled)"
                break
            case 16:
                u.desc =
                    "Crystallized spice also boosts other colors by its amount"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(Disabled)"
                break
            case 19:
                u.desc =
                    "Crystal infusions also boost crystallized spice production 1.08x"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Crystallized spice production is boosted by unspent rainbow spice<br>(Disabled)"
                break
            case 23:
                u.desc =
                    "Crystallized spice furnace multipliers are raised to the 1.25 power"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Crystallized spice furnace multipliers are raised to the 1.25 power<br>(Disabled)"
                break
        }

        let button = prestige_map.get(u)
        document.getElementById("pr_desc" + u.id).innerHTML = u.desc
        document.getElementById("pr_cost" + u.id).innerHTML =
            "-" + format_idec(u.price, game.notation) + " μg rainbow spice"

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
    let antispice_power = 1
    if (game.antispice[1].cmp(1) >= 0) {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[1].log(10) ** 0.75
        )
        antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.013
        if (game.collapse_challenge !== 0)
            antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.0065
    }

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
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
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
            " g crystallized spice/sec<br><br>Your crystallized spice is boosting pink spice production " +
            format_idec(
                game.crystal_spice.pow(3).add(1).pow(antispice_power),
                game.notation
            ) +
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
                " g crystallized spice/sec<br><br>Your crystallized spice is boosting pink spice production " +
                format_idec(
                    game.crystal_spice.pow(3).add(1).pow(antispice_power),
                    game.notation
                ) +
                "x,<br>and boosting red, yellow, green & blue spice production " +
                format_idec(
                    game.crystal_spice.pow(12).add(1).pow(antispice_power),
                    game.notation
                ) +
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
                if (game.collapse_challenge === 8 && gen.id === 5) {
                    info_str =
                        "You have " +
                        format_inum(
                            game.crystal_spice_gen[gen.id]
                                .add(game.free_deity)
                                .floor(),
                            game.notation
                        ) +
                        " crystallized spice " +
                        gen.plural
                    if (
                        game.crystal_spice_gen[gen.id]
                            .add(game.free_deity)
                            .cmp(
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
                    info_str +=
                        format_idec(
                            game.crystal_spice_gen[gen.id]
                                .add(game.free_deity)
                                .floor()
                                .mul(game.total_crystal_spice_boost[gen.id])
                                .mul(3),
                            game.notation
                        ) +
                        " crystallized spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                    if (game.condensed)
                        info_str =
                            format_inum(
                                game.crystal_spice_gen[gen.id]
                                    .add(game.free_deity)
                                    .floor(),
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
                } else {
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
                                    game.crystal_spice_gen[gen.id]
                                        .floor()
                                        .pow(2),
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
                }
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
                        game.ascend >= 1 ||
                        game.collapse >= 1
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
        game.crystal_spice_gen[2].cmp(5) >= 0 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        let antispice_boosts = 1
        if (game.antispice[2].cmp(1) >= 0) {
            let antispice_amount = Decimal.pow(
                10,
                game.antispice[2].log(10) ** 0.75
            )
            antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 100
            if (game.collapse_challenge !== 0)
                antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 50
        }

        document.getElementById("crystal_gen_s").style.display = "block"

        let s_str =
            "You have " +
            format_small(game.crystal_strengthener) +
            " crystallized spice strengtheners,<br>boosting all crystallized spice generators " +
            format_idec(
                Decimal.pow(4, game.crystal_strengthener).pow(antispice_boosts),
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

    let antispice_infusions = 1
    if (game.antispice[3].cmp(1) >= 0) {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[3].log(10) ** 0.75
        )

        antispice_infusions = 1 + antispice_amount.log(10) ** (2 / 3) * 0.15
        if (game.collapse_challenge !== 0)
            antispice_infusions =
                1 + antispice_amount.log(10) ** (2 / 3) * 0.075
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
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
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
                        32 *
                        antispice_infusions
                ),
                game.notation
            ) +
            "x"
    } else if (
        game.ascend_bought[7] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
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
                        17.6 *
                        antispice_infusions
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
                        16 *
                        antispice_infusions
                ),
                game.notation
            ) +
            "x"
    }
    if (
        game.prestige_bought[19] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    )
        s_str +=
            ",<br>boosting all crystallized spice generators " +
            format_idec(
                Decimal.pow(
                    1.08 + 0.04 * game.ascend_bought[6],
                    game.crystal_infusion +
                        game.prestige_bought[20] *
                            12 *
                            (1 + game.ascend_bought[5]) *
                            antispice_infusions
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

    if (
        game.crystal_spice_bought[5] >= 5 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
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
        if (game.research_complete[10] >= 1)
            amount = Math.floor(
                (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8 *
                    (Math.log2((game.collapse + 25) / 25) ** 2 * 6.27 + 1)
            )
        document.getElementById("ascend_up").innerHTML =
            "+" + format_num(Math.floor(amount), game.notation) + " ᚫ"
        document.getElementById("ascend_req").style.color = "white"
        document.getElementById("ascend_req").innerHTML =
            format_idec(
                Decimal.pow(2, 1024).pow((amount + 1) ** 0.125),
                game.notation
            ) + " μg rainbow spice required"
        if (game.research_complete[10] >= 1)
            document.getElementById("ascend_req").innerHTML =
                format_idec(
                    Decimal.pow(2, 1024).pow(
                        (amount /
                            (Math.log2((game.collapse + 25) / 25) ** 2 * 6.27 +
                                1) +
                            1) **
                            0.125
                    ),
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
    if (game.research_complete[3] >= 1) {
        if (game.research_complete[3] >= 12)
            rune_speed = 2099520 * 2 ** (game.research_complete[3] - 12)
        else if (game.research_complete[3] >= 4)
            rune_speed = 320 * 3 ** (game.research_complete[3] - 4)
        else if (game.research_complete[3] >= 1)
            rune_speed = 5 * 4 ** (game.research_complete[3] - 1)
        else rune_speed = 5
    }
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

    if (game.research_complete[4] >= 1) {
        document.getElementById("distributor").style.display = "block"

        if (game.research_complete[6] >= 1) {
            document.getElementById("distributor_block1").style.display = "none"
            document.getElementById("distributor_block2").style.display =
                "block"
        } else {
            document.getElementById("distributor_block1").style.display = "flex"
            document.getElementById("distributor_block2").style.display = "none"
        }
    } else {
        document.getElementById("distributor").style.display = "none"
    }

    document.getElementById("ansuz_num2").innerHTML =
        format_num(game.ansuz, game.notation) + " ᚫ"
    document.getElementById("ansuz_num3").innerHTML =
        format_num(game.ansuz, game.notation) + " ᚫ"

    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    if (game.ascend_bought[16]) {
        document.getElementById("ascension_challenges").innerHTML =
            "ASCENSION&nbsp;CHALLENGES"
        if (mobile)
            document.getElementById("ascension_challenges").innerHTML =
                "CHALLENGES"
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "The boost from red spice amount is " +
                        format_small(50) +
                        "% stronger<br>(Disabled)"
                break
            case 1:
                u.desc = "The boost from Times Prestiged stat is stronger"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(Disabled)"
                break
            case 4:
                u.desc = "Crystallized spice generator multipliers are stronger"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Crystallized spice generator multipliers are stronger<br>(Disabled)"
                break
            case 6:
                u.desc =
                    "Crystal infusions boost crystallized spice production " +
                    format_dec(1.12) +
                    "x"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Crystal infusions boost crystallized spice production " +
                        format_dec(1.12) +
                        "x<br>(Disabled)"
                break
            case 7:
                u.desc =
                    "Crystal infusions are " + format_small(10) + "% stronger"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Crystal infusions are " +
                        format_small(10) +
                        "% stronger<br>(Disabled)"
                break
            case 11:
                u.desc = "Strengtheners are " + format_small(2) + "x stronger"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Strengtheners are " +
                        format_small(2) +
                        "x stronger<br>(Disabled)"
                break
            case 12:
                u.desc = "Unlocks automation for Ascension"
                if (game.ascend_challenge !== 0)
                    u.desc = "Unlocks automation for Ascension<br>(Disabled)"
                break
            case 13:
                u.desc = "Pink spice boosts crystallized spice by its amount"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(Disabled)"
                break
            case 15:
                if (game.ascend < 10240)
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
                                5 * (game.ascend - 7740) ** 0.5 + 262
                            ),
                            game.notation
                        ) +
                        "x)"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Times Ascended stat boosts rainbow spice gains<br>(Disabled)"
                break
            case 18:
                u.desc = "Red spice boosts crystallized spice by its amount"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Arcane enchantments also boost arcane spice production " +
                        format_dec(4 / 3, game.notation) +
                        "x<br>(Disabled)"
                break
            case 30:
                u.desc = "Red spice boosts arcane spice by its amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
                    u.desc =
                        "Red spice boosts arcane spice by its amount<br>(Disabled)"
                break
            case 31:
                u.desc = "Arcane spice boosts itself by its amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7
                )
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

        if (game.collapse_challenge === 10) {
            document.getElementById("as_desc" + u.id).innerHTML = u.desc
            document.getElementById("as_cost" + u.id).innerHTML =
                "-" +
                format_num(Math.ceil(u.price ** 0.5), game.notation) +
                " ᚫ"
        } else {
            document.getElementById("as_desc" + u.id).innerHTML = u.desc
            document.getElementById("as_cost" + u.id).innerHTML =
                "-" + format_num(u.price, game.notation) + " ᚫ"
        }

        let visible = true

        if (game.collapse >= 1) {
            visible = true
        } else {
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
                                ascension_upgrade.upgrades[upgrade2].challenge -
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

            if (game.collapse_challenge === 10) {
                if (
                    game.ansuz >= Math.ceil(u.price ** 0.5) &&
                    condition1 &&
                    condition2
                ) {
                    button.className = "ascension_upgrade a_unlocked2"
                    if (u.challenge !== 0)
                        button.className = "ascension_upgrade ac_unlocked"
                } else {
                    button.className = "ascension_upgrade a_locked"
                    if (u.challenge !== 0)
                        button.className = "ascension_upgrade ac_locked"
                }
            } else {
                if (
                    game.ansuz >= Math.ceil(u.price) &&
                    condition1 &&
                    condition2
                ) {
                    button.className = "ascension_upgrade a_unlocked2"
                    if (u.challenge !== 0)
                        button.className = "ascension_upgrade ac_unlocked"
                } else {
                    button.className = "ascension_upgrade a_locked"
                    if (u.challenge !== 0)
                        button.className = "ascension_upgrade ac_locked"
                }
            }

            if (visible) {
                button.style.display = "block"
                if (u.req !== undefined) {
                    let line = ascension_map2.get(u)
                    line.style.display = "block"
                }
                if (u.req2 !== undefined) {
                    let line = ascension_map3.get(u)
                    line.style.display = "block"
                }
            } else {
                button.style.display = "none"
                if (u.req !== undefined) {
                    let line = ascension_map2.get(u)
                    line.style.display = "none"
                }
                if (u.req2 !== undefined) {
                    let line = ascension_map3.get(u)
                    line.style.display = "none"
                }
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
        let info = panel.querySelector(".a_challenge_text")

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

            info.innerHTML =
                c.desc +
                "<br>Goal: <span class='rainbow_spice'>" +
                format_infdec(c.goal, game.notation) +
                " μg rainbow spice</span>"

            if (c.id === 5 && game.collapse >= 1) {
                info.innerHTML =
                    "Same as Challenge 1, but rune power production is disabled<br>(The unstable spice boost is also disabled)<br>Completing this Challenge is required to Collapse<br>Goal: <span class='rainbow_spice'>" +
                    format_infdec(c.goal, game.notation) +
                    " μg rainbow spice</span>"
            }
        } else {
            panel.style.display = "none"
        }
    }
}

//graphics updates for arcane spice
function arcane_update() {
    let antispice_power = 1
    if (game.antispice[1].cmp(1) >= 0) {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[1].log(10) ** 0.75
        )
        antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.013
        if (game.collapse_challenge !== 0)
            antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.0065
    }

    document.getElementById("arcane_spice_num").innerHTML =
        format_idec(game.arcane_spice, game.notation) + " mg"
    document.getElementById("arcane_spice_up").innerHTML =
        "+" +
        format_idec(
            game.arcane_spice_gen[0]
                .floor()
                .mul(game.total_arcane_spice_boost[0])
                .mul(5),
            game.notation
        ) +
        " mg arcane spice/sec"
    if (
        game.ascend_bought[31] &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
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
            " mg arcane spice/sec<br><br>Your arcane spice is boosting crystallized spice production " +
            format_idec(
                game.arcane_spice.pow(10).add(1).pow(antispice_power),
                game.notation
            ) +
            "x,<br>and boosting arcane spice production " +
            format_idec(
                game.arcane_spice.pow(0.0175).add(1).pow(antispice_power),
                game.notation
            ) +
            "x"
    } else if (
        game.ascend_bought[22] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
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
            " mg arcane spice/sec<br><br>Your arcane spice is boosting crystallized spice production " +
            format_idec(
                game.arcane_spice.pow(10).add(1).pow(antispice_power),
                game.notation
            ) +
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
                if (gen.id === 5) {
                    info_str =
                        "You have " +
                        format_inum(
                            game.arcane_spice_gen[gen.id]
                                .floor()
                                .add(game.free_deity),
                            game.notation
                        ) +
                        " arcane spice " +
                        gen.plural
                    if (
                        game.arcane_spice_gen[gen.id]
                            .add(game.free_deity)
                            .cmp(
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
                }
                if (gen.id === 0) {
                    info_str +=
                        format_idec(
                            game.arcane_spice_gen[gen.id]
                                .floor()
                                .mul(game.total_arcane_spice_boost[gen.id])
                                .mul(5),
                            game.notation
                        ) + " mg arcane spice/sec"
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
                    if (gen.id === 5) {
                        info_str +=
                            format_idec(
                                game.arcane_spice_gen[gen.id]
                                    .floor()
                                    .add(game.free_deity)
                                    .mul(game.total_arcane_spice_boost[gen.id])
                                    .mul(5),
                                game.notation
                            ) +
                            " arcane spice " +
                            spice_gen.generators[gen.rid - 1].plural +
                            "/sec"
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
                }
                if (game.condensed) {
                    if (gen.id === 5) {
                        info_str =
                            format_inum(
                                game.arcane_spice_gen[gen.id]
                                    .add(game.free_deity)
                                    .floor(),
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
                    } else {
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
                    }
                }
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
        let antispice_boosts = 1
        if (game.antispice[2].cmp(1) >= 0) {
            let antispice_amount = Decimal.pow(
                10,
                game.antispice[2].log(10) ** 0.75
            )
            antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 100
            if (game.collapse_challenge !== 0)
                antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 50
        }

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
                    ).pow(antispice_boosts),
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

    let antispice_infusions = 1
    if (game.antispice[3].cmp(1) >= 0) {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[3].log(10) ** 0.75
        )

        antispice_infusions = 1 + antispice_amount.log(10) ** (2 / 3) * 0.15
        if (game.collapse_challenge !== 0)
            antispice_infusions =
                1 + antispice_amount.log(10) ** (2 / 3) * 0.075
    }

    let s_str =
        "You have " +
        format_small(game.arcane_enchantment) +
        " arcane enchantments,<br>boosting all crystallized spice generators " +
        format_idec(
            Decimal.pow(4, game.arcane_enchantment * 100 * antispice_infusions),
            game.notation
        ) +
        "x"
    if (game.free_enchantment > 0) {
        s_str =
            "You have " +
            format_small(game.arcane_enchantment) +
            " arcane enchantments (+" +
            format_small(game.free_enchantment) +
            " free),<br>boosting all crystallized spice generators " +
            format_idec(
                Decimal.pow(
                    4,
                    (game.arcane_enchantment + game.free_enchantment) *
                        100 *
                        antispice_infusions
                ),
                game.notation
            ) +
            "x"
    }

    if (
        game.ascend_bought[29] &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7
    ) {
        if (game.free_enchantment > 0) {
            s_str +=
                ",<br>and boosting all arcane spice generators " +
                format_idec(
                    Decimal.pow(
                        4 / 3,
                        (game.arcane_enchantment + game.free_enchantment) *
                            antispice_infusions
                    ),
                    game.notation
                ) +
                "x"
        } else {
            s_str +=
                ",<br>and boosting all arcane spice generators " +
                format_idec(
                    Decimal.pow(
                        4 / 3,
                        game.arcane_enchantment * antispice_infusions
                    ),
                    game.notation
                ) +
                "x"
        }
    }
    if (game.ascend_challenge === 5 || game.collapse_challenge === 7) {
        s_str = "Arcane enchantments refresh spice production for 1 second"
    }

    document.getElementById("arcane_info_n").innerHTML = s_str
    document.getElementById("arcane_cost_n").innerHTML =
        "-" +
        format_idec(game.arcane_enchantment_price, game.notation) +
        " mg arcane spice"
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

//graphics updates for collapse
function collapse_update() {
    let amount = game.collapse_spice.pow(5 * 10 ** -10).floor()

    if (amount.cmp(Decimal.pow(10, 1800)) >= 0) {
        amount = amount
            .div(Decimal.pow(10, 200))
            .pow(10 / ((amount.log(10) * 0.3 - 56) ** 0.5 - 2))
            .mul(Decimal.pow(10, 200))
    } else if (amount.cmp(Decimal.pow(10, 200)) >= 0) {
        amount = amount
            .div(Decimal.pow(10, 200))
            .pow(0.5)
            .mul(Decimal.pow(10, 200))
    }

    if (game.research_complete[5] >= 1 && game.collapse_challenge === 0) {
        let rune_amount = Decimal.pow(
            1.2,
            (game.total_rune_power / 10 ** 28) ** 0.2
        ).mul(game.total_rune_power ** 0.5 / (5 * 10 ** 12) + 1)
        if (rune_amount.cmp(Decimal.pow(10, 50)) >= 0)
            rune_amount = Decimal.pow(
                10,
                rune_amount.div(Decimal.pow(10, 50)).log(10) ** 0.5 + 50
            )
        if (rune_amount.cmp(Decimal.pow(10, 100)) >= 0)
            rune_amount = Decimal.pow(10, 100)

        amount = amount.mul(rune_amount)
    }

    let total_completions = 0
    for (let i = 0; i < 6; i++) {
        total_completions += game.collapse_complete[i]
    }
    if (game.research_complete[22] >= 1 && game.collapse_challenge === 0)
        amount = amount.mul(Decimal.pow(888, total_completions))

    let goal = new Decimal(1)
    if (game.collapse_challenge !== 0) {
        let c = collapse_challenge.challenges[game.collapse_challenge - 7]
        let completions = game.collapse_complete[game.collapse_challenge - 7]
        let exponent = completions

        if (c.scaling1 !== undefined && completions >= c.scaling1) {
            if (completions >= c.scaling1) {
                exponent = c.scaling1 + (completions - c.scaling1) * 1.5
            }

            if (c.scaling2 !== undefined) {
                if (completions >= c.scaling2) {
                    exponent =
                        (completions - c.scaling2) * 2 +
                        (c.scaling2 - c.scaling1) * 1.5 +
                        c.scaling1
                }

                if (c.scaling3 !== undefined) {
                    if (completions >= c.scaling3) {
                        exponent =
                            (completions - c.scaling3) * 3 +
                            (c.scaling3 - c.scaling2) * 2 +
                            (c.scaling2 - c.scaling1) * 1.5 +
                            c.scaling1
                    }

                    if (c.scaling4 !== undefined) {
                        if (completions >= c.scaling4) {
                            exponent =
                                (completions - c.scaling4) * 5 +
                                (c.scaling4 - c.scaling3) * 3 +
                                (c.scaling3 - c.scaling2) * 2 +
                                (c.scaling2 - c.scaling1) * 1.5 +
                                c.scaling1
                        }
                    }
                }
            }
        }

        goal = c.goal.mul(
            Decimal.pow(10, Math.round(Decimal.pow(c.delta, exponent).log(10)))
        )
    }

    if (game.ascend_complete[5] && amount.cmp(goal) >= 0) {
        document.getElementById("collapse_button").className =
            "collapse_button co_unlocked"
        document.getElementById("collapse_up").style.display = "block"
        document.getElementById("collapse_up").innerHTML =
            "+" + format_inum(amount.floor(), game.notation) + " atomic spice"
        document.getElementById("collapse_req").style.color = "white"

        if (goal.cmp(1) === 1) {
            if (game.research_complete[28] >= 1) {
                if (game.pending_completions === 1)
                    document.getElementById("collapse_req").innerHTML =
                        "+" +
                        format_small(game.pending_completions) +
                        " Challenge " +
                        format_small(game.collapse_challenge) +
                        " completion"
                else
                    document.getElementById("collapse_req").innerHTML =
                        "+" +
                        format_small(game.pending_completions) +
                        " Challenge " +
                        format_small(game.collapse_challenge) +
                        " completions"
            } else {
                document.getElementById("collapse_req").innerHTML =
                    "Challenge " +
                    format_small(game.collapse_challenge) +
                    " goal reached"
            }
        } else {
            document.getElementById("collapse_req").innerHTML =
                "Challenge 6 completed"
        }
    } else {
        document.getElementById("collapse_button").className =
            "collapse_button co_locked"
        document.getElementById("collapse_up").style.display = "none"
        document.getElementById("collapse_req").style.color = "grey"

        if (game.ascend_complete[5] && goal.cmp(1) === 1) {
            document.getElementById("collapse_req").innerHTML =
                "+" +
                format_inum(goal, game.notation) +
                " atomic spice required"
            document.getElementById("collapse_up").style.display = "block"
            document.getElementById("collapse_up").innerHTML =
                "+" +
                format_inum(amount.floor(), game.notation) +
                " atomic spice"
        } else {
            document.getElementById("collapse_req").innerHTML =
                "Challenge 6 required"
        }
    }

    document.getElementById("atomic_spice_num").innerHTML = format_inum(
        game.atomic_spice,
        game.notation
    )
    document.getElementById("atomic_spice_num2").innerHTML = format_inum(
        game.atomic_spice,
        game.notation
    )
    document.getElementById("collider_info").innerHTML =
        "Atomic spice efficiency: " +
        format_num(Math.round(game.atomic_efficiency * 100), 0) +
        "%<br>Expected yield: <span class='unstable_spice'>+" +
        format_inum(
            game.atomic_spice.pow(game.atomic_efficiency).floor(),
            game.notation
        ) +
        " unstable spice</span>"

    if (game.collider_tab === 0) {
        if (game.research_complete[17] >= 1) {
            document.getElementById("collider_portion").style.display = "flex"
            document.getElementById("collider_resource").innerHTML =
                "Activating the Spice Collider will consume some atomic spice and create unstable spice"

            document.getElementById("collider_info").innerHTML =
                "Atomic spice input: <span class='atomic_spice'>" +
                format_inum(
                    game.atomic_spice.mul(game.atomic_portion),
                    game.notation
                ) +
                " atomic spice</span><br>Atomic spice efficiency: " +
                format_num(Math.round(game.atomic_efficiency * 100), 0) +
                "%<br>Expected yield: <span class='unstable_spice'>+" +
                format_inum(
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency)
                        .floor(),
                    game.notation
                ) +
                " unstable spice</span>"
        } else {
            document.getElementById("collider_portion").style.display = "none"
            document.getElementById("collider_resource").innerHTML =
                "Activating the Spice Collider will consume all atomic spice and create unstable spice"
        }
    } else if (game.collider_tab === 1) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create pure antispice<br>Pure antispice gains are calculated based on total atomic spice used"

        let amount = game.atomic_spice
            .mul(game.atomic_portion)
            .add(game.spent_atomic_spice[0])
            .pow(game.atomic_efficiency / 132)
            .sub(game.antispice[0])
            .floor()
        let yield_str =
            "Expected yield: <span class='pure_antispice'>+" +
            format_inum(amount, game.notation) +
            " pure antispice</span>"
        if (game.antispice[0].add(amount).cmp(Decimal.pow(10, 52)) >= 0)
            yield_str =
                "Expected yield: <span class='pure_antispice'>+" +
                format_inum(
                    Decimal.pow(10, 52).sub(game.antispice[0]),
                    game.notation
                ) +
                " pure antispice (capped at " +
                format_inum(Decimal.pow(10, 52), game.notation) +
                ")</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic spice input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic spice</span><br>Atomic spice efficiency: " +
            format_num(Math.round(game.atomic_efficiency * 100), 0) +
            "%<br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[0], game.notation) +
            " atomic spice</span>"
    } else if (game.collider_tab === 2) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create red antispice<br>Red antispice gains are calculated based on total atomic spice used and total red spice"

        let red_amount = Decimal.pow(
            10,
            (game.antitotal_spice[1].log(10) / (4.4 * 10 ** 11)) ** 0.5
        )

        let atomic_amount = game.spent_atomic_spice[1]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 320)

        let amount = atomic_amount
            .mul(red_amount)
            .floor()
            .sub(game.antispice[1])
        let yield_str =
            "Expected yield: <span class='red_antispice'>+" +
            format_inum(amount, game.notation) +
            " red antispice</span>"
        if (game.antispice[1].add(amount).cmp(Decimal.pow(10, 36)) >= 0)
            yield_str =
                "Expected yield: <span class='red_antispice'>+" +
                format_inum(
                    Decimal.pow(10, 36).sub(game.antispice[1]),
                    game.notation
                ) +
                " red antispice (capped at " +
                format_inum(Decimal.pow(10, 36), game.notation) +
                ")</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic spice input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic spice</span><br>Atomic spice efficiency: " +
            format_num(Math.round(game.atomic_efficiency * 100), 0) +
            "%<br>Red spice input: <span class='red_spice'>" +
            format_inum(game.antitotal_spice[1], game.notation) +
            " g red spice</span><br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[1], game.notation) +
            " atomic spice</span>"
    } else if (game.collider_tab === 3) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create yellow antispice<br>Yellow antispice gains are calculated based on total atomic spice used and total yellow spice"

        let yellow_amount = Decimal.pow(
            10,
            (game.antitotal_spice[2].log(10) / (1.2 * 10 ** 12)) ** 0.5
        )

        let atomic_amount = game.spent_atomic_spice[2]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 888)

        let amount = atomic_amount
            .mul(yellow_amount)
            .floor()
            .sub(game.antispice[2])
        let yield_str =
            "Expected yield: <span class='yellow_antispice'>+" +
            format_inum(amount, game.notation) +
            " yellow antispice</span>"
        if (game.antispice[2].add(amount).cmp(Decimal.pow(10, 16)) >= 0)
            yield_str =
                "Expected yield: <span class='yellow_antispice'>+" +
                format_inum(
                    Decimal.pow(10, 16).sub(game.antispice[2]),
                    game.notation
                ) +
                " yellow antispice (capped at " +
                format_inum(Decimal.pow(10, 16), game.notation) +
                ")</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic spice input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic spice</span><br>Atomic spice efficiency: " +
            format_num(Math.round(game.atomic_efficiency * 100), 0) +
            "%<br>Yellow spice input: <span class='yellow_spice'>" +
            format_inum(game.antitotal_spice[2], game.notation) +
            " g yellow spice</span><br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[2], game.notation) +
            " atomic spice</span>"
    } else if (game.collider_tab === 4) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create green antispice<br>Green antispice gains are calculated based on total atomic spice used and total green spice"

        let green_amount = Decimal.pow(
            10,
            (game.antitotal_spice[3].log(10) / (3.75 * 10 ** 12)) ** 0.5
        )

        let atomic_amount = game.spent_atomic_spice[3]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 2111)

        let amount = atomic_amount
            .mul(green_amount)
            .floor()
            .sub(game.antispice[3])
        let yield_str =
            "Expected yield: <span class='green_antispice'>+" +
            format_inum(amount, game.notation) +
            " green antispice</span>"
        if (game.antispice[3].add(amount).cmp(Decimal.pow(10, 7)) >= 0)
            yield_str =
                "Expected yield: <span class='green_antispice'>+" +
                format_inum(
                    Decimal.pow(10, 7).sub(game.antispice[3]),
                    game.notation
                ) +
                " green antispice (capped at " +
                format_inum(Decimal.pow(10, 7), game.notation) +
                ")</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic spice input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic spice</span><br>Atomic spice efficiency: " +
            format_num(Math.round(game.atomic_efficiency * 100), 0) +
            "%<br>Green spice input: <span class='green_spice'>" +
            format_inum(game.antitotal_spice[3], game.notation) +
            " g green spice</span><br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[3], game.notation) +
            " atomic spice</span>"
    }

    document.getElementById("unstable_spice_num").innerHTML = format_inum(
        game.unstable_spice.round(),
        game.notation
    )
    document.getElementById("unstable_boost").innerHTML =
        "Your unstable spice is decaying away with a half-life of " +
        format_time_long(game.halflife, 0, true) +
        ",<br>the resulting energy is boosting all normal spice production " +
        format_idec(game.unstable_boost, game.notation) +
        "x"
    if (game.collapse_complete[1] >= 1)
        document.getElementById("unstable_boost").innerHTML =
            "Your unstable spice is decaying away with a half-life of " +
            format_time_long(game.halflife, 0, true) +
            ",<br>the resulting energy is boosting all normal spice production " +
            format_idec(game.unstable_boost, game.notation) +
            "x,<br>and boosting crystallized spice production " +
            format_idec(game.unstable_boost.pow(0.009), game.notation) +
            "x,<br>and boosting arcane spice production " +
            format_idec(game.unstable_boost.pow(0.000012), game.notation) +
            "x,<br>and has produced " +
            format_inum(game.free_deity, game.notation) +
            " arcane spice deities"
    else if (game.research_complete[9] >= 1)
        document.getElementById("unstable_boost").innerHTML =
            "Your unstable spice is decaying away with a half-life of " +
            format_time_long(game.halflife, 0, true) +
            ",<br>the resulting energy is boosting all normal spice production " +
            format_idec(game.unstable_boost, game.notation) +
            "x,<br>and boosting crystallized spice production " +
            format_idec(game.unstable_boost.pow(0.009), game.notation) +
            "x,<br>and boosting arcane spice production " +
            format_idec(game.unstable_boost.pow(0.000012), game.notation) +
            "x"
    else if (game.research_complete[2] >= 1)
        document.getElementById("unstable_boost").innerHTML =
            "Your unstable spice is decaying away with a half-life of " +
            format_time_long(game.halflife) +
            ",<br>the resulting energy is boosting all normal spice production " +
            format_idec(game.unstable_boost, game.notation) +
            "x,<br>and boosting crystallized spice production " +
            format_idec(game.unstable_boost.pow(0.009), game.notation) +
            "x"
    if (game.collapse_challenge === 8)
        document.getElementById("unstable_boost").innerHTML =
            "Your unstable spice is decaying away with a half-life of " +
            format_time_long(game.halflife, 0, true) +
            ",<br>and has created " +
            format_inum(game.free_deity, game.notation) +
            " sixth generators of all types"
    document.getElementById("decayed_spice_num").innerHTML = format_inum(
        game.decayed_spice,
        game.notation
    )
    if (game.unstable_spice.cmp(0.5) > 0)
        document.getElementById("decay_time").style.display = "block"
    else document.getElementById("decay_time").style.display = "none"
    document.getElementById("decay_time").innerHTML =
        "Your unstable spice will be completely decayed in " +
        format_time_long(
            game.unstable_spice.mul(2).log(2) * game.halflife,
            game.notation
        )
    if (game.gamespeed !== 1)
        document.getElementById("decay_time").innerHTML =
            "Your unstable spice will be completely decayed in " +
            format_time_long(
                (game.unstable_spice.mul(2).log(2) * game.halflife) /
                    game.gamespeed,
                game.notation
            ) +
            " real time"

    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    if (game.research_complete[15] >= 1 && game.collapse_challenge === 0) {
        document.getElementById("collapse_info2").style.display = "none"
        document.getElementById("collapse_auto_block").style.display = "block"

        document.getElementById("collider_title").className =
            "collapse_title atomic_spice co_auto_margin"

        if (game.autoco_mode === 0) {
            document.getElementById("collapse_spice").style.display = "flex"
            document.getElementById("collapse_spice2").style.display = "flex"
            document.getElementById("collapse_time").style.display = "none"
            document.getElementById("collapse_time2").style.display = "none"
        } else if (game.autoco_mode === 1) {
            document.getElementById("collapse_spice").style.display = "none"
            document.getElementById("collapse_spice2").style.display = "none"
            document.getElementById("collapse_time").style.display = "flex"
            document.getElementById("collapse_time2").style.display = "flex"
        }

        document.getElementById("collapse_tabs").style.display = "flex"
        document.getElementById("research_unlock").style.display = "none"

        document.getElementById("spice_collider").innerHTML =
            "SPICE&nbsp;COLLIDER"
        if (mobile)
            document.getElementById("spice_collider").innerHTML = "COLLIDER"
    } else {
        document.getElementById("collapse_info2").style.display = "block"
        document.getElementById("collapse_auto_block").style.display = "none"

        document.getElementById("collider_title").className =
            "collapse_title atomic_spice"

        if (game.collapse >= 5) {
            document.getElementById("collapse_tabs").style.display = "flex"
            document.getElementById("research_unlock").style.display = "none"

            document.getElementById("spice_collider").innerHTML =
                "SPICE&nbsp;COLLIDER"
            if (mobile)
                document.getElementById("spice_collider").innerHTML = "COLLIDER"
        } else {
            document.getElementById("collapse_tabs").style.display = "none"
            document.getElementById("research_unlock").style.display = "inline"
        }
    }

    if (game.research_complete[18] >= 1) {
        document.getElementById("collapse_challenges").innerHTML =
            "COLLAPSE&nbsp;CHALLENGES"
        if (mobile)
            document.getElementById("collapse_challenges").innerHTML =
                "CHALLENGES"
        if (game.subtab[4] === 2)
            document.getElementById("collapse_challenges").className =
                "subtab selected"
        else
            document.getElementById("collapse_challenges").className =
                "subtab unlocked"
    } else {
        document.getElementById("collapse_challenges").innerHTML = "LOCKED"
        document.getElementById("collapse_challenges").className =
            "subtab locked"
    }

    if (game.research_complete[19] >= 1) {
        document.getElementById("collider_tabs").style.display = "flex"

        document.getElementById("antispice").innerHTML = "ANTISPICE"
        if (game.subtab[4] === 3)
            document.getElementById("antispice").className = "subtab selected"
        else document.getElementById("antispice").className = "subtab unlocked"

        if (game.research_complete[21] >= 1) {
            document.getElementById("collider_tab3").style.display = "block"
        } else {
            document.getElementById("collider_tab3").style.display = "none"
        }

        if (game.research_complete[24] >= 1) {
            document.getElementById("collider_tab4").style.display = "block"
        } else {
            document.getElementById("collider_tab4").style.display = "none"
        }

        if (game.research_complete[27] >= 1) {
            document.getElementById("collider_tab5").style.display = "block"
        } else {
            document.getElementById("collider_tab5").style.display = "none"
        }

        document.getElementById("collider_tab1").className = "spice_buy"
        document.getElementById("collider_tab2").className = "spice_buy"
        document.getElementById("collider_tab3").className = "spice_buy"
        document.getElementById("collider_tab4").className = "spice_buy"
        document.getElementById("collider_tab5").className = "spice_buy"

        switch (game.collider_tab) {
            case 0:
                document.getElementById("collider_tab1").className =
                    "spice_buy current_tab"
                break
            case 1:
                document.getElementById("collider_tab2").className =
                    "spice_buy current_tab"
                break
            case 2:
                document.getElementById("collider_tab3").className =
                    "spice_buy current_tab"
                break
            case 3:
                document.getElementById("collider_tab4").className =
                    "spice_buy current_tab"
                break
            case 4:
                document.getElementById("collider_tab5").className =
                    "spice_buy current_tab"
                break
        }
    } else {
        document.getElementById("collider_tabs").style.display = "none"

        document.getElementById("antispice").innerHTML = "LOCKED"
        document.getElementById("antispice").className = "subtab locked"
    }

    for (const c of collapse_challenge.challenges) {
        switch (c.id) {
            case 0:
                c.desc = "Challenges 1, 3, 4, & 5 simultaneously"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: Normal spice multipliers are " +
                        format_dec(2.5, game.notation) +
                        "% stronger, and unlock 2 researches"
                } else if (game.collapse_complete[c.id] === 2) {
                    c.desc +=
                        "<br>Currently: Normal spice multipliers are " +
                        format_dec(5, game.notation) +
                        "% stronger<br>Next: Normal spice multipliers are " +
                        format_dec(7.5, game.notation) +
                        "% stronger, and unlock a research"
                } else {
                    c.desc +=
                        "<br>Currently: Normal spice multipliers are " +
                        format_dec(
                            game.collapse_complete[c.id] * 2.5,
                            game.notation
                        ) +
                        "% stronger<br>Next: Normal spice multipliers are " +
                        format_dec(
                            game.collapse_complete[c.id] * 2.5 + 2.5,
                            game.notation
                        ) +
                        "% stronger"
                }
                break
            case 1:
                c.desc =
                    "Unstable spice decay gives no boost, it instead produces sixth generators"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: Unstable spice decay now also produces arcane spice deities, and unlock a research"
                } else if (game.collapse_complete[c.id] === 2) {
                    c.desc +=
                        "<br>Currently: Unstable spice decay has produced " +
                        format_inum(
                            game.unstable_boost
                                .pow(3 / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next: Unstable spice decay will produce " +
                        format_inum(
                            game.unstable_boost
                                .pow(4 / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities, and unlock a research"
                } else if (game.collapse_complete[c.id] === 4) {
                    c.desc +=
                        "<br>Currently: Unstable spice decay has produced " +
                        format_inum(
                            game.unstable_boost
                                .pow(5 / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next: Unstable spice decay will produce " +
                        format_inum(
                            game.unstable_boost
                                .pow(6 / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities, and unlock a research"
                } else {
                    c.desc +=
                        "<br>Currently: Unstable spice decay has produced " +
                        format_inum(
                            game.unstable_boost
                                .pow((1 + game.collapse_complete[c.id]) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next: Unstable spice decay will produce " +
                        format_inum(
                            game.unstable_boost
                                .pow((2 + game.collapse_complete[c.id]) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities"
                }
                break
            case 2:
                c.desc =
                    "The game runs " +
                    format_small(99999) +
                    "x slower, reach the goal in 999 microseconds or less"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: The game runs " +
                        format_num(2, game.notation) +
                        "x faster, and unlock a research"
                } else if (game.collapse_complete[c.id] === 3) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(8, game.notation) +
                        "x faster<br>Next: The game runs " +
                        format_num(16, game.notation) +
                        "x faster, and unlock a research"
                } else if (game.collapse_complete[c.id] === 6) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(64, game.notation) +
                        "x faster<br>Next: The game runs " +
                        format_num(128, game.notation) +
                        "x faster, and unlock a research"
                } else {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(
                            2 ** game.collapse_complete[c.id],
                            game.notation
                        ) +
                        "x faster<br>Next: The game runs " +
                        format_num(
                            2 ** (game.collapse_complete[c.id] + 1),
                            game.notation
                        ) +
                        "x faster"
                }
                break
            case 3:
                c.desc =
                    "Color augment scaling is much stronger, and color augments begin at " +
                    format_small(4) +
                    " color boosts<br>Ascension upgrade prices are also reduced"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: Color augments begin at " +
                        format_small(4000000) +
                        " color boosts, and unlock a research"
                } else {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(
                            2000000 + 2000000 * game.collapse_complete[c.id]
                        ) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(
                            4000000 + 2000000 * game.collapse_complete[c.id]
                        ) +
                        " color boosts"
                }
                break
        }

        let panel = challenge_map.get(c)
        let button = panel.querySelector(".co_challenge_button")
        let info = panel.querySelector(".co_challenge_text")

        if (game.research_complete[c.unlock] >= 1) {
            panel.style.display = "flex"

            if (game.collapse_challenge === c.id + 7) {
                button.className = "co_challenge_button inside"
                button.innerHTML = "In Progress"
            } else {
                button.className = "co_challenge_button outside"
                button.innerHTML = "Enter Challenge"
            }

            let completions = game.collapse_complete[c.id]

            let exponent = completions

            if (c.scaling1 !== undefined && completions >= c.scaling1) {
                if (completions >= c.scaling1) {
                    exponent = c.scaling1 + (completions - c.scaling1) * 1.5
                }

                if (c.scaling2 !== undefined) {
                    if (completions >= c.scaling2) {
                        exponent =
                            (completions - c.scaling2) * 2 +
                            (c.scaling2 - c.scaling1) * 1.5 +
                            c.scaling1
                    }

                    if (c.scaling3 !== undefined) {
                        if (completions >= c.scaling3) {
                            exponent =
                                (completions - c.scaling3) * 3 +
                                (c.scaling3 - c.scaling2) * 2 +
                                (c.scaling2 - c.scaling1) * 1.5 +
                                c.scaling1
                        }

                        if (c.scaling4 !== undefined) {
                            if (completions >= c.scaling4) {
                                exponent =
                                    (completions - c.scaling4) * 5 +
                                    (c.scaling4 - c.scaling3) * 3 +
                                    (c.scaling3 - c.scaling2) * 2 +
                                    (c.scaling2 - c.scaling1) * 1.5 +
                                    c.scaling1
                            }
                        }
                    }
                }
            }

            if (
                game.pending_completions > 0 &&
                game.collapse_challenge === c.id + 7
            ) {
                exponent = completions + game.pending_completions
                if (
                    c.scaling1 !== undefined &&
                    completions + game.pending_completions >= c.scaling1
                ) {
                    if (completions + game.pending_completions >= c.scaling1) {
                        exponent =
                            c.scaling1 +
                            (completions +
                                game.pending_completions -
                                c.scaling1) *
                                1.5
                    }

                    if (c.scaling2 !== undefined) {
                        if (
                            completions + game.pending_completions >=
                            c.scaling2
                        ) {
                            exponent =
                                (completions +
                                    game.pending_completions -
                                    c.scaling2) *
                                    2 +
                                (c.scaling2 - c.scaling1) * 1.5 +
                                c.scaling1
                        }

                        if (c.scaling3 !== undefined) {
                            if (
                                completions + game.pending_completions >=
                                c.scaling3
                            ) {
                                exponent =
                                    (completions +
                                        game.pending_completions -
                                        c.scaling3) *
                                        3 +
                                    (c.scaling3 - c.scaling2) * 2 +
                                    (c.scaling2 - c.scaling1) * 1.5 +
                                    c.scaling1
                            }

                            if (c.scaling4 !== undefined) {
                                if (
                                    completions + game.pending_completions >=
                                    c.scaling4
                                ) {
                                    exponent =
                                        (completions +
                                            game.pending_completions -
                                            c.scaling4) *
                                            5 +
                                        (c.scaling4 - c.scaling3) * 3 +
                                        (c.scaling3 - c.scaling2) * 2 +
                                        (c.scaling2 - c.scaling1) * 1.5 +
                                        c.scaling1
                                }
                            }
                        }
                    }
                }

                info.innerHTML =
                    "<span class='small_text'>" +
                    c.desc +
                    "<br></span><br>Goal: <span class='atomic_spice'>+" +
                    format_infdec(
                        c.goal.mul(
                            Decimal.pow(
                                10,
                                Math.round(
                                    Decimal.pow(c.delta, exponent).log(10)
                                )
                            )
                        ),
                        game.notation
                    ) +
                    " atomic spice</span><br>Completions: " +
                    format_small(game.collapse_complete[c.id]) +
                    " (+" +
                    format_small(game.pending_completions) +
                    " on Collapse)"
            } else {
                info.innerHTML =
                    "<span class='small_text'>" +
                    c.desc +
                    "<br></span><br>Goal: <span class='atomic_spice'>+" +
                    format_infdec(
                        c.goal.mul(
                            Decimal.pow(
                                10,
                                Math.round(
                                    Decimal.pow(c.delta, exponent).log(10)
                                )
                            )
                        ),
                        game.notation
                    ) +
                    " atomic spice</span><br>Completions: " +
                    format_small(game.collapse_complete[c.id])
            }
        } else {
            panel.style.display = "none"
        }
    }

    if (game.collapse_challenge !== 0) {
        document.getElementById("antispice_reduction").style.display = "block"
    } else {
        document.getElementById("antispice_reduction").style.display = "none"
    }

    document.getElementById("pure_antispice_num").innerHTML = format_inum(
        game.antispice[0],
        game.notation
    )
    if (game.antispice[0].cmp(0) === 0)
        document.getElementById("pure_antispice_boost").innerHTML =
            "Your pure antispice is boosting arcane spice production " +
            format_inum(new Decimal(1), game.notation) +
            "x,<br>and making first generators " +
            format_dec(0, game.notation) +
            "% stronger"
    else {
        let antispice_amount = Decimal.pow(
            10,
            game.antispice[0].log(10) ** 0.75
        )
        if (game.collapse_challenge !== 0) {
            document.getElementById("pure_antispice_boost").innerHTML =
                "Your pure antispice is boosting arcane spice production " +
                format_inum(
                    Decimal.pow(antispice_amount, 35000).add(1),
                    game.notation
                ) +
                "x,<br>and making first generators " +
                format_dec(
                    antispice_amount.log(10) ** (2 / 3) * 3,
                    game.notation
                ) +
                "% stronger"
        } else {
            document.getElementById("pure_antispice_boost").innerHTML =
                "Your pure antispice is boosting arcane spice production " +
                format_inum(
                    Decimal.pow(antispice_amount, 70000).add(1),
                    game.notation
                ) +
                "x,<br>and making first generators " +
                format_dec(
                    antispice_amount.log(10) ** (2 / 3) * 6,
                    game.notation
                ) +
                "% stronger"
        }
    }

    if (game.research_complete[21] >= 1) {
        document.getElementById("red_antispice_block").style.display = "block"

        document.getElementById("red_antispice_num").innerHTML = format_inum(
            game.antispice[1],
            game.notation
        )
        if (game.antispice[1].cmp(0) === 0)
            document.getElementById("red_antispice_boost").innerHTML =
                "Your red antispice is boosting red spice production " +
                format_inum(new Decimal(1), game.notation) +
                "x,<br>improving synergy between colors by " +
                format_dec(0, game.notation) +
                "%,<br>and making second generators " +
                format_dec(0, game.notation) +
                "% stronger"
        else {
            let antispice_amount = Decimal.pow(
                10,
                game.antispice[1].log(10) ** 0.75
            )
            if (game.collapse_challenge !== 0) {
                document.getElementById("red_antispice_boost").innerHTML =
                    "Your red antispice is boosting red spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 3.5 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>improving synergy between spices by " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 0.65,
                        game.notation
                    ) +
                    "%,<br>and making second generators " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 3,
                        game.notation
                    ) +
                    "% stronger"
            } else {
                document.getElementById("red_antispice_boost").innerHTML =
                    "Your red antispice is boosting red spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 7 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>improving synergy between spices by " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 1.3,
                        game.notation
                    ) +
                    "%,<br>and making second generators " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 6,
                        game.notation
                    ) +
                    "% stronger"
            }
        }
    } else {
        document.getElementById("red_antispice_block").style.display = "none"
    }

    if (game.research_complete[24] >= 1) {
        document.getElementById("yellow_antispice_block").style.display =
            "block"

        document.getElementById("yellow_antispice_num").innerHTML = format_inum(
            game.antispice[2],
            game.notation
        )
        if (game.antispice[2].cmp(0) === 0)
            document.getElementById("yellow_antispice_boost").innerHTML =
                "Your yellow antispice is boosting yellow spice production " +
                format_inum(new Decimal(1), game.notation) +
                "x,<br>making color boosts and ALL strengtheners " +
                format_dec(1, game.notation) +
                "x stronger,<br>and making third generators " +
                format_dec(0, game.notation) +
                "% stronger"
        else {
            let antispice_amount = Decimal.pow(
                10,
                game.antispice[2].log(10) ** 0.75
            )
            if (game.collapse_challenge !== 0) {
                document.getElementById("yellow_antispice_boost").innerHTML =
                    "Your yellow antispice is boosting yellow spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 3.25 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>making color boosts and ALL strengtheners " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 50 + 1,
                        game.notation
                    ) +
                    "x stronger,<br>and making third generators " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 3,
                        game.notation
                    ) +
                    "% stronger"
            } else {
                document.getElementById("yellow_antispice_boost").innerHTML =
                    "Your yellow antispice is boosting yellow spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 6.5 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>making color boosts and ALL strengtheners " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 100 + 1,
                        game.notation
                    ) +
                    "x stronger,<br>and making third generators " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 6,
                        game.notation
                    ) +
                    "% stronger"
            }
        }
    } else {
        document.getElementById("yellow_antispice_block").style.display = "none"
    }

    if (game.research_complete[27] >= 1) {
        document.getElementById("green_antispice_block").style.display = "block"

        document.getElementById("green_antispice_num").innerHTML = format_inum(
            game.antispice[3],
            game.notation
        )
        if (game.antispice[3].cmp(0) === 0)
            document.getElementById("green_antispice_boost").innerHTML =
                "Your green antispice is boosting green spice production " +
                format_inum(new Decimal(1), game.notation) +
                "x,<br>making crystal infusions and arcane enchantments " +
                format_dec(0, game.notation) +
                "% stronger,<br>and making four generators " +
                format_dec(0, game.notation) +
                "% stronger"
        else {
            let antispice_amount = Decimal.pow(
                10,
                game.antispice[3].log(10) ** 0.75
            )
            if (game.collapse_challenge !== 0) {
                document.getElementById("green_antispice_boost").innerHTML =
                    "Your green antispice is boosting green spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 3 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>making crystal infusions and arcane enchantments " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 7.5,
                        game.notation
                    ) +
                    "% stronger,<br>and making fourth generators " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 3,
                        game.notation
                    ) +
                    "% stronger"
            } else {
                document.getElementById("green_antispice_boost").innerHTML =
                    "Your green antispice is boosting green spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 6 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>making crystal infusions and arcane enchantments " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 15,
                        game.notation
                    ) +
                    "% stronger,<br>and making fourth generators " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 6,
                        game.notation
                    ) +
                    "% stronger"
            }
        }
    } else {
        document.getElementById("green_antispice_block").style.display = "none"
    }
}

//graphics updates for research
function research_update() {
    for (const r of research.researches) {
        let button = research_map.get(r)
        let button2 = research_map2.get(r)

        if (game.research_complete[r.id] >= 1) {
            if (!r.repeat || (r.id === 0 && game.research_complete[0] === 40)) {
                button.style.display = "none"
                button2.style.display = "block"

                if (game.research_view === r.id + 1) {
                    if (r.special) {
                        button2.className = "research_button r_special r_view"
                    } else {
                        button2.className = "research_button r_view"
                    }
                } else {
                    if (r.special) {
                        button2.className = "research_button r_special"
                    } else {
                        button2.className = "research_button"
                    }
                }
            } else {
                button.style.display = "block"
                button2.style.display = "none"

                if (
                    game.research_view === r.id + 1 &&
                    game.research_select === r.id + 1
                ) {
                    button.className = "research_button r_repeat r_active"
                } else if (game.research_view === r.id + 1) {
                    button.className = "research_button r_repeat r_view"
                } else if (game.research_select === r.id + 1) {
                    button.className = "research_button r_repeat r_select"
                } else {
                    button.className = "research_button r_repeat"
                }
            }
        } else {
            if (r.req === undefined) button.style.display = "block"
            else {
                if (r.req >= 0) {
                    if (game.research_complete[r.req]) {
                        button.style.display = "block"
                    } else {
                        button.style.display = "none"
                    }
                } else {
                    let challenge = Math.floor(r.req / -100) - 7
                    let completion = -r.req % 100

                    if (game.collapse_complete[challenge] >= completion) {
                        button.style.display = "block"
                    } else {
                        button.style.display = "none"
                    }
                }
            }
            button2.style.display = "none"

            if (
                game.research_view === r.id + 1 &&
                game.research_select === r.id + 1
            ) {
                button.className = "research_button r_active"
            } else if (game.research_view === r.id + 1) {
                button.className = "research_button r_view"
            } else if (game.research_select === r.id + 1) {
                button.className = "research_button r_select"
            } else {
                button.className = "research_button"
            }
        }

        switch (r.id) {
            case 0:
                r.desc =
                    "The half-life of unstable spice becomes 33% shorter<br>Current unstable spice half-life: " +
                    format_time_long(game.halflife, 0, true)
                break
            case 3:
                if (game.research_complete[3] === 0)
                    r.desc =
                        "Rune power is produced " +
                        format_small(5) +
                        "x faster<br>Current rune power production boost: " +
                        format_small(1) +
                        "x"
                else if (game.research_complete[3] < 4)
                    r.desc =
                        "Rune power is produced " +
                        format_small(4) +
                        "x faster<br>Current rune power production boost: " +
                        format_num(
                            5 * 4 ** (game.research_complete[3] - 1),
                            game.notation
                        ) +
                        "x"
                else if (game.research_complete[3] < 12)
                    r.desc =
                        "Rune power is produced " +
                        format_small(3) +
                        "x faster<br>Current rune power production boost: " +
                        format_num(
                            320 * 3 ** (game.research_complete[3] - 4),
                            game.notation
                        ) +
                        "x"
                else
                    r.desc =
                        "Rune power is produced " +
                        format_small(2) +
                        "x faster<br>Current rune power production boost: " +
                        format_num(
                            2099520 * 2 ** (game.research_complete[3] - 12),
                            game.notation
                        ) +
                        "x"
                break
            case 5:
                let rune_amount = Decimal.pow(
                    1.2,
                    (game.total_rune_power / 10 ** 28) ** 0.2
                ).mul(game.total_rune_power ** 0.5 / (5 * 10 ** 12) + 1)
                if (rune_amount.cmp(Decimal.pow(10, 50)) >= 0)
                    rune_amount = Decimal.pow(
                        10,
                        rune_amount.div(Decimal.pow(10, 50)).log(10) ** 0.5 + 50
                    )
                r.desc =
                    "Atomic spice gains are additionally boosted by total rune power produced<br>Current boost: " +
                    format_idec(rune_amount, game.notation) +
                    "x"
                if (rune_amount.cmp(Decimal.pow(10, 100)) >= 0)
                    r.desc =
                        "Atomic spice gains are additionally boosted by total rune power produced<br>Current boost: Capped at " +
                        format_idec(Decimal.pow(10, 100), game.notation) +
                        "x"
                if (game.collapse_challenge !== 0) {
                    r.desc =
                        "Atomic spice gains are additionally boosted by total rune power produced<br>Disabled in Collapse Challenges"
                }
                break
            case 7:
                if (game.research_complete[7] < 4)
                    r.desc =
                        "Atomic spice conversion is 10% more efficient<br>Current atomic spice efficiency: " +
                        format_small(Math.round(game.atomic_efficiency * 100)) +
                        "%"
                else
                    r.desc =
                        "Atomic spice conversion is 5% more efficient<br>Current atomic spice efficiency: " +
                        format_small(Math.round(game.atomic_efficiency * 100)) +
                        "%"
                break
            case 10:
                r.desc =
                    "Ansuz rune gains from Ascension are boosted by Times Collapsed stat<br>Current boost: " +
                    format_dec(
                        Math.log2((game.collapse + 25) / 25) ** 2 * 6.27 + 1,
                        game.notation
                    ) +
                    "x"
                break
            case 15:
                r.desc = "Unlocks automation for Collapse"
                if (game.collapse_challenge !== 0) {
                    r.desc =
                        "Unlocks automation for Collapse<br>Disabled in Collapse Challenges"
                }
                break
            case 17:
                if (game.atomic_spice.cmp(1) >= 0) {
                    let amount = game.atomic_spice.log(10) * 0.06666

                    if (amount > 400) {
                        r.desc =
                            "Unspent atomic spice makes the unstable spice decay boost stronger<br>The boost is currently capped at " +
                            format_dec(200, game.notation) +
                            "% stronger"
                    } else if (amount > 100) {
                        r.desc =
                            "Unspent atomic spice makes the unstable spice decay boost stronger<br>The boost is currently " +
                            format_dec(
                                (amount - 100) / 3 + 100,
                                game.notation
                            ) +
                            "% stronger"
                    } else {
                        r.desc =
                            "Unspent atomic spice makes the unstable spice decay boost stronger<br>The boost is currently " +
                            format_dec(amount, game.notation) +
                            "% stronger"
                    }
                } else
                    r.desc =
                        "Unspent atomic spice makes the unstable spice decay boost stronger<br>The boost is currently " +
                        format_dec(0, game.notation) +
                        "% stronger"
                break
            case 22:
                let total_completions = 0
                for (let i = 0; i < 6; i++) {
                    total_completions += game.collapse_complete[i]
                }
                r.desc =
                    "You gain " +
                    format_small(888) +
                    "x more atomic spice for every Collapse challenge completion<br>Current boost: " +
                    format_idec(
                        Decimal.pow(888, total_completions),
                        game.notation
                    ) +
                    "x"
                if (game.collapse_challenge !== 0) {
                    r.desc =
                        "You gain " +
                        format_small(888) +
                        "x more atomic spice for every Collapse challenge completion<br>Disabled in Collapse Challenges"
                }
                break
        }
    }

    if (game.research_complete[1] >= 1) {
        document.getElementById("research_completed_block").style.display =
            "block"
    } else {
        document.getElementById("research_completed_block").style.display =
            "none"
    }

    if (game.research_view === 0) {
        document.getElementById("research_main_block").style.display = "none"
    } else {
        document.getElementById("research_main_block").style.display = "block"

        let r = game.research_view - 1

        let rate = 1
        if (game.data_boosts >= 1) rate = 2 * 1.5 ** (game.data_boosts - 1)
        let goal = 0
        if (!research.researches[r].repeat) {
            goal = research.researches[r].data
        }
        if (research.researches[r].repeat) {
            if (game.research_complete[r] === 0) {
                goal = research.researches[r].data
            } else if (game.research_complete[r] < 4) {
                goal =
                    Math.ceil(
                        (research.researches[r].data *
                            research.researches[r].factor **
                                game.research_complete[r]) /
                            research.researches[r].unit
                    ) * research.researches[r].unit
            } else {
                goal =
                    Math.ceil(
                        (research.researches[r].data *
                            research.researches[r].factor ** 3 *
                            research.researches[r].factor2 **
                                (game.research_complete[r] - 3)) /
                            research.researches[r].unit
                    ) * research.researches[r].unit

                if (r === 7 && game.research_complete[r] >= 8) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (4 +
                                        ((game.research_complete[r] - 7) *
                                            (game.research_complete[r] - 6)) /
                                            2)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }

                if (r === 0 && game.research_complete[r] >= 27) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (game.research_complete[r] * 3 - 53)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }
                if (r === 0 && game.research_complete[r] === 40) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 ** 64) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }
                if (r === 3 && game.research_complete[r] >= 19) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (game.research_complete[r] * 3 - 37)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }
            }
        }

        document.getElementById("research_number").innerHTML =
            "Research #" + game.research_view

        let times_researched = ""
        if (
            research.researches[game.research_view - 1].repeat > 0 &&
            game.research_complete[game.research_view - 1] >= 1
        ) {
            if (game.research_view === 1 && game.research_complete[0] === 40) {
                times_researched =
                    "<br><br>This research has been researched a maximum of " +
                    format_small(40) +
                    " times"
            } else {
                times_researched =
                    "<br><br>This research has been researched " +
                    format_small(
                        game.research_complete[game.research_view - 1]
                    ) +
                    " times"
            }
        }
        if (game.research_select === game.research_view) {
            document.getElementById("research_info").innerHTML =
                research.researches[r].desc +
                "<br><br>Data on this research: " +
                format_num(Math.floor(game.data[r]), game.notation) +
                " / " +
                format_num(goal, game.notation) +
                "<br>Estimated time to completion: " +
                format_time_long((goal - game.data[r]) / rate) +
                times_researched
        } else {
            document.getElementById("research_info").innerHTML =
                research.researches[r].desc +
                "<br><br>Data on this research: " +
                format_num(Math.floor(game.data[r]), game.notation) +
                " / " +
                format_num(goal, game.notation) +
                times_researched

            document.getElementById("research_progress").className = "r_off"
        }

        document.getElementById("research_progress").style.width =
            (game.data[r] * 100) / goal + "%"

        if (game.research_pause) {
            document.getElementById("research_toggle").style.display = "block"
            document.getElementById("research_toggle").className =
                "research_toggle r_begin"

            document.getElementById("research_progress").style.display = "block"
            document.getElementById("research_back").style.display = "block"
            document.getElementById("research_toggle").style.width = "auto"

            if (game.data[r] > 0) {
                document.getElementById("research_toggle").innerHTML =
                    "Resume&nbsp;Research"

                document.getElementById("research_progress").className = "r_off"

                if (
                    (game.research_complete[r] === 1 &&
                        !research.researches[r].repeat) ||
                    (r === 0 && game.research_complete[0] === 40)
                ) {
                    document.getElementById("research_toggle").className =
                        "research_toggle r_done"
                    document.getElementById("research_toggle").innerHTML =
                        "Research&nbsp;Completed"

                    document.getElementById("research_progress").style.display =
                        "none"
                    document.getElementById("research_back").style.display =
                        "none"
                    document.getElementById("research_toggle").style.width =
                        "100%"
                }
            } else {
                if (
                    research.researches[r].repeat &&
                    game.research_complete[r] > 0
                ) {
                    document.getElementById("research_toggle").innerHTML =
                        "Continue&nbsp;Research"

                    document.getElementById("research_progress").className =
                        "r_off"

                    if (r === 0 && game.research_complete[0] === 40) {
                        document.getElementById("research_toggle").className =
                            "research_toggle r_done"
                        document.getElementById("research_toggle").innerHTML =
                            "Research&nbsp;Completed"

                        document.getElementById(
                            "research_progress"
                        ).style.display = "none"
                        document.getElementById("research_back").style.display =
                            "none"
                        document.getElementById("research_toggle").style.width =
                            "100%"
                    }
                } else {
                    if (game.research_complete[r] === 1) {
                        document.getElementById("research_toggle").className =
                            "research_toggle r_done"
                        document.getElementById("research_toggle").innerHTML =
                            "Research&nbsp;Completed"

                        document.getElementById(
                            "research_progress"
                        ).style.display = "none"
                        document.getElementById("research_back").style.display =
                            "none"
                        document.getElementById("research_toggle").style.width =
                            "100%"
                    } else {
                        document.getElementById("research_toggle").innerHTML =
                            "Begin&nbsp;Research"
                    }
                }
            }
        } else {
            document.getElementById("research_progress").style.display = "block"
            document.getElementById("research_back").style.display = "block"
            document.getElementById("research_toggle").style.width = "auto"

            if (game.research_select === game.research_view) {
                document.getElementById("research_toggle").style.display =
                    "block"
                document.getElementById("research_toggle").className =
                    "research_toggle r_pause"
                document.getElementById("research_toggle").innerHTML =
                    "Pause&nbsp;Research"

                document.getElementById("research_progress").className = "r_on"
            } else {
                document.getElementById("research_toggle").style.display =
                    "none"

                document.getElementById("research_progress").className = "r_off"

                if (
                    (game.research_complete[r] === 1 &&
                        !research.researches[r].repeat) ||
                    (r === 0 && game.research_complete[0] === 40)
                ) {
                    document.getElementById("research_toggle").style.display =
                        "block"
                    document.getElementById("research_toggle").className =
                        "research_toggle r_done"
                    document.getElementById("research_toggle").innerHTML =
                        "Research&nbsp;Completed"

                    document.getElementById("research_progress").style.display =
                        "none"
                    document.getElementById("research_back").style.display =
                        "none"
                    document.getElementById("research_toggle").style.width =
                        "100%"
                }
            }
        }

        document.getElementById("research_boost").innerHTML =
            "When researching, you gain " +
            format_dec(rate, game.notation) +
            " data/sec"
        if (game.gamespeed !== 1) {
            document.getElementById("research_boost").innerHTML =
                "When researching, you gain " +
                format_dec(rate, game.notation) +
                " data/sec, unaffected by game speed boosts"
        }

        document.getElementById("research_cost").innerHTML =
            "-" +
            format_inum(
                Decimal.pow(
                    game.data_boosts + Math.PI / 2,
                    game.data_boosts ** ((game.data_boosts + 1) ** 0.09)
                )
                    .mul(16384)
                    .round(),
                game.notation
            ) +
            " atomic spice"
        if (
            game.atomic_spice.cmp(
                Decimal.pow(
                    game.data_boosts + Math.PI / 2,
                    game.data_boosts ** ((game.data_boosts + 1) ** 0.09)
                )
                    .mul(16384)
                    .round()
            ) >= 0
        )
            document.getElementById("research_cost").className = "atomic_cost"
        else document.getElementById("research_cost").className = "empty_cost"
    }
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

    if (game.collapse_challenge === 10 && game.color_boosts >= 4)
        stats_str +=
            "<br>You have done " +
            format_small(game.color_boosts) +
            " color augments."
    else if (game.color_boosts >= 2000000)
        stats_str +=
            "<br>You have done " +
            format_small(game.color_boosts) +
            " color augments."
    else if (game.color_boosts >= 4)
        stats_str +=
            "<br>You have done " +
            format_small(game.color_boosts) +
            " color boosts."
    else if (game.color_boosts >= 1)
        stats_str +=
            "<br>You have done " +
            format_small(game.color_boosts) +
            " color shifts."

    if (game.prestige >= 1 || game.ascend >= 1 || game.collapse >= 1) {
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

        if (game.gamespeed !== 1) {
            if (game.collapse_challenge === 9)
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(
                        game.prestige_time_played,
                        game.notation,
                        true
                    ) +
                    " in this Prestige (game time)."
            else
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(game.prestige_time_played, game.notation) +
                    " in this Prestige (game time)."

            stats_str +=
                "<br>You have spent " +
                format_time_long(game.real_time_played[1], game.notation) +
                " in this Prestige (real time)."
        } else
            stats_str +=
                "<br><br>You have spent " +
                format_time_long(game.prestige_time_played, game.notation) +
                " in this Prestige."
    }

    if (game.ascend >= 1 || game.collapse >= 1) {
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
                " mg arcane spice."

        if (game.gamespeed !== 1) {
            if (game.collapse_challenge === 9)
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(
                        game.ascend_time_played,
                        game.notation,
                        true
                    ) +
                    " in this Ascension (game time)."
            else
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(game.ascend_time_played, game.notation) +
                    " in this Ascension (game time)."

            stats_str +=
                "<br>You have spent " +
                format_time_long(game.real_time_played[2], game.notation) +
                " in this Ascension (real time)."
        } else
            stats_str +=
                "<br><br>You have spent " +
                format_time_long(game.ascend_time_played, game.notation) +
                " in this Ascension."
    }

    if (game.collapse >= 1) {
        if (game.collapse === 1)
            stats_str +=
                "<br><br><br>You have Collapsed " + format_small(1) + " time."
        else
            stats_str +=
                "<br><br><br>You have Collapsed " +
                format_small(game.collapse) +
                " times."

        stats_str +=
            "<br>You have " +
            format_inum(game.atomic_spice, game.notation) +
            " atomic spice."
        stats_str +=
            "<br>You have created a total of " +
            format_inum(game.total_unstable_spice, game.notation) +
            " unstable spice."

        stats_str +=
            "<br>You have accumulated a total of " +
            format_idec(game.collapse_spice, game.notation) +
            " g spice in this Collapse."

        if (game.gamespeed !== 1) {
            if (game.collapse_challenge === 9)
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(
                        game.collapse_time_played,
                        game.notation,
                        true
                    ) +
                    " in this Collapse (game time)."
            else
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(game.collapse_time_played, game.notation) +
                    " in this Collapse (game time)."

            stats_str +=
                "<br>You have spent " +
                format_time_long(game.real_time_played[3], game.notation) +
                " in this Collapse (real time)."
        } else
            stats_str +=
                "<br><br>You have spent " +
                format_time_long(game.collapse_time_played, game.notation) +
                " in this Collapse."
    }

    if (game.total_time_played !== game.real_time_played[0]) {
        if (game.gamespeed > 1)
            stats_str +=
                "<br><br><br>You have played for a total of " +
                format_time_long(game.total_time_played, game.notation) +
                " (game time).<br>The game is currently running " +
                format_small(game.gamespeed) +
                "x faster.<br><br>You have played for a total of " +
                format_time_long(game.real_time_played[0], game.notation) +
                " (real time)."
        else
            stats_str +=
                "<br><br><br>You have played for a total of " +
                format_time_long(game.total_time_played, game.notation) +
                " (game time).<br>The game is currently running " +
                format_small(1 / game.gamespeed) +
                "x slower.<br><br>You have played for a total of " +
                format_time_long(game.real_time_played[0], game.notation) +
                " (real time)."
    } else
        stats_str +=
            "<br><br><br>You have played for a total of " +
            format_time_long(game.total_time_played, game.notation) +
            "."

    document.getElementById("statistics_text").innerHTML = stats_str

    if (game.prestige >= 1 || game.ascend >= 1 || game.collapse >= 1)
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
                    format_time(game.prestige_time_history[i], 0, true) +
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
                    format_time(game.prestige_time_history[i], 0, true) +
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

    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    if (game.ascend >= 1 || game.collapse >= 1) {
        document.getElementById("past_ascensions").innerHTML =
            "PAST&nbsp;ASCENSIONS"
        if (mobile)
            document.getElementById("past_ascensions").innerHTML = "ASCENSIONS"
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
                    format_time(game.ascend_time_history[i], 0, true) +
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
                    format_time(game.ascend_time_history[i], 0, true) +
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

    if (game.collapse >= 1) {
        document.getElementById("past_collapses").innerHTML =
            "PAST&nbsp;COLLAPSES"
        if (mobile)
            document.getElementById("past_collapses").innerHTML = "COLLAPSES"
        if (game.subtab[2] === 3)
            document.getElementById("past_collapses").className =
                "subtab selected"
        else
            document.getElementById("past_collapses").className =
                "subtab unlocked"
    } else {
        document.getElementById("past_collapses").innerHTML = "LOCKED"
        document.getElementById("past_collapses").className = "subtab locked"
    }

    stats_str = "Last 10 Collapses:"
    entries = 0
    average = new Decimal(0)

    for (let i = 0; i < 10; i++) {
        if (game.collapse_time_history[i] === -1) {
            stats_str += "<br>#" + (i + 1) + " (no data)"
        } else {
            entries++
            average = average.add(
                game.collapse_amount_history[i].div(
                    game.collapse_time_history[i]
                )
            )
            if (
                game.collapse_amount_history[i]
                    .mul(60 / game.collapse_time_history[i])
                    .cmp(1) >= 0
            )
                stats_str +=
                    "<br>#" +
                    (i + 1) +
                    " took " +
                    format_time(game.collapse_time_history[i], 0, true) +
                    " and gave " +
                    format_inum(
                        game.collapse_amount_history[i],
                        game.notation
                    ) +
                    " atomic spice. +" +
                    format_idec(
                        game.collapse_amount_history[i].mul(
                            60 / game.collapse_time_history[i]
                        ),
                        game.notation
                    ) +
                    " atomic spice/min"
            else
                stats_str +=
                    "<br>#" +
                    (i + 1) +
                    " took " +
                    format_time(game.collapse_time_history[i], 0, true) +
                    " and gave " +
                    format_inum(
                        game.collapse_amount_history[i],
                        game.notation
                    ) +
                    " atomic spice. +" +
                    format_idec(
                        game.collapse_amount_history[i].mul(
                            3600 / game.collapse_time_history[i]
                        ),
                        game.notation
                    ) +
                    " atomic spice/hour"
        }
    }

    if (entries > 0) {
        average = average.div(entries)
        if (average.mul(60).cmp(1) >= 0)
            stats_str +=
                "<br><br>Average atomic spice gain: +" +
                format_idec(average.mul(60), game.notation) +
                " atomic/min"
        else
            stats_str +=
                "<br><br>Average atomic spice gain: +" +
                format_idec(average.mul(3600), game.notation) +
                " atomic/hour"
    } else {
        stats_str += "<br><br>Average atomic spice gain: undefined"
    }

    document.getElementById("collapse_statistics_text").innerHTML = stats_str
}
