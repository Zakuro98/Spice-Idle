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

    if (game.collapse_challenge === 11) {
        document.getElementById("ascension").style.display = "none"
    } else {
        document.getElementById("ascension").style.display = "block"
    }
}

//graphics updates for spice generators
function spice_update() {
    let spice_unit = " g"
    if (game.notation === 14) spice_unit = ""

    let antispice_power = 1
    if (game.antispice[1].cmp(1) >= 0) {
        antispice_power =
            1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
        if (game.collapse_challenge !== 0)
            antispice_power =
                1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075
    }

    document.getElementById("red_spice_num").innerHTML =
        format_idec(game.red_spice, game.notation) + spice_unit

    let effective_red_spice = game.highest_red_spice
    if (game.highest_red_spice.cmp(Decimal.pow(10, 1e12)) >= 0)
        effective_red_spice = Decimal.pow(
            10,
            1e12 * (game.highest_red_spice.log(10) / 1e12) ** 0.5
        )

    let synergy_str = ""
    if (
        game.prestige_bought[11] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        synergy_str =
            "<br><br>Red spice synergies:<br>Yellow, green, blue & pink spice production " +
            format_idec(
                Decimal.max(effective_red_spice.pow(0.005).add(1), 1),
                game.notation
            ) +
            "x"

        if (game.ascend_bought[0]) {
            synergy_str =
                "<br><br>Red spice synergies:<br>Yellow, green, blue & pink spice production " +
                format_idec(
                    Decimal.max(
                        effective_red_spice
                            .pow(0.01)
                            .add(1)
                            .pow(antispice_power),
                        1
                    ),
                    game.notation
                ) +
                "x"
        }

        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[11] === 0
        ) {
            synergy_str =
                "<br><br>Red spice synergies:<br>Yellow, green, blue & pink spice production " +
                format_dec(1, game.notation) +
                "x"
        }
    }
    if (game.ascend_bought[18] || game.collapse >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[18]
        ) {
            synergy_str +=
                "<br>Crystallized spice production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            synergy_str +=
                "<br>Crystallized spice production " +
                format_idec(
                    Decimal.max(
                        effective_red_spice
                            .pow(0.00005)
                            .add(1)
                            .pow(antispice_power),
                        1
                    ),
                    game.notation
                ) +
                "x"
        }
    }
    if (game.ascend_bought[30] || game.collapse >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[30]
        ) {
            synergy_str +=
                "<br>Arcane spice production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            synergy_str +=
                "<br>Arcane spice production " +
                format_idec(
                    Decimal.max(
                        effective_red_spice
                            .pow(0.0000000825)
                            .add(1)
                            .pow(antispice_power),
                        1
                    ),
                    game.notation
                ) +
                "x"
        }
    }

    let limit_str = ""
    if (game.limit_active) {
        limit_str =
            "<br><br>You have exhausted all available resources in this realm...<br>There is no more room for your empire here<br><span class='bold'>After " +
            format_idec(game.realm_limit, game.notation) +
            spice_unit +
            " red spice, all spice production multipliers will be heavily reduced</span>"
    }

    document.getElementById("red_spice_up").innerHTML =
        "+" +
        format_idec(
            game.red_spice_gen[0].floor().mul(game.total_red_spice_boost[0]),
            game.notation
        ) +
        spice_unit +
        " red spice/sec" +
        synergy_str +
        limit_str
    if (
        game.red_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    )
        document.getElementById("red_spice_up").innerHTML =
            "+" +
            format_idec(
                game.red_spice_gen[0]
                    .floor()
                    .mul(game.total_red_spice_boost[0]),
                game.notation
            ) +
            spice_unit +
            " red spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten red spice generators purchased, that generator's boost increases by 1"

    document.getElementById("yellow_spice_num").innerHTML =
        format_idec(game.yellow_spice, game.notation) + spice_unit

    synergy_str = ""
    if (
        game.prestige_bought[8] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        synergy_str =
            "<br><br>Yellow spice synergies:<br>Red spice production " +
            format_idec(
                Decimal.max(
                    game.highest_yellow_spice
                        .pow(0.075)
                        .add(1)
                        .pow(antispice_power),
                    1
                ),
                game.notation
            ) +
            "x"

        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[8] === 0
        ) {
            synergy_str =
                "<br><br>Yellow spice synergies:<br>Red spice production " +
                format_dec(1, game.notation) +
                "x"
        }
    }

    document.getElementById("yellow_spice_up").innerHTML =
        "+" +
        format_idec(
            game.yellow_spice_gen[0]
                .floor()
                .mul(game.total_yellow_spice_boost[0]),
            game.notation
        ) +
        spice_unit +
        " yellow spice/sec" +
        synergy_str +
        limit_str
    if (
        game.yellow_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    )
        document.getElementById("yellow_spice_up").innerHTML =
            "+" +
            format_idec(
                game.yellow_spice_gen[0]
                    .floor()
                    .mul(game.total_yellow_spice_boost[0]),
                game.notation
            ) +
            spice_unit +
            " yellow spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten yellow spice generators purchased, that generator's boost increases by 1"

    document.getElementById("green_spice_num").innerHTML =
        format_idec(game.green_spice, game.notation) + spice_unit

    synergy_str = ""
    if (
        game.prestige_bought[8] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        synergy_str =
            "<br><br>Green spice synergies:<br>Yellow spice production " +
            format_idec(
                Decimal.max(
                    game.highest_green_spice
                        .pow(0.075)
                        .add(1)
                        .pow(antispice_power),
                    1
                ),
                game.notation
            ) +
            "x"

        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[8] === 0
        ) {
            synergy_str =
                "<br><br>Green spice synergies:<br>Yellow spice production " +
                format_dec(1, game.notation) +
                "x"
        }
    }

    document.getElementById("green_spice_up").innerHTML =
        "+" +
        format_idec(
            game.green_spice_gen[0]
                .floor()
                .mul(game.total_green_spice_boost[0]),
            game.notation
        ) +
        spice_unit +
        " green spice/sec" +
        synergy_str +
        limit_str
    if (
        game.green_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    )
        document.getElementById("green_spice_up").innerHTML =
            "+" +
            format_idec(
                game.green_spice_gen[0]
                    .floor()
                    .mul(game.total_green_spice_boost[0]),
                game.notation
            ) +
            spice_unit +
            " green spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten green spice generators purchased, that generator's boost increases by 1"

    document.getElementById("blue_spice_num").innerHTML =
        format_idec(game.blue_spice, game.notation) + spice_unit

    synergy_str = ""
    if (
        game.prestige_bought[8] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        synergy_str =
            "<br><br>Blue spice synergies:<br>Green spice production " +
            format_idec(
                Decimal.max(
                    game.highest_blue_spice
                        .pow(0.075)
                        .add(1)
                        .pow(antispice_power),
                    1
                ),
                game.notation
            ) +
            "x"

        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[8] === 0
        ) {
            synergy_str =
                "<br><br>Blue spice synergies:<br>Green spice production " +
                format_dec(1, game.notation) +
                "x"
        }
    }

    document.getElementById("blue_spice_up").innerHTML =
        "+" +
        format_idec(
            game.blue_spice_gen[0].floor().mul(game.total_blue_spice_boost[0]),
            game.notation
        ) +
        spice_unit +
        " blue spice/sec" +
        synergy_str +
        limit_str
    if (
        game.blue_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    )
        document.getElementById("blue_spice_up").innerHTML =
            "+" +
            format_idec(
                game.blue_spice_gen[0]
                    .floor()
                    .mul(game.total_blue_spice_boost[0]),
                game.notation
            ) +
            spice_unit +
            " blue spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten blue spice generators purchased, that generator's boost increases by 1"

    document.getElementById("pink_spice_num").innerHTML =
        format_idec(game.pink_spice, game.notation) + spice_unit

    synergy_str = ""
    if (
        game.prestige_bought[8] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        synergy_str =
            "<br><br>Pink spice synergies:<br>Blue spice production " +
            format_idec(
                Decimal.max(
                    game.highest_pink_spice
                        .pow(0.075)
                        .add(1)
                        .pow(antispice_power),
                    1
                ),
                game.notation
            ) +
            "x"

        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[8] === 0
        ) {
            synergy_str =
                "<br><br>Pink spice synergies:<br>Blue spice production " +
                format_dec(1, game.notation) +
                "x"
        }
    }
    if (game.ascend_bought[13] || game.collapse >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[13]
        ) {
            synergy_str +=
                "<br>Crystallized spice production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            let effective_pink_spice = game.highest_pink_spice
            if (game.highest_pink_spice.cmp(Decimal.pow(10, 2.5e11)) >= 0)
                effective_pink_spice = Decimal.pow(
                    10,
                    2.5 *
                        1e11 *
                        (game.highest_pink_spice.log(10) / 2.5e11) ** 0.5
                )

            synergy_str +=
                "<br>Crystallized spice production " +
                format_idec(
                    Decimal.max(
                        effective_pink_spice
                            .pow(0.00016)
                            .add(1)
                            .pow(antispice_power),
                        1
                    ),
                    game.notation
                ) +
                "x"
        }
    }

    document.getElementById("pink_spice_up").innerHTML =
        "+" +
        format_idec(
            game.pink_spice_gen[0].floor().mul(game.total_pink_spice_boost[0]),
            game.notation
        ) +
        spice_unit +
        " pink spice/sec" +
        synergy_str +
        limit_str
    if (
        game.pink_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    )
        document.getElementById("pink_spice_up").innerHTML =
            "+" +
            format_idec(
                game.pink_spice_gen[0]
                    .floor()
                    .mul(game.total_pink_spice_boost[0]),
                game.notation
            ) +
            spice_unit +
            " pink spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten pink spice generators purchased, that generator's multiplier increases by 1"

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
                            .cmp(
                                new Decimal(
                                    game.red_spice_bought[gen.id].toString()
                                )
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
                            new Decimal(
                                game.red_spice_bought[gen.id].toString()
                            )
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
                        info_str += spice_unit + " red spice/sec"
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
                    spice_unit +
                    " red spice"
                if (game.red_spice.cmp(game.red_spice_price[gen.id]) >= 0) {
                    document.getElementById("red_cost" + gen.id).className =
                        "red_cost"
                    document.getElementById("red_buy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("red_cost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("red_buy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("red_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("red_buy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("red_buy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("red_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("red_buy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "red_buy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "red_buy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("red_buy" + gen.id).style.width =
                        "auto"
                }

                n = 10n - (game.red_spice_bought[gen.id] % 10n)
                price = game.red_spice_price[gen.id]
                    .mul(1 - 1.2 ** n.toString())
                    .div(-0.2)
                document.getElementById("red_ucost" + gen.id).innerHTML =
                    "-" +
                    format_idec(price, game.notation) +
                    spice_unit +
                    " red spice"
                if (game.red_spice.cmp(price) >= 0) {
                    document.getElementById("red_ucost" + gen.id).className =
                        "red_cost"
                    document.getElementById("red_ubuy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("red_ucost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("red_ubuy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("red_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("red_ubuy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("red_ubuy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("red_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("red_ubuy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "red_ubuy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "red_ubuy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("red_buy" + gen.id).style.width =
                        "auto"
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
                                new Decimal(
                                    game.yellow_spice_bought[gen.id].toString()
                                )
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
                            new Decimal(
                                game.yellow_spice_bought[gen.id].toString()
                            )
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
                        info_str += spice_unit + " yellow spice/sec"
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
                        else if (game.ascend >= 1 || game.collapse >= 1)
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
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
                    spice_unit +
                    " yellow spice"
                if (
                    game.yellow_spice.cmp(game.yellow_spice_price[gen.id]) >= 0
                ) {
                    document.getElementById("yellow_cost" + gen.id).className =
                        "yellow_cost"
                    document.getElementById("yellow_buy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("yellow_cost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("yellow_buy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("yellow_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "yellow_buy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("yellow_buy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("yellow_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "yellow_buy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "yellow_buy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "yellow_buy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("yellow_buy" + gen.id).style.width =
                        "auto"
                }

                n = 10n - (game.yellow_spice_bought[gen.id] % 10n)
                price = game.yellow_spice_price[gen.id]
                    .mul(1 - 1.3 ** n.toString())
                    .div(-0.3)
                document.getElementById("yellow_ucost" + gen.id).innerHTML =
                    "-" +
                    format_idec(price, game.notation) +
                    spice_unit +
                    " yellow spice"
                if (game.yellow_spice.cmp(price) >= 0) {
                    document.getElementById("yellow_ucost" + gen.id).className =
                        "yellow_cost"
                    document.getElementById("yellow_ubuy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("yellow_ucost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("yellow_ubuy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("yellow_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "yellow_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById(
                        "yellow_ubuy" + gen.id
                    ).style.width = "auto"

                    let width2 =
                        (document.getElementById("yellow_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "yellow_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "yellow_ubuy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "yellow_ubuy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById(
                        "yellow_ubuy" + gen.id
                    ).style.width = "auto"
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
                                new Decimal(
                                    game.green_spice_bought[gen.id].toString()
                                )
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
                            new Decimal(
                                game.green_spice_bought[gen.id].toString()
                            )
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
                        info_str += spice_unit + " green spice/sec"
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
                        else if (game.ascend >= 1 || game.collapse >= 1)
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
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
                    spice_unit +
                    " green spice"
                if (game.green_spice.cmp(game.green_spice_price[gen.id]) >= 0) {
                    document.getElementById("green_cost" + gen.id).className =
                        "green_cost"
                    document.getElementById("green_buy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("green_cost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("green_buy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("green_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "green_buy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("green_buy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("green_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "green_buy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "green_buy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "green_buy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("green_buy" + gen.id).style.width =
                        "auto"
                }

                n = 10n - (game.green_spice_bought[gen.id] % 10n)
                price = game.green_spice_price[gen.id]
                    .mul(1 - 1.4 ** n.toString())
                    .div(-0.4)
                document.getElementById("green_ucost" + gen.id).innerHTML =
                    "-" +
                    format_idec(price, game.notation) +
                    spice_unit +
                    " green spice"
                if (game.green_spice.cmp(price) >= 0) {
                    document.getElementById("green_ucost" + gen.id).className =
                        "green_cost"
                    document.getElementById("green_ubuy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("green_ucost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("green_ubuy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("green_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "green_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("green_ubuy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("green_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "green_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "green_ubuy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "green_ubuy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("green_ubuy" + gen.id).style.width =
                        "auto"
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
                                new Decimal(
                                    game.blue_spice_bought[gen.id].toString()
                                )
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
                            new Decimal(
                                game.blue_spice_bought[gen.id].toString()
                            )
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
                        info_str += spice_unit + " blue spice/sec"
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
                        else if (game.ascend >= 1 || game.collapse >= 1)
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
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
                    spice_unit +
                    " blue spice"
                if (game.blue_spice.cmp(game.blue_spice_price[gen.id]) >= 0) {
                    document.getElementById("blue_cost" + gen.id).className =
                        "blue_cost"
                    document.getElementById("blue_buy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("blue_cost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("blue_buy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("blue_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("blue_buy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("blue_buy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("blue_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("blue_buy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "blue_buy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "blue_buy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("blue_buy" + gen.id).style.width =
                        "auto"
                }

                n = 10n - (game.blue_spice_bought[gen.id] % 10n)
                price = game.blue_spice_price[gen.id]
                    .mul(1 - 1.5 ** n.toString())
                    .div(-0.5)
                document.getElementById("blue_ucost" + gen.id).innerHTML =
                    "-" +
                    format_idec(price, game.notation) +
                    spice_unit +
                    " blue spice"
                if (game.blue_spice.cmp(price) >= 0) {
                    document.getElementById("blue_ucost" + gen.id).className =
                        "blue_cost"
                    document.getElementById("blue_ubuy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("blue_ucost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("blue_ubuy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("blue_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "blue_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("blue_ubuy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("blue_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "blue_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "blue_ubuy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "blue_ubuy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("blue_ubuy" + gen.id).style.width =
                        "auto"
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
                                new Decimal(
                                    game.pink_spice_bought[gen.id].toString()
                                )
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
                                    new Decimal(
                                        game.pink_spice_bought[
                                            gen.id
                                        ].toString()
                                    )
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
                            new Decimal(
                                game.pink_spice_bought[gen.id].toString()
                            )
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
                        info_str += spice_unit + " pink spice/sec"
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
                        else if (game.ascend >= 1 || game.collapse >= 1)
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
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
                                new Decimal(
                                    game.pink_spice_bought[gen.id].toString()
                                )
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
                    spice_unit +
                    " pink spice"
                if (game.pink_spice.cmp(game.pink_spice_price[gen.id]) >= 0) {
                    document.getElementById("pink_cost" + gen.id).className =
                        "pink_cost"
                    document.getElementById("pink_buy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("pink_cost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("pink_buy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("pink_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("pink_buy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("pink_buy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("pink_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("pink_buy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "pink_buy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "pink_buy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("pink_buy" + gen.id).style.width =
                        "auto"
                }

                n = 10n - (game.pink_spice_bought[gen.id] % 10n)
                price = game.pink_spice_price[gen.id]
                    .mul(1 - 1.6 ** n.toString())
                    .div(-0.6)
                document.getElementById("pink_ucost" + gen.id).innerHTML =
                    "-" +
                    format_idec(price, game.notation) +
                    spice_unit +
                    " pink spice"
                if (game.pink_spice.cmp(price) >= 0) {
                    document.getElementById("pink_ucost" + gen.id).className =
                        "pink_cost"
                    document.getElementById("pink_ubuy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("pink_ucost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("pink_ubuy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("pink_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "pink_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("pink_ubuy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("pink_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "pink_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "pink_ubuy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "pink_ubuy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("pink_ubuy" + gen.id).style.width =
                        "auto"
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
        antispice_boosts =
            1 + get_antispice_amount("yellow").log(10) ** (2 / 3) * 40
        if (game.collapse_challenge !== 0)
            antispice_boosts =
                1 + get_antispice_amount("yellow").log(10) ** (2 / 3) * 20
    }

    if (game.antispice_bought[4]) antispice_boosts *= 1.175

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
        if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
            "You have " +
                format_small(game.red_strengthener) +
                " red spice strengtheners,<br>boosting all red spice generators " +
                format_idec(
                    Decimal.pow(
                        2,
                        game.red_strengthener *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        if (
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
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
            spice_unit +
            " red spice"
        if (game.red_spice.cmp(game.red_strengthener_price) >= 0) {
            document.getElementById("red_cost_s").className = "red_cost"
            document.getElementById("red_buy_s").className = "spice_buy can_buy"
        } else {
            document.getElementById("red_cost_s").className = "empty_cost"
            document.getElementById("red_buy_s").className = "spice_buy"
        }

        if (game.reduce_flashing) {
            let width =
                (document.getElementById("red_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("red_buy_s"))[
                            "font-size"
                        ]
                    ) -
                0.8

            document.getElementById("red_buy_s").style.width = "auto"

            let width2 =
                (document.getElementById("red_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("red_buy_s"))[
                            "font-size"
                        ]
                    ) -
                0.8

            if (width2 > width) {
                document.getElementById("red_buy_s").style.width =
                    width2 + 0.89 + "em"
            } else {
                document.getElementById("red_buy_s").style.width =
                    width + 0.89 + "em"
            }
        } else {
            document.getElementById("red_buy_s").style.width = "auto"
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
        if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
            s_str =
                "You have " +
                format_small(game.yellow_strengthener) +
                " yellow spice strengtheners,<br>boosting all red & yellow spice generators " +
                format_idec(
                    new Decimal(2)
                        .pow(
                            game.yellow_strengthener *
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
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 2 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
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
            spice_unit +
            " yellow spice"
        if (game.yellow_spice.cmp(game.yellow_strengthener_price) >= 0) {
            document.getElementById("yellow_cost_s").className = "yellow_cost"
            document.getElementById("yellow_buy_s").className =
                "spice_buy can_buy"
        } else {
            document.getElementById("yellow_cost_s").className = "empty_cost"
            document.getElementById("yellow_buy_s").className = "spice_buy"
        }

        if (game.reduce_flashing) {
            let width =
                (document.getElementById("yellow_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(
                            document.getElementById("yellow_buy_s")
                        )["font-size"]
                    ) -
                0.8

            document.getElementById("yellow_buy_s").style.width = "auto"

            let width2 =
                (document.getElementById("yellow_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(
                            document.getElementById("yellow_buy_s")
                        )["font-size"]
                    ) -
                0.8

            if (width2 > width) {
                document.getElementById("yellow_buy_s").style.width =
                    width2 + 0.89 + "em"
            } else {
                document.getElementById("yellow_buy_s").style.width =
                    width + 0.89 + "em"
            }
        } else {
            document.getElementById("yellow_buy_s").style.width = "auto"
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
        if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
            s_str =
                "You have " +
                format_small(game.green_strengthener) +
                " green spice strengtheners,<br>boosting all red, yellow & green spice generators " +
                format_idec(
                    new Decimal(2)
                        .pow(
                            game.green_strengthener *
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
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 3 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
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
            spice_unit +
            " green spice"
        if (game.green_spice.cmp(game.green_strengthener_price) >= 0) {
            document.getElementById("green_cost_s").className = "green_cost"
            document.getElementById("green_buy_s").className =
                "spice_buy can_buy"
        } else {
            document.getElementById("green_cost_s").className = "empty_cost"
            document.getElementById("green_buy_s").className = "spice_buy"
        }

        if (game.reduce_flashing) {
            let width =
                (document.getElementById("green_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(
                            document.getElementById("green_buy_s")
                        )["font-size"]
                    ) -
                0.8

            document.getElementById("green_buy_s").style.width = "auto"

            let width2 =
                (document.getElementById("green_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(
                            document.getElementById("green_buy_s")
                        )["font-size"]
                    ) -
                0.8

            if (width2 > width) {
                document.getElementById("green_buy_s").style.width =
                    width2 + 0.89 + "em"
            } else {
                document.getElementById("green_buy_s").style.width =
                    width + 0.89 + "em"
            }
        } else {
            document.getElementById("green_buy_s").style.width = "auto"
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
        if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
            s_str =
                "You have " +
                format_small(game.blue_strengthener) +
                " blue spice strengtheners,<br>boosting all red, yellow, green & blue spice generators " +
                format_idec(
                    new Decimal(2)
                        .pow(
                            game.blue_strengthener *
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
            game.prestige_bought[5] >= 1 &&
            game.color_boosts >= 4 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
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
            spice_unit +
            " blue spice"
        if (game.blue_spice.cmp(game.blue_strengthener_price) >= 0) {
            document.getElementById("blue_cost_s").className = "blue_cost"
            document.getElementById("blue_buy_s").className =
                "spice_buy can_buy"
        } else {
            document.getElementById("blue_cost_s").className = "empty_cost"
            document.getElementById("blue_buy_s").className = "spice_buy"
        }

        if (game.reduce_flashing) {
            let width =
                (document.getElementById("blue_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("blue_buy_s"))[
                            "font-size"
                        ]
                    ) -
                0.8

            document.getElementById("blue_buy_s").style.width = "auto"

            let width2 =
                (document.getElementById("blue_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("blue_buy_s"))[
                            "font-size"
                        ]
                    ) -
                0.8

            if (width2 > width) {
                document.getElementById("blue_buy_s").style.width =
                    width2 + 0.89 + "em"
            } else {
                document.getElementById("blue_buy_s").style.width =
                    width + 0.89 + "em"
            }
        } else {
            document.getElementById("blue_buy_s").style.width = "auto"
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
        if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
            document.getElementById("pink_info_s").innerHTML =
                "You have " +
                format_small(game.pink_strengthener) +
                " pink spice strengtheners,<br>boosting ALL spice generators " +
                format_idec(
                    new Decimal(2)
                        .pow(
                            game.pink_strengthener *
                                (1 +
                                    2 *
                                        game.ascend_complete[2] *
                                        game.ascend_bought[24])
                        )
                        .pow(antispice_boosts),
                    game.notation
                ) +
                "x"
        document.getElementById("pink_cost_s").innerHTML =
            "-" +
            format_idec(game.pink_strengthener_price, game.notation) +
            spice_unit +
            " pink spice"
        if (game.pink_spice.cmp(game.pink_strengthener_price) >= 0) {
            document.getElementById("pink_cost_s").className = "pink_cost"
            document.getElementById("pink_buy_s").className =
                "spice_buy can_buy"
        } else {
            document.getElementById("pink_cost_s").className = "empty_cost"
            document.getElementById("pink_buy_s").className = "spice_buy"
        }

        if (game.reduce_flashing) {
            let width =
                (document.getElementById("pink_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("pink_buy_s"))[
                            "font-size"
                        ]
                    ) -
                0.8

            document.getElementById("pink_buy_s").style.width = "auto"

            let width2 =
                (document.getElementById("pink_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("pink_buy_s"))[
                            "font-size"
                        ]
                    ) -
                0.8

            if (width2 > width) {
                document.getElementById("pink_buy_s").style.width =
                    width2 + 0.89 + "em"
            } else {
                document.getElementById("pink_buy_s").style.width =
                    width + 0.89 + "em"
            }
        } else {
            document.getElementById("pink_buy_s").style.width = "auto"
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
            if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
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
            if (game.color_boosts >= 5) {
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color boosts,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(
                            2 +
                                0.2 * game.prestige_bought[2] +
                                2 *
                                    (game.ascend_bought[2] +
                                        game.ascend_bought[14])
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
                            ).pow(
                                (game.color_boosts * 2 - 4) * antispice_boosts
                            ),
                            game.notation
                        ) +
                        "x"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
            } else {
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color shifts,<br>boosting ALL spice generators " +
                    format_idec(
                        new Decimal(
                            2 +
                                0.2 * game.prestige_bought[2] +
                                2 *
                                    (game.ascend_bought[2] +
                                        game.ascend_bought[14])
                        ).pow((game.color_boosts * 2 - 4) * antispice_boosts),
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
                            ).pow(
                                (game.color_boosts * 2 - 4) * antispice_boosts
                            ),
                            game.notation
                        ) +
                        "x"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    document.getElementById("color_shift_info").innerHTML =
                        "You have " +
                        format_small(game.color_boosts) +
                        " color shifts,<br>boosting ALL spice generators " +
                        format_idec(
                            new Decimal(2).pow(
                                (game.color_boosts * 2 - 4) * antispice_boosts
                            ),
                            game.notation
                        ) +
                        "x"
            }
            document.getElementById("color_shift_button").innerHTML =
                "Reset for a spice boost"
            if (game.prestige_bought[22] >= 1)
                document.getElementById("color_shift_button").innerHTML =
                    "Gain a spice boost"
        }
        if (
            game.color_boosts >= game.augment_start ||
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
                "x<br><br>After " +
                format_small(game.augment_start) +
                " color boosts, color augments begin with much harsher scaling"
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
                    "x<br><br>After " +
                    format_small(game.augment_start) +
                    " color boosts, color augments begin with much harsher scaling"
            if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
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
                    "x<br><br>After " +
                    format_small(game.augment_start) +
                    " color boosts, color augments begin with much harsher scaling"
            document.getElementById("color_shift_button").innerHTML =
                "Reset for a spice boost"
            if (game.prestige_bought[22] >= 1)
                document.getElementById("color_shift_button").innerHTML =
                    "Gain a spice boost"
        } else if (game.collapse >= 1) {
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
                                2 *
                                    (game.ascend_bought[2] +
                                        game.ascend_bought[14])
                        ).pow(game.color_boosts * antispice_boosts),
                        game.notation
                    ) +
                    "x<br><br>After " +
                    format_small(game.augment_start) +
                    " color boosts, color augments begin with much harsher scaling"
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
                        "x<br><br>After " +
                        format_small(game.augment_start) +
                        " color boosts, color augments begin with much harsher scaling"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                        "x<br><br>After " +
                        format_small(game.augment_start) +
                        " color boosts, color augments begin with much harsher scaling"
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
                                2 *
                                    (game.ascend_bought[2] +
                                        game.ascend_bought[14])
                        ).pow((game.color_boosts * 2 - 4) * antispice_boosts),
                        game.notation
                    ) +
                    "x<br><br>After " +
                    format_small(game.augment_start) +
                    " color boosts, color augments begin with much harsher scaling"
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
                            ).pow(
                                (game.color_boosts * 2 - 4) * antispice_boosts
                            ),
                            game.notation
                        ) +
                        "x<br><br>After " +
                        format_small(game.augment_start) +
                        " color boosts, color augments begin with much harsher scaling"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                        "x<br><br>After " +
                        format_small(game.augment_start) +
                        " color boosts, color augments begin with much harsher scaling"
                document.getElementById("color_shift_button").innerHTML =
                    "Reset for a spice boost"
                if (game.prestige_bought[22] >= 1)
                    document.getElementById("color_shift_button").innerHTML =
                        "Gain a spice boost"
            }
        }
        if (
            game.color_boosts >= 4 &&
            game.color_boosts < 10 &&
            game.prestige === 0 &&
            game.ascend === 0 &&
            game.collapse === 0
        ) {
            document.getElementById("color_shift_unlock").style.display =
                "block"
            if (game.color_boosts === 9)
                document.getElementById("color_shift_unlock").innerHTML =
                    "Color boost " +
                    format_small(1) +
                    " time to unlock Prestige"
            else
                document.getElementById("color_shift_unlock").innerHTML =
                    "Color boost " +
                    format_small(10 - game.color_boosts) +
                    " times to unlock Prestige"
        } else
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
                        let amount = game.augment_start * 4000 - 2676738000
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
                        else if (game.color_boosts <= 80003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1000 - 4733000) *
                                        scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 132003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1500 - 44734500) *
                                        scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= 1666667)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 2500 - 176737500) *
                                        scaling
                                ) +
                                " pink spice galaxies"
                        else if (game.color_boosts <= game.augment_start)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 4000 - 2676738000) *
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
                                        4000) *
                                        (game.color_boosts -
                                            game.augment_start +
                                            4001)) /
                                        2 +
                                        amount -
                                        8002000) *
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
                        let amount = game.augment_start * 4000 - 2676738000
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
                        else if (game.color_boosts <= 80003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1000 - 4733000) *
                                        scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 132003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1500 - 44734500) *
                                        scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= 1666667)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 2500 - 176737500) *
                                        scaling
                                ) +
                                " bought pink spice galaxies"
                        else if (game.color_boosts <= game.augment_start)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 4000 - 2676738000) *
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
                                        4000) *
                                        (game.color_boosts -
                                            game.augment_start +
                                            4001)) /
                                        2 +
                                        amount -
                                        8002000) *
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
                } else if (game.color_boosts <= 80003) {
                    if (
                        game.pink_spice_bought[5] >=
                        (game.color_boosts * 1000 - 4733000) * scaling
                    )
                        can_boost = true
                } else if (game.color_boosts <= 132003) {
                    if (
                        game.pink_spice_bought[5] >=
                        (game.color_boosts * 1500 - 44734500) * scaling
                    )
                        can_boost = true
                } else if (game.color_boosts <= 1666667) {
                    if (
                        game.pink_spice_bought[5] >=
                        (game.color_boosts * 2500 - 176737500) * scaling
                    )
                        can_boost = true
                } else if (game.color_boosts <= game.augment_start) {
                    if (
                        game.pink_spice_bought[5] >=
                        (game.color_boosts * 4000 - 2676738000) * scaling
                    )
                        can_boost = true
                } else {
                    let amount = game.augment_start * 4000 - 2676738000
                    if (
                        game.pink_spice_bought[5] >=
                        (((game.color_boosts - game.augment_start + 4000) *
                            (game.color_boosts - game.augment_start + 4001)) /
                            2 +
                            amount -
                            8002000) *
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
                document.getElementById("pink").innerHTML = "LOCKED"
                document.getElementById("pink").className = "subtab locked"
            }
        } else {
            document.getElementById("yellow_max_all").style.display = "none"
            document.getElementById("green").innerHTML = "LOCKED"
            document.getElementById("green").className = "subtab locked"
            document.getElementById("blue").innerHTML = "LOCKED"
            document.getElementById("blue").className = "subtab locked"
            document.getElementById("pink").innerHTML = "LOCKED"
            document.getElementById("pink").className = "subtab locked"
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
    let rainbow_unit = " μg"
    if (game.notation === 14) {
        rainbow_unit = ""
    }

    document.getElementById("rainbow_spice_num").innerHTML =
        format_idec(game.rainbow_spice, game.notation) + rainbow_unit
    document.getElementById("rainbow_spice_num2").innerHTML =
        format_idec(game.rainbow_spice, game.notation) + rainbow_unit
    document.getElementById("rainbow_spice_num3").innerHTML =
        format_idec(game.rainbow_spice, game.notation) + rainbow_unit

    if (game.color_boosts >= 10) {
        document.getElementById("prestige_button").className =
            "prestige_button p_unlocked"
        document.getElementById("prestige_up").style.display = "block"

        let amount = new Decimal(0)
        if (game.color_boosts <= 16)
            amount = new Decimal(2).pow((game.color_boosts - 10) / 3)
        else amount = new Decimal(2).pow((game.color_boosts - 8) / 4)
        if (game.research_complete[34] >= 1 && game.collapse_challenge !== 12) {
            if (game.color_boosts >= game.augment_start) {
                let augment_amount = new Decimal(2).pow(
                    (game.augment_start - 8) / 4
                )
                amount = amount.div(augment_amount).pow(1.5).mul(augment_amount)
            }
        }
        if (
            game.ascend_bought[15] &&
            game.ascend_challenge === 0 &&
            game.collapse_challenge !== 12
        ) {
            if (game.ascend < 10240)
                amount = amount.mul(Decimal.pow(2, game.ascend / 20))
            else
                amount = amount.mul(
                    Decimal.pow(2, 5 * (game.ascend - 7740) ** 0.5 + 262)
                )
        }

        if (game.antispice[4].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                amount = amount.pow(
                    1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.03
                )
            } else {
                amount = amount.pow(
                    1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.06
                )
            }
        }

        if (game.antispice_bought[2]) {
            amount = amount.pow(1.1)
        }

        document.getElementById("prestige_up").innerHTML =
            "+" +
            format_idec(amount, game.notation) +
            rainbow_unit +
            " rainbow spice"
        document.getElementById("prestige_req").style.color = "white"
        document.getElementById("prestige_req").innerHTML =
            format_small(game.color_boosts) + " color boosts done"
        if (game.color_boosts >= game.augment_start)
            document.getElementById("prestige_req").innerHTML =
                format_small(game.color_boosts) + " color augments done"
        if (game.color_boosts >= 4 && game.collapse_challenge === 10)
            document.getElementById("prestige_req").innerHTML =
                format_small(game.color_boosts) + " color augments done"

        if (game.resource_efficiency) {
            document.getElementById("prestige_efficiency").style.display =
                "block"

            let efficiency_str =
                "Currently: +" +
                format_idec(
                    amount.div(game.prestige_time_played).mul(60),
                    game.notation
                ) +
                rainbow_unit +
                " rainbow spice/min"

            if (game.prestige_bought[15] >= 1) {
                switch (game.autopr_mode) {
                    case 0:
                        if (game.peak_rainbow_boosts >= game.augment_start)
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_rainbow_gain.mul(60),
                                    game.notation
                                ) +
                                rainbow_unit +
                                " rainbow spice/min at " +
                                format_small(
                                    game.peak_rainbow_boosts,
                                    game.notation
                                ) +
                                " color augments"
                        else
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_rainbow_gain.mul(60),
                                    game.notation
                                ) +
                                rainbow_unit +
                                " rainbow spice/min at " +
                                format_small(
                                    game.peak_rainbow_boosts,
                                    game.notation
                                ) +
                                " color boosts"
                        break
                    case 1:
                        efficiency_str +=
                            "<br>Peak: +" +
                            format_idec(
                                game.peak_rainbow_gain.mul(60),
                                game.notation
                            ) +
                            rainbow_unit +
                            " rainbow spice/min at +" +
                            format_idec(
                                game.peak_rainbow_amount,
                                game.notation
                            ) +
                            rainbow_unit +
                            " rainbow spice"
                        break
                    case 2:
                        if (game.peak_rainbow_time < 1)
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_rainbow_gain.mul(60),
                                    game.notation
                                ) +
                                rainbow_unit +
                                " rainbow spice/min at " +
                                game.peak_rainbow_time.toFixed(2) +
                                "s"
                        else
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_rainbow_gain.mul(60),
                                    game.notation
                                ) +
                                rainbow_unit +
                                " rainbow spice/min at " +
                                format_dec(
                                    game.peak_rainbow_time,
                                    game.notation
                                ) +
                                "s"
                        break
                }
            } else {
                efficiency_str +=
                    "<br>Peak: +" +
                    format_idec(game.peak_rainbow_gain.mul(60), game.notation) +
                    rainbow_unit +
                    " rainbow spice/min"
            }

            document.getElementById("prestige_efficiency").innerHTML =
                efficiency_str
        } else {
            document.getElementById("prestige_efficiency").style.display =
                "none"
        }
    } else {
        document.getElementById("prestige_button").className =
            "prestige_button p_locked"
        document.getElementById("prestige_up").style.display = "none"
        document.getElementById("prestige_req").style.color = "grey"
        document.getElementById("prestige_req").innerHTML =
            "10 color boosts required"

        if (game.resource_efficiency) {
            document.getElementById("prestige_efficiency").style.display =
                "block"

            let efficiency_str =
                "Currently: +" +
                format_dec(0, game.notation) +
                rainbow_unit +
                " rainbow spice/min"

            efficiency_str +=
                "<br>Peak: +" +
                format_dec(0, game.notation) +
                rainbow_unit +
                " rainbow spice/min"

            document.getElementById("prestige_efficiency").innerHTML =
                efficiency_str
        } else {
            document.getElementById("prestige_efficiency").style.display =
                "none"
        }
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
                document.getElementById("prestige_goal").style.display = "flex"
                if (
                    game.autopr_goal[0] + game.autopr_goal2[0] >=
                    game.augment_start
                )
                    document.getElementById("prestige_goal_text").innerHTML =
                        "Current Auto-Prestige Goal: " +
                        format_small(
                            game.autopr_goal[0] + game.autopr_goal2[0]
                        ) +
                        " color augments"
                else
                    document.getElementById("prestige_goal_text").innerHTML =
                        "Current Auto-Prestige Goal: " +
                        format_small(
                            game.autopr_goal[0] + game.autopr_goal2[0]
                        ) +
                        " color boosts"
            } else {
                document.getElementById("prestige_boosts_delta").style.display =
                    "none"
                document.getElementById("prestige_goal").style.display = "none"
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
                document.getElementById("prestige_goal").style.display = "flex"
                document.getElementById("prestige_goal_text").innerHTML =
                    "Current Auto-Prestige Goal: +" +
                    format_idec(
                        game.autopr_goal[1].mul(game.autopr_goal2[1]),
                        game.notation
                    ) +
                    rainbow_unit +
                    " rainbow spice"
            } else {
                document.getElementById("prestige_spice_delta").style.display =
                    "none"
                document.getElementById("prestige_goal").style.display = "none"
            }
        } else if (game.autopr_mode === 2) {
            document.getElementById("prestige_boosts").style.display = "none"
            document.getElementById("prestige_spice").style.display = "none"
            document.getElementById("prestige_time").style.display = "flex"
            document.getElementById("prestige_boosts_delta").style.display =
                "none"
            document.getElementById("prestige_spice_delta").style.display =
                "none"
            document.getElementById("prestige_goal").style.display = "none"
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
        if (game.research_complete[34] >= 1 && game.collapse_challenge !== 12) {
            if (game.color_boosts >= game.augment_start) {
                let augment_amount = new Decimal(2).pow(
                    (game.augment_start - 8) / 4
                )
                amount = amount.div(augment_amount).pow(1.5).mul(augment_amount)
            }
        }
        if (
            game.ascend_bought[15] &&
            game.ascend_challenge === 0 &&
            game.collapse_challenge !== 12
        ) {
            if (game.ascend >= 10240) {
                amount = amount.mul(
                    Decimal.pow(2, 5 * (game.ascend - 7740) ** 0.5 + 262)
                )
            } else {
                amount = amount.mul(Decimal.pow(2, game.ascend / 20))
            }
        }

        if (game.antispice[4].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                amount = amount.pow(
                    1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.03
                )
            } else {
                amount = amount.pow(
                    1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.06
                )
            }
        }

        if (game.antispice_bought[2]) {
            amount = amount.pow(1.1)
        }

        let str =
            "+" +
            format_dec(0, game.notation) +
            rainbow_unit +
            " rainbow spice/sec"
        if (game.color_boosts >= 10) {
            str =
                "+" +
                format_idec(amount.div(10), game.notation) +
                rainbow_unit +
                " rainbow spice/sec"
        }

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
                                        1e25,
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
                                        1e25,
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Increase boost from strengtheners/shifts<br>(Disabled)"
                break
            case 3:
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "All spice production is boosted based on unspent rainbow spice<br>(Disabled)"
                break
            case 8:
                u.desc =
                    "All spices boost the previous color based on that spice's amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Red spice boosts every other color by its amount<br>(Disabled)"
                break
            case 14:
                u.desc = "Crystallized spice boosts pink spice by its amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystallized spice boosts pink spice by its amount<br>(Disabled)"
                break
            case 16:
                u.desc =
                    "Crystallized spice also boosts other colors by its amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(Disabled)"
                break
            case 19:
                u.desc =
                    "Crystal infusions also boost crystallized spice production 1.08x"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystal infusions also boost crystallized spice production 1.08x<br>(Disabled)"
                break
            case 20:
                if (game.prestige_bought[u.id] < 5)
                    u.desc =
                        "You get " +
                        format_small(12 + 12 * game.prestige_bought[u.id]) +
                        " free crystal infusions"
                else if (game.ascend_bought[5]) {
                    if (game.prestige_bought[u.id] < u.max)
                        u.desc =
                            "You get " +
                            format_small(
                                game.prestige_bought[u.id] ** 2 +
                                    5 * game.prestige_bought[u.id] +
                                    24
                            ) +
                            " free crystal infusions"
                    else
                        u.desc =
                            "You get " +
                            format_small(
                                2 * game.prestige_bought[u.id] ** 2 -
                                    18 * game.prestige_bought[u.id] +
                                    156
                            ) +
                            " free crystal infusions"
                } else {
                    if (game.prestige_bought[u.id] < u.max)
                        u.desc =
                            "You get " +
                            format_small(
                                game.prestige_bought[u.id] ** 2 +
                                    5 * game.prestige_bought[u.id] +
                                    24
                            ) +
                            " free crystal infusions"
                    else
                        u.desc =
                            "You get " +
                            format_small(200) +
                            " free crystal infusions"
                }
                break
            case 21:
                let exponent =
                    1 /
                        (9 *
                            (1 +
                                Math.E **
                                    (Math.log10(
                                        game.rainbow_spice.div(
                                            Decimal.pow(2, 466)
                                        )
                                    ) /
                                        8))) +
                    11 / 9
                u.desc =
                    "Crystallized spice production is boosted by unspent rainbow spice<br>(Currently: " +
                    format_idec(
                        game.rainbow_spice
                            .div(Decimal.pow(2, 292.5))
                            .pow(exponent)
                            .add(1),
                        game.notation
                    ) +
                    "x)"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystallized spice production is boosted by unspent rainbow spice<br>(Disabled)"
                break
            case 23:
                u.desc =
                    "Crystallized spice furnace multipliers are raised to the 1.25 power"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystallized spice furnace multipliers are raised to the 1.25 power<br>(Disabled)"
                break
        }

        let button = prestige_map.get(u)
        document.getElementById("pr_desc" + u.id).innerHTML = u.desc
        document.getElementById("pr_cost" + u.id).innerHTML =
            "-" +
            format_idec(u.price, game.notation) +
            rainbow_unit +
            " rainbow spice"

        let bought = true
        if (game.reduce_flashing) {
            if (
                game.prestige_bought[u.id] < u.max ||
                (u.id === 20 && game.ascend_bought[5])
            )
                u.unbought++
            else u.unbought = 0
            if (u.unbought >= game.tickspeed / 2) bought = false
        } else {
            u.unbought = 0
            if (
                game.prestige_bought[u.id] < u.max ||
                (u.id === 20 && game.ascend_bought[5])
            )
                bought = false
        }

        if (u.id === 25) {
            if (bought) {
                button.className = "prestige_upgrade c_bought p_special"
            } else {
                if (game.rainbow_spice.cmp(u.price) >= 0) {
                    button.className = "prestige_upgrade c_unlocked p_special"
                } else {
                    button.className = "prestige_upgrade p_locked p_special"
                }
            }

            if (game.collapse_challenge === 11) {
                button.style.display = "none"
            } else {
                button.style.display = "block"
            }
        } else if (u.id === 12) {
            if (bought) {
                button.className = "prestige_upgrade p_bought p_special"
            } else {
                if (game.rainbow_spice.cmp(u.price) >= 0) {
                    button.className = "prestige_upgrade p_unlocked2 p_special"
                } else {
                    button.className = "prestige_upgrade p_locked p_special"
                }
            }
        } else if (u.id < 12) {
            if (bought) {
                button.className = "prestige_upgrade p_bought"
            } else {
                if (game.rainbow_spice.cmp(u.price) >= 0) {
                    button.className = "prestige_upgrade p_unlocked2"
                } else {
                    button.className = "prestige_upgrade p_locked"
                }
            }
        } else {
            if (bought) {
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
    let spice_unit = " g"
    let rainbow_unit = " μg"
    if (game.notation === 14) {
        spice_unit = ""
        rainbow_unit = ""
    }

    let antispice_power = 1
    if (game.antispice[1].cmp(1) >= 0) {
        antispice_power =
            1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
        if (game.collapse_challenge !== 0)
            antispice_power =
                1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075
    }

    document.getElementById("crystal_spice_num").innerHTML =
        format_idec(game.crystal_spice, game.notation) + spice_unit

    let synergy_str = ""
    if (
        game.prestige_bought[14] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        synergy_str =
            "<br><br>Crystallized spice synergies:<br>Pink spice production " +
            format_idec(
                Decimal.max(
                    game.highest_crystal_spice
                        .pow(3)
                        .add(1)
                        .pow(antispice_power),
                    1
                ),
                game.notation
            ) +
            "x"

        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[14] === 0
        ) {
            synergy_str =
                "<br><br>Crystallized spice synergies:<br>Pink spice production " +
                format_dec(1, game.notation) +
                "x"
        }
    }
    if (
        game.prestige_bought[16] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[16] === 0
        ) {
            synergy_str +=
                "<br>Red, yellow, green & blue spice production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            synergy_str +=
                "<br>Red, yellow, green & blue spice production " +
                format_idec(
                    Decimal.max(
                        game.highest_crystal_spice
                            .pow(12)
                            .add(1)
                            .pow(antispice_power),
                        1
                    ),
                    game.notation
                ) +
                "x"
        }
    }

    let limit_str = ""
    if (game.limit_active) {
        limit_str =
            "<br><br>You have exhausted all available resources in this realm...<br>There is no more room for your empire here<br><span class='bold'>After " +
            format_idec(game.realm_limit, game.notation) +
            spice_unit +
            " red spice, all spice production multipliers will be heavily reduced</span>"
    }

    document.getElementById("crystal_spice_up").innerHTML =
        "+" +
        format_idec(
            game.crystal_spice_gen[0]
                .floor()
                .mul(game.total_crystal_spice_boost[0])
                .mul(3),
            game.notation
        ) +
        spice_unit +
        " crystallized spice/sec" +
        synergy_str +
        limit_str
    if (
        game.crystal_spice_bought[0] >= 5n ||
        game.ascend >= 1 ||
        game.collapse >= 1
    )
        document.getElementById("crystal_spice_up").innerHTML =
            "+" +
            format_idec(
                game.crystal_spice_gen[0]
                    .floor()
                    .mul(game.total_crystal_spice_boost[0])
                    .mul(3),
                game.notation
            ) +
            spice_unit +
            " crystallized spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every five crystallized spice generators bought, that generator's boost is multiplied by 2"

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
                                new Decimal(
                                    game.crystal_spice_bought[gen.id].toString()
                                )
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
                            new Decimal(
                                game.crystal_spice_bought[gen.id].toString()
                            )
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
                            ) +
                            spice_unit +
                            " crystallized spice/sec"
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
                        } else if (game.ascend >= 1 || game.collapse >= 1) {
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
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
                    rainbow_unit +
                    " rainbow spice"
                if (
                    game.rainbow_spice.cmp(game.crystal_spice_price[gen.id]) >=
                    0
                ) {
                    document.getElementById("crystal_cost" + gen.id).className =
                        "rainbow_cost"
                    document.getElementById("crystal_buy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("crystal_cost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("crystal_buy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("crystal_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "crystal_buy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById(
                        "crystal_buy" + gen.id
                    ).style.width = "auto"

                    let width2 =
                        (document.getElementById("crystal_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "crystal_buy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "crystal_buy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "crystal_buy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById(
                        "crystal_buy" + gen.id
                    ).style.width = "auto"
                }

                n = 5n - (game.crystal_spice_bought[gen.id] % 5n)
                price = game.crystal_spice_price[gen.id]
                    .mul(1 - 2 ** n.toString())
                    .div(-1)
                document.getElementById("crystal_ucost" + gen.id).innerHTML =
                    "-" +
                    format_idec(price, game.notation) +
                    rainbow_unit +
                    " rainbow spice"
                if (game.rainbow_spice.cmp(price) >= 0) {
                    document.getElementById(
                        "crystal_ucost" + gen.id
                    ).className = "rainbow_cost"
                    document.getElementById("crystal_ubuy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById(
                        "crystal_ucost" + gen.id
                    ).className = "empty_cost"
                    document.getElementById("crystal_ubuy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("crystal_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "crystal_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById(
                        "crystal_ubuy" + gen.id
                    ).style.width = "auto"

                    let width2 =
                        (document.getElementById("crystal_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "crystal_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "crystal_ubuy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "crystal_ubuy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById(
                        "crystal_ubuy" + gen.id
                    ).style.width = "auto"
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
            antispice_boosts =
                1 + get_antispice_amount("yellow").log(10) ** (2 / 3) * 40
            if (game.collapse_challenge !== 0)
                antispice_boosts =
                    1 + get_antispice_amount("yellow").log(10) ** (2 / 3) * 20
        }

        if (game.antispice_bought[4]) antispice_boosts *= 1.175

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
            rainbow_unit +
            " rainbow spice"
        if (game.rainbow_spice.cmp(game.crystal_strengthener_price) >= 0) {
            document.getElementById("crystal_cost_s").className = "rainbow_cost"
            document.getElementById("crystal_buy_s").className =
                "spice_buy can_buy"
        } else {
            document.getElementById("crystal_cost_s").className = "empty_cost"
            document.getElementById("crystal_buy_s").className = "spice_buy"
        }

        if (game.reduce_flashing) {
            let width =
                (document.getElementById("crystal_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(
                            document.getElementById("crystal_buy_s")
                        )["font-size"]
                    ) -
                0.8

            document.getElementById("crystal_buy_s").style.width = "auto"

            let width2 =
                (document.getElementById("crystal_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(
                            document.getElementById("crystal_buy_s")
                        )["font-size"]
                    ) -
                0.8

            if (width2 > width) {
                document.getElementById("crystal_buy_s").style.width =
                    width2 + 0.89 + "em"
            } else {
                document.getElementById("crystal_buy_s").style.width =
                    width + 0.89 + "em"
            }
        } else {
            document.getElementById("crystal_buy_s").style.width = "auto"
        }
    } else {
        document.getElementById("crystal_gen_s").style.display = "none"
    }

    let antispice_infusions = 1
    if (game.antispice[3].cmp(1) >= 0) {
        antispice_infusions =
            1 + get_antispice_amount("green").log(10) ** 0.5 * 0.15
        if (game.collapse_challenge !== 0)
            antispice_infusions =
                1 + get_antispice_amount("green").log(10) ** 0.5 * 0.075
    }

    if (game.antispice_bought[5]) antispice_infusions *= 1.06

    let s_str =
        "You have " + format_small(game.crystal_infusion) + " crystal infusions"
    let free_infusions = game.prestige_bought[20] * 12
    if (game.prestige_bought[20] >= 6)
        free_infusions =
            game.prestige_bought[20] ** 2 + 3 * game.prestige_bought[20] + 20
    if (game.prestige_bought[20] >= 13)
        free_infusions =
            2 * game.prestige_bought[20] ** 2 -
            22 * game.prestige_bought[20] +
            176
    if (free_infusions > 0)
        s_str += " (+" + format_small(free_infusions) + " free)"
    if (game.ascend_complete[2] && game.ascend_bought[24]) {
        if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
            s_str +=
                ",<br>boosting all normal spice generators " +
                format_idec(
                    Decimal.pow(
                        5,
                        (
                            game.crystal_infusion + BigInt(free_infusions)
                        ).toString() *
                            19.2 *
                            antispice_infusions
                    ),
                    game.notation
                ) +
                "x"
        else
            s_str +=
                ",<br>boosting all normal spice generators " +
                format_idec(
                    Decimal.pow(
                        5,
                        (
                            game.crystal_infusion + BigInt(free_infusions)
                        ).toString() *
                            24 *
                            antispice_infusions
                    ),
                    game.notation
                ) +
                "x"
    } else if (
        game.ascend_bought[7] &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 12
    ) {
        s_str +=
            ",<br>boosting all normal spice generators " +
            format_idec(
                Decimal.pow(
                    5,
                    (
                        game.crystal_infusion + BigInt(free_infusions)
                    ).toString() *
                        20 *
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
                    (
                        game.crystal_infusion + BigInt(free_infusions)
                    ).toString() *
                        16 *
                        antispice_infusions
                ),
                game.notation
            ) +
            "x"
    }
    if (
        game.prestige_bought[19] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    ) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[19] === 0
        ) {
            s_str +=
                ",<br>and boosting all crystallized spice generators " +
                format_dec(1, game.notation) +
                "x"
        } else {
            s_str +=
                ",<br>and boosting all crystallized spice generators " +
                format_idec(
                    Decimal.pow(
                        1.08 + 0.04 * game.ascend_bought[6],
                        (
                            game.crystal_infusion + BigInt(free_infusions)
                        ).toString() * antispice_infusions
                    ),
                    game.notation
                ) +
                "x"
        }
    }

    document.getElementById("crystal_info_i").innerHTML = s_str
    document.getElementById("crystal_cost_i").innerHTML =
        "-" +
        format_idec(game.crystal_infusion_price, game.notation) +
        spice_unit +
        " crystallized spice"
    if (game.ascend_challenge === 1 || game.collapse_challenge === 7)
        document.getElementById("crystal_cost_i").innerHTML =
            "-Infinity " + spice_unit + " crystallized spice"
    if (
        game.crystal_spice.cmp(game.crystal_infusion_price) >= 0 &&
        game.ascend_challenge !== 1 &&
        game.collapse_challenge !== 7
    ) {
        document.getElementById("crystal_cost_i").className = "crystal_cost"
        document.getElementById("crystal_buy_i").className = "spice_buy can_buy"
    } else {
        document.getElementById("crystal_cost_i").className = "empty_cost"
        document.getElementById("crystal_buy_i").className = "spice_buy"
    }

    if (game.reduce_flashing) {
        let width =
            (document.getElementById("crystal_buy_i").offsetWidth - 1) /
                parseFloat(
                    getComputedStyle(document.getElementById("crystal_buy_i"))[
                        "font-size"
                    ]
                ) -
            0.8

        document.getElementById("crystal_buy_i").style.width = "auto"

        let width2 =
            (document.getElementById("crystal_buy_i").offsetWidth - 1) /
                parseFloat(
                    getComputedStyle(document.getElementById("crystal_buy_i"))[
                        "font-size"
                    ]
                ) -
            0.8

        if (width2 > width) {
            document.getElementById("crystal_buy_i").style.width =
                width2 + 0.89 + "em"
        } else {
            document.getElementById("crystal_buy_i").style.width =
                width + 0.89 + "em"
        }
    } else {
        document.getElementById("crystal_buy_i").style.width = "auto"
    }

    if (
        game.crystal_spice_bought[5] >= 5n ||
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
    let rainbow_unit = " μg"
    if (game.notation === 14) rainbow_unit = ""

    let goal = Decimal.pow(2, 1024)
    if (game.ascend_challenge !== 0) {
        goal = ascension_challenge.challenges[game.ascend_challenge - 1].goal
    }

    if (game.rainbow_spice.cmp(goal) >= 0) {
        document.getElementById("ascend_button").className =
            "ascend_button a_unlocked"
        document.getElementById("ascend_up").style.display = "block"
        let amount = game.rainbow_spice.pow(1 / 128).div(256)
        let original_amount = amount.floor()

        if (game.research_complete[12] >= 1 && game.collapse_challenge !== 12) {
            if (game.collapse <= 1224) {
                amount = amount.mul(
                    Decimal.pow(7.27e27, (game.collapse / 10) ** 0.5)
                )
            } else {
                amount = amount.mul(
                    Decimal.pow(
                        7.27e27,
                        (game.collapse - 1013.3) ** 0.25 + 7.2535
                    )
                )
            }
        }

        let reward_scaling = 1
        if (game.antispice_bought[1]) reward_scaling = 1.05
        if (game.collapse_complete[4] >= 2 && game.collapse_challenge !== 11) {
            amount = amount.mul(
                Decimal.pow(
                    3,
                    ((
                        game.arcane_enchantment + game.free_enchantment
                    ).toString() **
                        0.5 *
                        game.collapse_complete[4] *
                        reward_scaling) /
                        9
                )
            )
        }

        if (game.antispice[4].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                amount = amount.pow(
                    1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.03
                )
            } else {
                amount = amount.pow(
                    1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.06
                )
            }
        }

        if (game.antispice_bought[3]) {
            amount = amount.pow(1.125)
        }

        document.getElementById("ascend_up").innerHTML =
            "+" + format_inum(amount.floor(), game.notation) + " ᚫ"
        document.getElementById("ascend_req").style.color = "white"
        document.getElementById("ascend_req").innerHTML =
            format_idec(
                Decimal.pow(2, 1024).mul(
                    Decimal.pow(original_amount.add(1), 128)
                ),
                game.notation
            ) +
            rainbow_unit +
            " rainbow spice for next ᚫ"

        if (game.resource_efficiency && game.ascend_challenge === 0) {
            document.getElementById("ascend_efficiency").style.display = "block"

            let efficiency_str =
                "Currently: +" +
                format_idec(
                    amount.div(game.ascend_time_played).mul(60),
                    game.notation
                ) +
                " ᚫ/min"

            if (game.ascend_bought[12]) {
                switch (game.autoas_mode) {
                    case 0:
                        efficiency_str +=
                            "<br>Peak: +" +
                            format_idec(
                                game.peak_ansuz_gain.mul(60),
                                game.notation
                            ) +
                            " ᚫ/min at +" +
                            format_inum(game.peak_ansuz_amount, game.notation) +
                            " ᚫ"
                        break
                    case 1:
                        if (game.peak_ansuz_time < 1)
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_ansuz_gain.mul(60),
                                    game.notation
                                ) +
                                " ᚫ/min at " +
                                game.peak_ansuz_time.toFixed(2) +
                                "s"
                        else
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_ansuz_gain.mul(60),
                                    game.notation
                                ) +
                                " ᚫ/min at " +
                                format_dec(
                                    game.peak_ansuz_time,
                                    game.notation
                                ) +
                                "s"
                        break
                }
            } else {
                efficiency_str +=
                    "<br>Peak: +" +
                    format_idec(game.peak_ansuz_gain.mul(60), game.notation) +
                    " ᚫ/min"
            }

            document.getElementById("ascend_efficiency").innerHTML =
                efficiency_str
        } else {
            document.getElementById("ascend_efficiency").style.display = "none"
        }
    } else {
        document.getElementById("ascend_button").className =
            "ascend_button a_locked"
        document.getElementById("ascend_up").style.display = "none"
        document.getElementById("ascend_req").style.color = "grey"
        document.getElementById("ascend_req").innerHTML =
            format_idec(goal, game.notation) +
            rainbow_unit +
            " rainbow spice required"

        if (game.resource_efficiency) {
            document.getElementById("ascend_efficiency").style.display = "block"

            let efficiency_str =
                "Currently: +" + format_dec(0, game.notation) + " ᚫ/min"

            efficiency_str +=
                "<br>Peak: +" + format_dec(0, game.notation) + " ᚫ/min"

            document.getElementById("ascend_efficiency").innerHTML =
                efficiency_str
        } else {
            document.getElementById("ascend_efficiency").style.display = "none"
        }
    }

    document.getElementById("ansuz_num").innerHTML =
        format_inum(game.ansuz, game.notation) + " ᚫ"

    let rune_speed = 1
    let rune_exp = 2
    if (game.research_complete[3] >= 1 && game.collapse_challenge !== 12) {
        rune_exp = 2 + 0.1 * game.research_complete[3]

        if (game.antispice_bought[0])
            rune_exp = 2 + 0.1 * 1.15 * game.research_complete[3]
    }
    if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
        rune_speed = 0

    if (game.rune[0].cmp(0) === 0 && game.ascend >= 1) {
        if (game.rune_power[0].cmp(250) >= 0) {
            document.getElementById("jera_text").innerHTML =
                "You have " +
                format_num(0, game.notation) +
                " ᛡ, producing " +
                format_idec(
                    Decimal.pow(0.5, game.rune_power[0].div(250)).mul(
                        0.4 * rune_speed
                    ),
                    game.notation
                ) +
                " ᛡ power/sec<br>You have " +
                format_inum(game.rune_power[0].floor(), game.notation) +
                " ᛡ power, boosting red spice production " +
                format_idec(game.rune_boost[0], game.notation) +
                "x"
        } else {
            document.getElementById("jera_text").innerHTML =
                "You have " +
                format_num(0, game.notation) +
                " ᛡ, producing " +
                format_dec(0.2 * rune_speed, game.notation) +
                " ᛡ power/sec<br>You have " +
                format_inum(game.rune_power[0].floor(), game.notation) +
                " ᛡ power, boosting red spice production " +
                format_idec(game.rune_boost[0], game.notation) +
                "x"
        }
    } else {
        document.getElementById("jera_text").innerHTML =
            "You have " +
            format_inum(game.rune[0], game.notation) +
            " ᛡ, producing " +
            format_idec(
                game.rune[0].pow(rune_exp).mul(rune_speed),
                game.notation
            ) +
            " ᛡ power/sec<br>You have " +
            format_inum(game.rune_power[0].floor(), game.notation) +
            " ᛡ power, boosting red spice production " +
            format_idec(game.rune_boost[0], game.notation) +
            "x"
    }
    if (game.rune[1].cmp(0) === 0 && game.ascend >= 1) {
        if (game.rune_power[1].cmp(250) >= 0) {
            document.getElementById("raido_text").innerHTML =
                "You have " +
                format_num(0, game.notation) +
                " ᚱ, producing " +
                format_idec(
                    Decimal.pow(0.5, game.rune_power[1].div(250)).mul(
                        0.4 * rune_speed
                    ),
                    game.notation
                ) +
                " ᚱ power/sec<br>You have " +
                format_inum(game.rune_power[1].floor(), game.notation) +
                " ᚱ power, boosting yellow, green, & blue spice production " +
                format_idec(game.rune_boost[1], game.notation) +
                "x"
        } else {
            document.getElementById("raido_text").innerHTML =
                "You have " +
                format_num(0, game.notation) +
                " ᚱ, producing " +
                format_dec(0.2 * rune_speed, game.notation) +
                " ᚱ power/sec<br>You have " +
                format_inum(game.rune_power[1].floor(), game.notation) +
                " ᚱ power, boosting yellow, green, & blue spice production " +
                format_idec(game.rune_boost[1], game.notation) +
                "x"
        }
    } else {
        document.getElementById("raido_text").innerHTML =
            "You have " +
            format_inum(game.rune[1], game.notation) +
            " ᚱ, producing " +
            format_idec(
                game.rune[1].pow(rune_exp).mul(rune_speed),
                game.notation
            ) +
            " ᚱ power/sec<br>You have " +
            format_inum(game.rune_power[1].floor(), game.notation) +
            " ᚱ power, boosting yellow, green, & blue spice production " +
            format_idec(game.rune_boost[1], game.notation) +
            "x"
    }
    if (game.rune[2].cmp(0) === 0 && game.ascend >= 1) {
        if (game.rune_power[2].cmp(250) >= 0) {
            document.getElementById("othala_text").innerHTML =
                "You have " +
                format_num(0, game.notation) +
                " ᛟ, producing " +
                format_idec(
                    Decimal.pow(0.5, game.rune_power[2].div(250)).mul(
                        0.4 * rune_speed
                    ),
                    game.notation
                ) +
                " ᛟ power/sec<br>You have " +
                format_inum(game.rune_power[2].floor(), game.notation) +
                " ᛟ power, boosting pink spice production " +
                format_idec(game.rune_boost[2], game.notation) +
                "x"
        } else {
            document.getElementById("othala_text").innerHTML =
                "You have " +
                format_num(0, game.notation) +
                " ᛟ, producing " +
                format_dec(0.2 * rune_speed, game.notation) +
                " ᛟ power/sec<br>You have " +
                format_inum(game.rune_power[2].floor(), game.notation) +
                " ᛟ power, boosting pink spice production " +
                format_idec(game.rune_boost[2], game.notation) +
                "x"
        }
    } else {
        document.getElementById("othala_text").innerHTML =
            "You have " +
            format_inum(game.rune[2], game.notation) +
            " ᛟ, producing " +
            format_idec(
                game.rune[2].pow(rune_exp).mul(rune_speed),
                game.notation
            ) +
            " ᛟ power/sec<br>You have " +
            format_inum(game.rune_power[2].floor(), game.notation) +
            " ᛟ power, boosting pink spice production " +
            format_idec(game.rune_boost[2], game.notation) +
            "x"
    }

    if (game.rune[2].cmp(1) === -1) {
        document.getElementById("jera_menu").style.display = "none"
        document.getElementById("raido_menu").style.display = "none"
    } else {
        document.getElementById("jera_menu").style.display = "flex"
        document.getElementById("raido_menu").style.display = "flex"
    }

    if (game.distribute_unlocked) {
        document.getElementById("distribute_buttons").style.display = "flex"
        document.getElementById("jera_half").style.display = "block"
        document.getElementById("raido_half").style.display = "block"
        document.getElementById("othala_half").style.display = "block"
    } else {
        document.getElementById("distribute_buttons").style.display = "none"
        document.getElementById("jera_half").style.display = "none"
        document.getElementById("raido_half").style.display = "none"
        document.getElementById("othala_half").style.display = "none"
    }

    if (game.half_distribute_unlocked) {
        document.getElementById("half_distribute").style.display = "block"
    } else {
        document.getElementById("half_distribute").style.display = "none"
    }

    if (game.research_complete[6] >= 1) {
        document.getElementById("distributor").style.display = "block"
    } else {
        document.getElementById("distributor").style.display = "none"
    }

    document.getElementById("ansuz_num2").innerHTML =
        format_inum(game.ansuz, game.notation) + " ᚫ"
    document.getElementById("ansuz_num3").innerHTML =
        format_inum(game.ansuz, game.notation) + " ᚫ"

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

    if (game.research_complete[4] >= 1) {
        document.getElementById("upgrade_auto_toggle3").style.display = "block"
    } else {
        document.getElementById("upgrade_auto_toggle3").style.display = "none"
    }

    if (game.collapse_complete[4] >= 1) {
        document.getElementById("ansuz_up").style.display = "block"
        document.getElementById("ansuz_up2").style.display = "block"
        document.getElementById("ansuz_up3").style.display = "block"

        let amount = game.rainbow_spice.pow(1 / 128).div(256)

        if (game.research_complete[12] >= 1 && game.collapse_challenge !== 12) {
            if (game.collapse <= 1224) {
                amount = amount.mul(
                    Decimal.pow(7.27e27, (game.collapse / 10) ** 0.5)
                )
            } else {
                amount = amount.mul(
                    Decimal.pow(
                        7.27e27,
                        (game.collapse - 1013.3) ** 0.25 + 7.2535
                    )
                )
            }
        }

        let reward_scaling = 1
        if (game.antispice_bought[1]) reward_scaling = 1.05
        if (game.collapse_complete[4] >= 2 && game.collapse_challenge !== 11) {
            amount = amount.mul(
                Decimal.pow(
                    3,
                    ((
                        game.arcane_enchantment + game.free_enchantment
                    ).toString() **
                        0.5 *
                        game.collapse_complete[4] *
                        reward_scaling) /
                        9
                )
            )
        }

        if (game.antispice[4].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                amount = amount.pow(
                    1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.03
                )
            } else {
                amount = amount.pow(
                    1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.06
                )
            }
        }

        if (game.antispice_bought[3]) {
            amount = amount.pow(1.125)
        }

        let str = "+" + format_dec(0, game.notation) + " ᚫ/sec"
        if (game.rainbow_spice.cmp(Decimal.pow(2, 1024)) >= 0) {
            str =
                "+" +
                format_idec(amount.floor().mul(0.01), game.notation) +
                " ᚫ/sec"
        }

        document.getElementById("ansuz_up").innerHTML = str
        document.getElementById("ansuz_up2").innerHTML = str
        document.getElementById("ansuz_up3").innerHTML = str
    } else {
        document.getElementById("ansuz_up").style.display = "none"
        document.getElementById("ansuz_up2").style.display = "none"
        document.getElementById("ansuz_up3").style.display = "none"
    }

    for (const u of ascension_upgrade.upgrades) {
        switch (u.id) {
            case 0:
                u.desc =
                    "The boost from red spice amount is " +
                    format_small(2) +
                    "x stronger"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "The boost from red spice amount is " +
                        format_small(2) +
                        "x stronger<br>(Disabled)"
                break
            case 1:
                u.desc = "The boost from Times Prestiged stat is stronger"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(Disabled)"
                break
            case 4:
                u.desc = "Crystallized spice generator multipliers are stronger"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystal infusions boost crystallized spice production " +
                        format_dec(1.12) +
                        "x<br>(Disabled)"
                break
            case 7:
                u.desc =
                    "Crystal infusions are " + format_small(25) + "% stronger"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystal infusions are " +
                        format_small(25) +
                        "% stronger<br>(Disabled)"
                break
            case 11:
                u.desc = "Strengtheners are " + format_small(2) + "x stronger"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge !== 0 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Times Ascended stat boosts rainbow spice gains<br>(Disabled)"
                break
            case 18:
                u.desc = "Red spice boosts crystallized spice by its amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Red spice boosts crystallized spice by its amount<br>(Disabled)"
                break
            case 19:
                let exponent = 1.5
                if (game.ansuz.cmp(ascension_upgrade.upgrades[25].price) >= 0) {
                    let scale =
                        (ascension_upgrade.upgrades[26].price.log(10) -
                            ascension_upgrade.upgrades[25].price.log(10)) /
                        Math.PI
                    exponent =
                        0.25 *
                            Math.sin(
                                (game.ansuz.log(10) -
                                    ascension_upgrade.upgrades[25].price.log(
                                        10
                                    )) /
                                    scale -
                                    Math.PI / 2
                            ) +
                        1.75
                }
                if (game.ansuz.cmp(ascension_upgrade.upgrades[26].price) >= 0)
                    exponent = 2
                if (game.ansuz.cmp(ascension_upgrade.upgrades[28].price) >= 0) {
                    let scale =
                        ascension_upgrade.upgrades[28].price.log(10) / Math.PI
                    exponent =
                        1.8 -
                        0.2 *
                            Math.sin(
                                (game.ansuz.log(10) -
                                    ascension_upgrade.upgrades[28].price.log(
                                        10
                                    )) /
                                    scale -
                                    Math.PI / 2
                            )
                }
                if (
                    game.ansuz.cmp(
                        ascension_upgrade.upgrades[28].price.pow(2)
                    ) >= 0
                )
                    exponent = 1.6

                u.desc =
                    "Arcane spice is boosted based on unused Ansuz runes<br>(Currently: " +
                    format_idec(
                        game.ansuz
                            .div(1.2379705696153568e62)
                            .add(1)
                            .pow(exponent),
                        game.notation
                    ) +
                    "x)"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Arcane spice boosts crystallized spice by its amount<br>(Disabled)"
                break
            case 26:
                u.desc =
                    "Boosts from rune power are " +
                    format_small(50) +
                    "% stronger"
                break
            case 29:
                u.desc =
                    "Arcane enchantments also boost arcane spice production " +
                    format_dec(13 / 12, game.notation) +
                    "x"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Red spice boosts arcane spice by its amount<br>(Disabled)"
                break
            case 31:
                u.desc = "Arcane spice boosts itself by its amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Arcane spice boosts itself by its amount<br>(Disabled)"
                break
            case 33:
                u.desc =
                    "Boosts from rune power are now " +
                    format_small(3) +
                    "x stronger"
                break
        }

        let button = ascension_map.get(u)

        if (game.collapse_challenge === 10) {
            document.getElementById("as_desc" + u.id).innerHTML = u.desc
            document.getElementById("as_cost" + u.id).innerHTML =
                "-" +
                format_inum(u.price.pow(0.5897).ceil(), game.notation) +
                " ᚫ"
        } else {
            document.getElementById("as_desc" + u.id).innerHTML = u.desc
            document.getElementById("as_cost" + u.id).innerHTML =
                "-" + format_inum(u.price, game.notation) + " ᚫ"
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

        let bought = true
        if (game.reduce_flashing) {
            if (!game.ascend_bought[u.id]) u.unbought++
            else u.unbought = 0
            if (u.unbought >= game.tickspeed / 2) bought = false
        } else {
            u.unbought = 0
            if (!game.ascend_bought[u.id]) bought = false
        }

        if (bought) {
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
                    game.ansuz.cmp(u.price.pow(0.5897).ceil()) >= 0 &&
                    condition1 &&
                    condition2 &&
                    game.rune[2].cmp(1) >= 0
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
                    game.ansuz.cmp(u.price) >= 0 &&
                    condition1 &&
                    condition2 &&
                    game.rune[2].cmp(1) >= 0
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
            if (game.research_complete[8] >= 1) {
                document.getElementById("ascend_runes_delta").style.display =
                    "flex"
                document.getElementById("ascend_goal").style.display = "flex"
                document.getElementById("ascend_goal_text").innerHTML =
                    "Current Auto-Ascend Goal: +" +
                    format_inum(
                        game.autoas_goal[0].mul(game.autoas_goal2).ceil(),
                        game.notation
                    ) +
                    rainbow_unit +
                    " ᚫ"
            } else {
                document.getElementById("ascend_runes_delta").style.display =
                    "none"
                document.getElementById("ascend_goal").style.display = "none"
            }
        } else if (game.autoas_mode === 1) {
            document.getElementById("ascend_runes").style.display = "none"
            document.getElementById("ascend_time").style.display = "flex"
            document.getElementById("ascend_runes_delta").style.display = "none"
            document.getElementById("ascend_goal").style.display = "none"
        }
    } else {
        document.getElementById("ascend_auto_block").style.display = "none"
    }

    if (game.ascend_challenge !== 0) {
        document.getElementById("exit_ascension_challenge").style.display =
            "block"
    } else {
        document.getElementById("exit_ascension_challenge").style.display =
            "none"
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
                    if (game.rainbow_spice.cmp(c.goal) >= 0) {
                        button.className = "a_challenge_button finished"
                        button.innerHTML = "Complete Challenge"
                    } else {
                        button.className = "a_challenge_button inprogress"
                        button.innerHTML = "In Progress"
                    }
                } else {
                    button.className = "a_challenge_button incomplete"
                    button.innerHTML = "Enter Challenge"
                }
            }

            info.innerHTML =
                c.desc +
                "<br>Goal: <span class='rainbow_spice'>" +
                format_infdec(c.goal, game.notation) +
                rainbow_unit +
                " rainbow spice</span>"

            if (c.id === 5 && game.collapse >= 1) {
                info.innerHTML =
                    "All spice production boosts from Prestige and Ascension upgrades<br>are disabled, and rune power production is disabled<br>Completing this Challenge is required to Collapse<br>Goal: <span class='rainbow_spice'>" +
                    format_infdec(c.goal, game.notation) +
                    rainbow_unit +
                    " rainbow spice</span>"
            }
        } else {
            panel.style.display = "none"
        }
    }
}

//graphics updates for arcane spice
function arcane_update() {
    let spice_unit = " g"
    let arcane_unit = " mg"
    if (game.notation === 14) {
        spice_unit = ""
        arcane_unit = ""
    }

    let antispice_power = 1
    if (game.antispice[1].cmp(1) >= 0) {
        antispice_power =
            1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
        if (game.collapse_challenge !== 0)
            antispice_power =
                1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075
    }

    document.getElementById("arcane_spice_num").innerHTML =
        format_idec(game.arcane_spice, game.notation) + arcane_unit

    let synergy_str = ""
    if (game.ascend_bought[22] || game.collapse >= 1) {
        synergy_str =
            "<br><br>Arcane spice synergies:<br>Crystallized spice production " +
            format_idec(
                Decimal.max(
                    game.highest_arcane_spice
                        .pow(20)
                        .add(1)
                        .pow(antispice_power),
                    1
                ),
                game.notation
            ) +
            "x"

        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[22]
        ) {
            synergy_str =
                "<br><br>Arcane spice synergies:<br>Crystallized spice production " +
                format_dec(1, game.notation) +
                "x"
        }
    }
    if (game.ascend_bought[31] || game.collapse >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[31]
        ) {
            synergy_str +=
                "<br>Arcane spice production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            synergy_str +=
                "<br>Arcane spice production " +
                format_idec(
                    Decimal.max(
                        game.highest_arcane_spice
                            .pow(0.0175)
                            .add(1)
                            .pow(antispice_power),
                        1
                    ),
                    game.notation
                ) +
                "x"
        }
    }

    let limit_str = ""
    if (game.limit_active) {
        limit_str =
            "<br><br>You have exhausted all available resources in this realm...<br>There is no more room for your empire here<br><span class='bold'>After " +
            format_idec(game.realm_limit, game.notation) +
            spice_unit +
            " red spice, all spice production multipliers will be heavily reduced</span>"
    }

    document.getElementById("arcane_spice_up").innerHTML =
        "+" +
        format_idec(
            game.arcane_spice_gen[0]
                .floor()
                .mul(game.total_arcane_spice_boost[0])
                .mul(5),
            game.notation
        ) +
        arcane_unit +
        " arcane spice/sec" +
        synergy_str +
        limit_str
    if (game.arcane_spice_bought[0] >= 3n || game.collapse >= 1)
        document.getElementById("arcane_spice_up").innerHTML =
            "+" +
            format_idec(
                game.arcane_spice_gen[0]
                    .floor()
                    .mul(game.total_arcane_spice_boost[0])
                    .mul(5),
                game.notation
            ) +
            arcane_unit +
            " arcane spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every three arcane spice generators bought, that generator's boost is multiplied by 3"

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
                        new Decimal(game.arcane_spice_bought[gen.id].toString())
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
                                new Decimal(
                                    game.arcane_spice_bought[gen.id].toString()
                                )
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
                        ) +
                        arcane_unit +
                        " arcane spice/sec"
                    if (game.ascend_bought[32] && game.ascend_challenge !== 2) {
                        info_str +=
                            ",<br>and producing " +
                            format_idec(
                                game.arcane_spice_gen[gen.id].floor().pow(36.5),
                                game.notation
                            ) +
                            " crystallized spice galaxies/sec"
                    } else if (game.collapse >= 1) {
                        info_str +=
                            ",<br>and producing " +
                            format_dec(0, game.notation) +
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
                    format_inum(
                        game.arcane_spice_price[gen.id].round(),
                        game.notation
                    ) +
                    " ᚫ"
                if (game.ansuz.cmp(game.arcane_spice_price[gen.id]) >= 0) {
                    document.getElementById("arcane_cost" + gen.id).className =
                        "rune_cost"
                    document.getElementById("arcane_buy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("arcane_cost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("arcane_buy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("arcane_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "arcane_buy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("arcane_buy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("arcane_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "arcane_buy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "arcane_buy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "arcane_buy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("arcane_buy" + gen.id).style.width =
                        "auto"
                }

                n = 3n - (game.arcane_spice_bought[gen.id] % 3n)
                price = game.arcane_spice_price[gen.id]
                    .mul(1 - 3 ** n.toString())
                    .div(-2)
                document.getElementById("arcane_ucost" + gen.id).innerHTML =
                    "-" + format_inum(price.round(), game.notation) + " ᚫ"
                if (game.ansuz.cmp(price) >= 0) {
                    document.getElementById("arcane_ucost" + gen.id).className =
                        "rune_cost"
                    document.getElementById("arcane_ubuy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("arcane_ucost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("arcane_ubuy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("arcane_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "arcane_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById(
                        "arcane_ubuy" + gen.id
                    ).style.width = "auto"

                    let width2 =
                        (document.getElementById("arcane_ubuy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById(
                                        "arcane_ubuy" + gen.id
                                    )
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "arcane_ubuy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "arcane_ubuy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById(
                        "arcane_ubuy" + gen.id
                    ).style.width = "auto"
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
            antispice_boosts =
                1 + get_antispice_amount("yellow").log(10) ** (2 / 3) * 40
            if (game.collapse_challenge !== 0)
                antispice_boosts =
                    1 + get_antispice_amount("yellow").log(10) ** (2 / 3) * 20
        }

        if (game.antispice_bought[4]) antispice_boosts *= 1.175

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
                    Decimal.pow(9, game.arcane_strengthener).pow(
                        antispice_boosts
                    ),
                    game.notation
                ) +
                "x"
        }

        document.getElementById("arcane_info_s").innerHTML = s_str
        document.getElementById("arcane_cost_s").innerHTML =
            "-" +
            format_inum(game.arcane_strengthener_price.round(), game.notation) +
            " ᚫ"
        if (game.ansuz.cmp(game.arcane_strengthener_price) >= 0) {
            document.getElementById("arcane_cost_s").className = "rune_cost"
            document.getElementById("arcane_buy_s").className =
                "spice_buy can_buy"
        } else {
            document.getElementById("arcane_cost_s").className = "empty_cost"
            document.getElementById("arcane_buy_s").className = "spice_buy"
        }

        if (game.reduce_flashing) {
            let width =
                (document.getElementById("arcane_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(
                            document.getElementById("arcane_buy_s")
                        )["font-size"]
                    ) -
                0.8

            document.getElementById("arcane_buy_s").style.width = "auto"

            let width2 =
                (document.getElementById("arcane_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(
                            document.getElementById("arcane_buy_s")
                        )["font-size"]
                    ) -
                0.8

            if (width2 > width) {
                document.getElementById("arcane_buy_s").style.width =
                    width2 + 0.89 + "em"
            } else {
                document.getElementById("arcane_buy_s").style.width =
                    width + 0.89 + "em"
            }
        } else {
            document.getElementById("arcane_buy_s").style.width = "auto"
        }
    } else {
        document.getElementById("arcane_gen_s").style.display = "none"
    }

    let antispice_infusions = 1
    if (game.antispice[3].cmp(1) >= 0) {
        antispice_infusions =
            1 + get_antispice_amount("green").log(10) ** 0.5 * 0.15
        if (game.collapse_challenge !== 0)
            antispice_infusions =
                1 + get_antispice_amount("green").log(10) ** 0.5 * 0.075
    }

    if (game.antispice_bought[5]) antispice_infusions *= 1.06

    let s_str =
        "You have " +
        format_small(game.arcane_enchantment) +
        " arcane enchantments,<br>boosting all crystallized spice generators " +
        format_idec(
            Decimal.pow(
                4,
                game.arcane_enchantment.toString() * 180 * antispice_infusions
            ),
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
                    (
                        game.arcane_enchantment + game.free_enchantment
                    ).toString() *
                        180 *
                        antispice_infusions
                ),
                game.notation
            ) +
            "x"
    }

    if (game.ascend_bought[29] || game.collapse >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[29]
        ) {
            s_str +=
                ",<br>and boosting all arcane spice generators " +
                format_dec(1, game.notation) +
                "x"
        } else {
            if (game.free_enchantment > 0n) {
                s_str +=
                    ",<br>and boosting all arcane spice generators " +
                    format_idec(
                        Decimal.pow(
                            13 / 12,
                            (
                                game.arcane_enchantment + game.free_enchantment
                            ).toString() * antispice_infusions
                        ),
                        game.notation
                    ) +
                    "x"
            } else {
                s_str +=
                    ",<br>and boosting all arcane spice generators " +
                    format_idec(
                        Decimal.pow(
                            13 / 12,
                            game.arcane_enchantment.toString() *
                                antispice_infusions
                        ),
                        game.notation
                    ) +
                    "x"
            }
        }
    }

    if (game.ascend_challenge === 5 || game.collapse_challenge === 7) {
        s_str = "Arcane enchantments refresh spice production for 1 second"
    }

    document.getElementById("arcane_info_n").innerHTML = s_str
    document.getElementById("arcane_cost_n").innerHTML =
        "-" +
        format_idec(game.arcane_enchantment_price, game.notation) +
        arcane_unit +
        " arcane spice"
    if (game.arcane_spice.cmp(game.arcane_enchantment_price) >= 0) {
        document.getElementById("arcane_cost_n").className = "arcane_cost"
        document.getElementById("arcane_buy_n").className = "spice_buy can_buy"
    } else {
        document.getElementById("arcane_cost_n").className = "empty_cost"
        document.getElementById("arcane_buy_n").className = "spice_buy"
    }

    if (game.reduce_flashing) {
        let width =
            (document.getElementById("arcane_buy_n").offsetWidth - 1) /
                parseFloat(
                    getComputedStyle(document.getElementById("arcane_buy_n"))[
                        "font-size"
                    ]
                ) -
            0.8

        document.getElementById("arcane_buy_n").style.width = "auto"

        let width2 =
            (document.getElementById("arcane_buy_n").offsetWidth - 1) /
                parseFloat(
                    getComputedStyle(document.getElementById("arcane_buy_n"))[
                        "font-size"
                    ]
                ) -
            0.8

        if (width2 > width) {
            document.getElementById("arcane_buy_n").style.width =
                width2 + 0.89 + "em"
        } else {
            document.getElementById("arcane_buy_n").style.width =
                width + 0.89 + "em"
        }
    } else {
        document.getElementById("arcane_buy_n").style.width = "auto"
    }

    if (game.arcane_max_unlocked) {
        document.getElementById("arcane_max_all").style.display = "inline"
    } else {
        document.getElementById("arcane_max_all").style.display = "none"
    }

    if (game.ascend_bought[17])
        document.getElementById("enchantment_auto").style.display = "inline"
    else document.getElementById("enchantment_auto").style.display = "none"

    if (game.research_complete[11] >= 1)
        document.getElementById("arcane_auto").style.display = "inline"
    else document.getElementById("arcane_auto").style.display = "none"
}

//graphics updates for collapse
function collapse_update() {
    let collapse_amount = game.collapse_spice.pow(7.125e-10).floor()

    if (collapse_amount.cmp(Decimal.pow(10, 670)) >= 0) {
        collapse_amount = collapse_amount
            .div(Decimal.pow(10, 130))
            .pow(80 / ((collapse_amount.log(10) * 16 + 729) ** 0.5 + 53))
            .mul(Decimal.pow(10, 130))

        if (collapse_amount.cmp(Decimal.pow(10, 1400)) >= 0)
            collapse_amount = collapse_amount
                .div(Decimal.pow(10, 1400))
                .pow(0.5)
                .mul(Decimal.pow(10, 1400))

        if (collapse_amount.cmp(Decimal.pow(10, 10000)) >= 0)
            collapse_amount = collapse_amount
                .div(Decimal.pow(10, 10000))
                .pow(100 / ((collapse_amount.log(10) - 7500) ** 0.5 + 50))
                .mul(Decimal.pow(10, 10000))
    } else if (collapse_amount.cmp(Decimal.pow(10, 130)) >= 0) {
        collapse_amount = collapse_amount
            .div(Decimal.pow(10, 130))
            .pow(0.5)
            .mul(Decimal.pow(10, 130))
    }

    if (game.research_complete[5] >= 1 && game.collapse_challenge === 0) {
        let rune_atomic = game.total_rune_power
            .pow(1 / 150)
            .div(2e18)
            .add(1)
        if (rune_atomic.cmp(Decimal.pow(2, 1024)) >= 0)
            rune_atomic = Decimal.pow(
                10,
                (rune_atomic.log(10) / Decimal.pow(2, 1024).log(10)) ** 0.5 *
                    Decimal.pow(2, 1024).log(10)
            )
        let a = Decimal.pow(2, 3072).log(10)
        if (rune_atomic.cmp(Decimal.pow(2, 3072)) >= 0)
            rune_atomic = Decimal.pow(10, 2 * a - a ** 2 / rune_atomic.log(10))
        collapse_amount = collapse_amount.mul(rune_atomic)
    }

    let total_completions = 0
    for (let i = 0; i < 6; i++) {
        total_completions += game.collapse_complete[i]
    }
    if (game.research_complete[24] >= 1 && game.collapse_challenge === 0)
        collapse_amount = collapse_amount.mul(
            Decimal.pow(46656, total_completions)
        )

    let goal = new Decimal(1)
    if (game.collapse_challenge !== 0) {
        goal = get_collapse_goal(game.collapse_challenge - 7, 0)
    }

    if (
        (game.ascend_complete[5] || game.collapse_challenge === 11) &&
        collapse_amount.cmp(goal) >= 0
    ) {
        document.getElementById("collapse_button").className =
            "collapse_button co_unlocked"
        document.getElementById("collapse_up").style.display = "block"
        document.getElementById("collapse_up").innerHTML =
            "+" +
            format_inum(collapse_amount.floor(), game.notation) +
            " atomic spice"
        document.getElementById("collapse_req").style.color = "white"

        if (goal.cmp(1) === 1) {
            if (game.research_complete[31] >= 1) {
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

        if (game.resource_efficiency && game.collapse_challenge === 0) {
            document.getElementById("collapse_efficiency").style.display =
                "block"

            let efficiency_str =
                "Currently: +" +
                format_idec(
                    collapse_amount.div(game.collapse_time_played).mul(60),
                    game.notation
                ) +
                " atomic spice/min"

            if (game.research_complete[17] >= 1) {
                switch (game.autoco_mode) {
                    case 0:
                        efficiency_str +=
                            "<br>Peak: +" +
                            format_idec(
                                game.peak_atomic_gain.mul(60),
                                game.notation
                            ) +
                            " atomic spice/min at +" +
                            format_idec(
                                game.peak_atomic_amount,
                                game.notation
                            ) +
                            " atomic spice"
                        break
                    case 1:
                        if (game.peak_atomic_time < 1)
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_atomic_gain.mul(60),
                                    game.notation
                                ) +
                                " atomic spice/min at " +
                                game.peak_atomic_time.toFixed(2) +
                                "s"
                        else
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_atomic_gain.mul(60),
                                    game.notation
                                ) +
                                " atomic spice/min at " +
                                format_dec(
                                    game.peak_atomic_time,
                                    game.notation
                                ) +
                                "s"
                        break
                    case 2:
                        if (game.unstable_spice.cmp(0.5) >= 0) {
                            efficiency_str +=
                                "<br>Waiting for unstable spice to completely decay"
                        } else {
                            let decay_peak_time =
                                game.peak_atomic_time - game.decay_time
                            if (decay_peak_time < 0) {
                                efficiency_str += "<br>Waiting for peak"
                            } else {
                                if (decay_peak_time < 1)
                                    efficiency_str +=
                                        "<br>Peak: +" +
                                        format_idec(
                                            game.peak_atomic_gain.mul(60),
                                            game.notation
                                        ) +
                                        " atomic spice/min at " +
                                        decay_peak_time.toFixed(2) +
                                        "s after max decayed spice"
                                else
                                    efficiency_str +=
                                        "<br>Peak: +" +
                                        format_idec(
                                            game.peak_atomic_gain.mul(60),
                                            game.notation
                                        ) +
                                        " atomic spice/min at " +
                                        format_dec(
                                            decay_peak_time,
                                            game.notation
                                        ) +
                                        "s after max decayed spice"
                            }
                        }
                        break
                }
            } else {
                efficiency_str +=
                    "<br>Peak: +" +
                    format_idec(game.peak_atomic_gain.mul(60), game.notation) +
                    " atomic spice/min"
            }

            document.getElementById("collapse_efficiency").innerHTML =
                efficiency_str
        } else {
            document.getElementById("collapse_efficiency").style.display =
                "none"
        }
    } else {
        document.getElementById("collapse_button").className =
            "collapse_button co_locked"
        document.getElementById("collapse_up").style.display = "none"
        document.getElementById("collapse_req").style.color = "grey"

        if (
            (game.ascend_complete[5] || game.collapse_challenge === 11) &&
            goal.cmp(1) === 1
        ) {
            document.getElementById("collapse_req").innerHTML =
                "+" +
                format_inum(goal, game.notation) +
                " atomic spice required"
            document.getElementById("collapse_up").style.display = "block"
            document.getElementById("collapse_up").innerHTML =
                "+" +
                format_inum(collapse_amount.floor(), game.notation) +
                " atomic spice"
        } else {
            document.getElementById("collapse_req").innerHTML =
                "Challenge 6 required"
        }

        if (game.resource_efficiency) {
            document.getElementById("collapse_efficiency").style.display =
                "block"

            let efficiency_str =
                "Currently: +" +
                format_dec(0, game.notation) +
                " atomic spice/min"

            efficiency_str +=
                "<br>Peak: +" +
                format_dec(0, game.notation) +
                " atomic spice/min"

            document.getElementById("collapse_efficiency").innerHTML =
                efficiency_str
        } else {
            document.getElementById("collapse_efficiency").style.display =
                "none"
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

    if (game.atomic_spice.pow(game.atomic_efficiency).floor().cmp(1) >= 0) {
        document.getElementById("activate_collider").className =
            "atomic_button co_unlocked"
    } else {
        document.getElementById("activate_collider").className =
            "atomic_button co_locked"
    }

    let spice_unit = " g"
    let rainbow_unit = " μg"
    if (game.notation === 14) {
        spice_unit = ""
        rainbow_unit = ""
    }

    if (game.collider_tab === 0) {
        if (game.research_complete[19] >= 1) {
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

            if (
                game.atomic_spice
                    .mul(game.atomic_portion)
                    .pow(game.atomic_efficiency)
                    .floor()
                    .cmp(1) >= 0
            ) {
                document.getElementById("activate_collider").className =
                    "atomic_button co_unlocked"
            } else {
                document.getElementById("activate_collider").className =
                    "atomic_button co_locked"
            }
        } else {
            document.getElementById("collider_portion").style.display = "none"
            document.getElementById("collider_resource").innerHTML =
                "Activating the Spice Collider will consume all atomic spice and create unstable spice"
        }
    } else if (game.collider_tab === 1) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create basic antispice<br>Basic antispice gains are calculated based on total atomic spice used"

        let amount = game.atomic_spice
            .mul(game.atomic_portion)
            .add(game.spent_atomic_spice[0])
            .pow(game.atomic_efficiency / 76)
        if (amount.cmp(Decimal.pow(10, 170)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 170))
                .pow(0.6)
                .mul(Decimal.pow(10, 170))
        if (amount.cmp(Decimal.pow(10, 515)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 515) ** 0.67 * 515)
        let yield_str =
            "Expected yield: <span class='pure_antispice'>+" +
            format_inum(amount.sub(game.antispice[0]).floor(), game.notation) +
            " basic antispice</span>"
        if (amount.sub(game.antispice[0]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='pure_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " basic antispice</span>"

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

        if (amount.sub(game.antispice[0]).floor().cmp(1) >= 0) {
            document.getElementById("activate_collider").className =
                "atomic_button co_unlocked"
        } else {
            document.getElementById("activate_collider").className =
                "atomic_button co_locked"
        }
    } else if (game.collider_tab === 2) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create red antispice<br>Red antispice gains are calculated based on total atomic spice used and total red spice"

        let red_amount = Decimal.pow(
            10,
            (game.antitotal_spice[1].log(10) / 1e11) ** 0.5
        ).div(17)
        if (red_amount.cmp(Decimal.pow(10, 2319)) >= 0)
            red_amount = Decimal.pow(
                10,
                (red_amount.log(10) / 2319) ** 0.5 * 2319
            )

        let atomic_amount = game.spent_atomic_spice[1]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 228)
            .div(3.2)

        let amount = atomic_amount.mul(red_amount)
        if (amount.cmp(Decimal.pow(10, 128)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 128))
                .pow(0.5)
                .mul(Decimal.pow(10, 128))
        if (amount.cmp(Decimal.pow(10, 269)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 269))
                .pow(0.5)
                .mul(Decimal.pow(10, 269))
        if (amount.cmp(Decimal.pow(10, 450)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 450) ** 0.5 * 450)
        let yield_str =
            "Expected yield: <span class='red_antispice'>+" +
            format_inum(amount.sub(game.antispice[1]).floor(), game.notation) +
            " red antispice</span> (" +
            format_idec(atomic_amount, game.notation) +
            " x " +
            format_idec(red_amount, game.notation) +
            ")"
        if (amount.sub(game.antispice[1]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='red_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " red antispice</span>"

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
            spice_unit +
            " red spice</span><br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[1], game.notation) +
            " atomic spice</span>"

        if (amount.sub(game.antispice[1]).floor().cmp(1) >= 0) {
            document.getElementById("activate_collider").className =
                "atomic_button co_unlocked"
        } else {
            document.getElementById("activate_collider").className =
                "atomic_button co_locked"
        }
    } else if (game.collider_tab === 3) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create yellow antispice<br>Yellow antispice gains are calculated based on total atomic spice used and total yellow spice"

        let yellow_amount = Decimal.pow(
            10,
            (game.antitotal_spice[2].log(10) / 2e11) ** 0.5
        ).div(38.5)
        if (yellow_amount.cmp(Decimal.pow(10, 1019)) >= 0)
            yellow_amount = Decimal.pow(
                10,
                (yellow_amount.log(10) / 1019) ** 0.4 * 1019
            )

        let atomic_amount = game.spent_atomic_spice[2]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 304)
            .div(54)

        let amount = atomic_amount.mul(yellow_amount)
        if (amount.cmp(Decimal.pow(10, 87)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 87))
                .pow(0.55)
                .mul(Decimal.pow(10, 87))
        if (amount.cmp(Decimal.pow(10, 372)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 372) ** 0.5 * 372)
        let yield_str =
            "Expected yield: <span class='yellow_antispice'>+" +
            format_inum(amount.sub(game.antispice[2]).floor(), game.notation) +
            " yellow antispice</span> (" +
            format_idec(atomic_amount, game.notation) +
            " x " +
            format_idec(yellow_amount, game.notation) +
            ")"
        if (amount.sub(game.antispice[2]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='yellow_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " yellow antispice</span>"

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
            spice_unit +
            " yellow spice</span><br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[2], game.notation) +
            " atomic spice</span>"

        if (amount.sub(game.antispice[2]).floor().cmp(1) >= 0) {
            document.getElementById("activate_collider").className =
                "atomic_button co_unlocked"
        } else {
            document.getElementById("activate_collider").className =
                "atomic_button co_locked"
        }
    } else if (game.collider_tab === 4) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create green antispice<br>Green antispice gains are calculated based on total atomic spice used and total green spice"

        let green_amount = Decimal.pow(
            10,
            (game.antitotal_spice[3].log(10) / 3e11) ** 0.5
        ).div(2340)
        if (green_amount.cmp(Decimal.pow(10, 504)) >= 0)
            green_amount = Decimal.pow(
                10,
                (green_amount.log(10) / 504) ** 0.75 * 504
            )

        let atomic_amount = game.spent_atomic_spice[3]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 380)
            .div(108000)

        let amount = atomic_amount.mul(green_amount)
        if (amount.cmp(Decimal.pow(10, 56)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 56))
                .pow(0.55)
                .mul(Decimal.pow(10, 56))
        if (amount.cmp(Decimal.pow(10, 225)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 225) ** 0.5 * 225)
        let yield_str =
            "Expected yield: <span class='green_antispice'>+" +
            format_inum(amount.sub(game.antispice[3]).floor(), game.notation) +
            " green antispice</span> (" +
            format_idec(atomic_amount, game.notation) +
            " x " +
            format_idec(green_amount, game.notation) +
            ")"
        if (amount.sub(game.antispice[3]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='green_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " green antispice</span>"

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
            spice_unit +
            " green spice</span><br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[3], game.notation) +
            " atomic spice</span>"

        if (amount.sub(game.antispice[3]).floor().cmp(1) >= 0) {
            document.getElementById("activate_collider").className =
                "atomic_button co_unlocked"
        } else {
            document.getElementById("activate_collider").className =
                "atomic_button co_locked"
        }
    } else if (game.collider_tab === 5) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create blue antispice<br>Blue antispice gains are calculated based on total atomic spice used and total blue spice"

        let blue_amount = Decimal.pow(
            10,
            (game.antitotal_spice[4].log(10) / 5e11) ** 0.5
        ).div(8.667e9)
        if (blue_amount.cmp(Decimal.pow(10, 216)) >= 0)
            blue_amount = Decimal.pow(
                10,
                (blue_amount.log(10) / 216) ** 0.8 * 216
            )

        let atomic_amount = game.spent_atomic_spice[4]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 494)
            .div(5.587e15)

        let amount = atomic_amount.mul(blue_amount)
        if (amount.cmp(Decimal.pow(10, 40)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 40))
                .pow(0.55)
                .mul(Decimal.pow(10, 40))
        if (amount.cmp(Decimal.pow(10, 125)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 125) ** 0.5 * 125)
        let yield_str =
            "Expected yield: <span class='blue_antispice'>+" +
            format_inum(amount.sub(game.antispice[4]).floor(), game.notation) +
            " blue antispice</span> (" +
            format_idec(atomic_amount, game.notation) +
            " x " +
            format_idec(blue_amount, game.notation) +
            ")"
        if (amount.sub(game.antispice[4]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='blue_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " blue antispice</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic spice input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic spice</span><br>Atomic spice efficiency: " +
            format_num(Math.round(game.atomic_efficiency * 100), 0) +
            "%<br>Blue spice input: <span class='blue_spice'>" +
            format_inum(game.antitotal_spice[4], game.notation) +
            spice_unit +
            " blue spice</span><br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[4], game.notation) +
            " atomic spice</span>"

        if (amount.sub(game.antispice[4]).floor().cmp(1) >= 0) {
            document.getElementById("activate_collider").className =
                "atomic_button co_unlocked"
        } else {
            document.getElementById("activate_collider").className =
                "atomic_button co_locked"
        }
    } else if (game.collider_tab === 6) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create pink antispice<br>Pink antispice gains are calculated based on total atomic spice used and total pink spice"

        let pink_amount = Decimal.pow(
            10,
            (game.antitotal_spice[5].log(10) / 8e11) ** 0.5
        ).div(2.255e9)
        if (pink_amount.cmp(Decimal.pow(10, 70)) >= 0)
            pink_amount = Decimal.pow(
                10,
                (pink_amount.log(10) / 70) ** 0.6 * 70
            )

        let atomic_amount = game.spent_atomic_spice[5]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 608)
            .div(8.098e34)

        let amount = atomic_amount.mul(pink_amount)
        if (amount.cmp(Decimal.pow(10, 88)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 88) ** 0.5 * 88)
        let yield_str =
            "Expected yield: <span class='pink_antispice'>+" +
            format_inum(amount.sub(game.antispice[5]).floor(), game.notation) +
            " pink antispice</span> (" +
            format_idec(atomic_amount, game.notation) +
            " x " +
            format_idec(pink_amount, game.notation) +
            ")"
        if (amount.sub(game.antispice[5]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='pink_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " pink antispice</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic spice input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic spice</span><br>Atomic spice efficiency: " +
            format_num(Math.round(game.atomic_efficiency * 100), 0) +
            "%<br>Pink spice input: <span class='pink_spice'>" +
            format_inum(game.antitotal_spice[5], game.notation) +
            spice_unit +
            " pink spice</span><br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[5], game.notation) +
            " atomic spice</span>"

        if (amount.sub(game.antispice[5]).floor().cmp(1) >= 0) {
            document.getElementById("activate_collider").className =
                "atomic_button co_unlocked"
        } else {
            document.getElementById("activate_collider").className =
                "atomic_button co_locked"
        }
    } else if (game.collider_tab === 7) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the Spice Collider will consume some atomic spice and create rainbow antispice<br>Rainbow antispice gains are calculated based on total atomic spice used and total rainbow spice"

        let rainbow_amount =
            (game.antitotal_spice[6].log(10) - 28550000) / 5400000
        if (rainbow_amount > 0.5)
            rainbow_amount = ((rainbow_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
        else rainbow_amount = 0.5
        if (rainbow_amount > 24) rainbow_amount = 24

        let atomic_amount =
            (game.spent_atomic_spice[6]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .log(10) -
                32768) /
            1984
        if (atomic_amount > 0.5)
            atomic_amount = ((atomic_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
        else atomic_amount = 0.5
        if (atomic_amount > 24) atomic_amount = 24

        let amount =
            Math.floor(atomic_amount + rainbow_amount) -
            game.total_rainbow_antispice
        let yield_str =
            "Expected yield: <span class='rainbow_antispice'>+" +
            format_num(amount, game.notation) +
            " rainbow antispice</span> (" +
            format_dec(((atomic_amount + rainbow_amount) % 1) * 100) +
            "% to next)" +
            " (" +
            format_dec(atomic_amount, game.notation) +
            " + " +
            format_dec(rainbow_amount, game.notation) +
            ")"
        if (atomic_amount + rainbow_amount >= 48)
            yield_str =
                "Expected yield: <span class='rainbow_antispice'>+" +
                format_num(amount, game.notation) +
                " rainbow antispice</span> (Maxed)"

        document.getElementById("collider_info").innerHTML =
            "Atomic spice input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic spice</span><br>Rainbow spice input: <span class='rainbow_spice'>" +
            format_inum(game.antitotal_spice[6], game.notation) +
            rainbow_unit +
            " rainbow spice</span><br>" +
            yield_str +
            "<br><br>Total atomic spice used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[6], game.notation) +
            " atomic spice</span>"

        if (amount >= 1) {
            document.getElementById("activate_collider").className =
                "atomic_button co_unlocked"
        } else {
            document.getElementById("activate_collider").className =
                "atomic_button co_locked"
        }
    }

    if (game.research_complete[30] >= 1) {
        document.getElementById("collider_auto").style.display = "inline"
    } else {
        document.getElementById("collider_auto").style.display = "none"
    }

    document.getElementById("unstable_spice_num").innerHTML = format_inum(
        game.unstable_spice.round(),
        game.notation
    )
    document.getElementById("unstable_boost").innerHTML =
        "Your unstable spice is decaying away with a half-life of " +
        format_time_long(game.halflife, game.notation, 1, true) +
        ",<br>the resulting energy is boosting all normal spice production " +
        format_idec(game.unstable_boost, game.notation) +
        "x"
    if (game.ascend_challenge !== 0) {
        document.getElementById("unstable_boost").innerHTML =
            "Your unstable spice is decaying away with a half-life of " +
            format_time_long(game.halflife, game.notation, 1, true) +
            ",<br>the resulting energy is boosting all normal spice production " +
            format_idec(game.unstable_boost, game.notation) +
            "x<br><br>Your unstable spice boosts have been reduced due to being in an Ascension challenge"
        if (game.research_complete[10] >= 1)
            document.getElementById("unstable_boost").innerHTML =
                "Your unstable spice is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation, 1, true) +
                ",<br>the resulting energy is boosting all normal spice production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized spice production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x,<br>and boosting arcane spice production " +
                format_idec(game.unstable_boost.pow(0.000012), game.notation) +
                "x<br><br>Your unstable spice boosts have been reduced due to being in an Ascension challenge"
        else if (game.research_complete[2] >= 1)
            document.getElementById("unstable_boost").innerHTML =
                "Your unstable spice is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation) +
                ",<br>the resulting energy is boosting all normal spice production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized spice production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x<br><br>Your unstable spice boosts have been reduced due to being in an Ascension challenge"
    } else {
        if (game.collapse_complete[1] >= 1)
            document.getElementById("unstable_boost").innerHTML =
                "Your unstable spice is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation, 1, true) +
                ",<br>the resulting energy is boosting all normal spice production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized spice production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x,<br>and boosting arcane spice production " +
                format_idec(game.unstable_boost.pow(0.000012), game.notation) +
                "x,<br>and has produced " +
                format_inum(game.free_deity, game.notation) +
                " arcane spice deities"
        else if (game.research_complete[10] >= 1)
            document.getElementById("unstable_boost").innerHTML =
                "Your unstable spice is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation, 1, true) +
                ",<br>the resulting energy is boosting all normal spice production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized spice production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x,<br>and boosting arcane spice production " +
                format_idec(game.unstable_boost.pow(0.000012), game.notation) +
                "x"
        else if (game.research_complete[2] >= 1)
            document.getElementById("unstable_boost").innerHTML =
                "Your unstable spice is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation) +
                ",<br>the resulting energy is boosting all normal spice production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized spice production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x"
        if (game.collapse_challenge === 8)
            document.getElementById("unstable_boost").innerHTML =
                "Your unstable spice is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation, 1, true) +
                ",<br>and has created " +
                format_inum(game.free_deity, game.notation) +
                " sixth generators of all types"
        if (game.collapse_challenge === 12)
            document.getElementById("unstable_boost").innerHTML =
                "Your unstable spice is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation, 1, true) +
                ",<br>the resulting energy is boosting all normal spice production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and has produced " +
                format_inum(game.free_deity, game.notation) +
                " arcane spice deities"
    }
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

    if (game.research_complete[17] >= 1 && game.collapse_challenge === 0) {
        document.getElementById("collapse_info2").style.display = "none"
        document.getElementById("collapse_auto_block").style.display = "block"

        document.getElementById("collider_title").className =
            "collapse_title atomic_spice co_auto_margin"

        if (game.autoco_mode === 0) {
            document.getElementById("collapse_spice").style.display = "flex"
            document.getElementById("collapse_time").style.display = "none"
            document.getElementById("collapse_decay").style.display = "none"
        } else if (game.autoco_mode === 1) {
            document.getElementById("collapse_spice").style.display = "none"
            document.getElementById("collapse_time").style.display = "flex"
            document.getElementById("collapse_decay").style.display = "none"
        } else if (game.autoco_mode === 2) {
            document.getElementById("collapse_spice").style.display = "none"
            document.getElementById("collapse_time").style.display = "none"
            document.getElementById("collapse_decay").style.display = "flex"
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
            if (game.collapse === 4)
                document.getElementById("research_unlock").innerHTML =
                    "<br>Collapse " +
                    format_small(1) +
                    " time to unlock Research"
            else
                document.getElementById("research_unlock").innerHTML =
                    "<br>Collapse " +
                    format_small(5 - game.collapse) +
                    " times to unlock Research"
        }
    }

    if (game.research_complete[20] >= 1) {
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

    if (game.research_complete[21] >= 1) {
        document.getElementById("collider_tabs").style.display = "flex"

        document.getElementById("antispice").innerHTML = "ANTISPICE"
        if (game.subtab[4] === 3)
            document.getElementById("antispice").className = "subtab selected"
        else document.getElementById("antispice").className = "subtab unlocked"

        if (game.research_complete[23] >= 1) {
            document.getElementById("collider_tab3").style.display = "block"
        } else {
            document.getElementById("collider_tab3").style.display = "none"
        }

        if (game.research_complete[26] >= 1) {
            document.getElementById("collider_tab4").style.display = "block"
        } else {
            document.getElementById("collider_tab4").style.display = "none"
        }

        if (game.research_complete[29] >= 1) {
            document.getElementById("collider_tab5").style.display = "block"
        } else {
            document.getElementById("collider_tab5").style.display = "none"
        }

        if (game.research_complete[33] >= 1) {
            document.getElementById("collider_tab6").style.display = "block"
        } else {
            document.getElementById("collider_tab6").style.display = "none"
        }

        if (game.research_complete[36] >= 1) {
            document.getElementById("collider_tab7").style.display = "block"
        } else {
            document.getElementById("collider_tab7").style.display = "none"
        }

        if (game.research_complete[39] >= 1) {
            document.getElementById("collider_tab8").style.display = "block"
        } else {
            document.getElementById("collider_tab8").style.display = "none"
        }

        document.getElementById("collider_tab1").className = "spice_buy"
        document.getElementById("collider_tab2").className = "spice_buy"
        document.getElementById("collider_tab3").className = "spice_buy"
        document.getElementById("collider_tab4").className = "spice_buy"
        document.getElementById("collider_tab5").className = "spice_buy"
        document.getElementById("collider_tab6").className = "spice_buy"
        document.getElementById("collider_tab7").className = "spice_buy"
        document.getElementById("collider_tab8").className = "spice_buy"

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
            case 5:
                document.getElementById("collider_tab6").className =
                    "spice_buy current_tab"
                break
            case 6:
                document.getElementById("collider_tab7").className =
                    "spice_buy current_tab"
                break
            case 7:
                document.getElementById("collider_tab8").className =
                    "spice_buy current_tab"
                break
        }
    } else {
        document.getElementById("collider_tabs").style.display = "none"

        document.getElementById("antispice").innerHTML = "LOCKED"
        document.getElementById("antispice").className = "subtab locked"
    }

    if (game.collapse_challenge !== 0) {
        document.getElementById("exit_collapse_challenge").style.display =
            "block"
    } else {
        document.getElementById("exit_collapse_challenge").style.display =
            "none"
    }

    if (total_completions >= 30) {
        document.getElementById("collapse_challenge_info").innerHTML =
            "Entering a Collapse Challenge will reset your current Collapse" +
            "<br>You must Collapse for the required amount of atomic spice to complete the Challenge" +
            "<br><br>Collapse automation and atomic spice multipliers are disabled in Collapse Challenges," +
            "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
            "<br><br>You have a total of " +
            format_small(total_completions) +
            " Collapse challenge completions."
    } else if (total_completions > 1) {
        document.getElementById("collapse_challenge_info").innerHTML =
            "Entering a Collapse Challenge will reset your current Collapse" +
            "<br>You must Collapse for the required amount of atomic spice to complete the Challenge" +
            "<br><br>Collapse automation and atomic spice multipliers are disabled in Collapse Challenges," +
            "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
            "<br><br>You have a total of " +
            format_small(total_completions) +
            " Collapse challenge completions." +
            "<br>Reach " +
            format_small(30) +
            " total Collapse challenge completions to unlock Research #31."
    } else if (total_completions === 1) {
        document.getElementById("collapse_challenge_info").innerHTML =
            "Entering a Collapse Challenge will reset your current Collapse" +
            "<br>You must Collapse for the required amount of atomic spice to complete the Challenge" +
            "<br><br>Collapse automation and atomic spice multipliers are disabled in Collapse Challenges," +
            "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
            "<br><br>You have a total of " +
            format_small(1) +
            " Collapse challenge completion." +
            "<br>Reach " +
            format_small(30) +
            " total Collapse challenge completions to unlock Research #31."
    } else {
        document.getElementById("collapse_challenge_info").innerHTML =
            "Entering a Collapse Challenge will reset your current Collapse" +
            "<br>You must Collapse for the required amount of atomic spice to complete the Challenge" +
            "<br><br>Collapse automation and atomic spice multipliers are disabled in Collapse Challenges," +
            "<br>and Collapse Challenge rewards do not apply in the Challenge they're from"
    }

    let reward_scaling = 1
    let reward_scaling9 = 1
    if (game.antispice_bought[1]) {
        reward_scaling = 1.05
        reward_scaling9 = 1.0703893278913979
    }

    for (const c of collapse_challenge.challenges) {
        switch (c.id) {
            case 0:
                c.desc = "Challenges 1, 3, 4, & 5 simultaneously"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: Normal spice multipliers are " +
                        format_dec(2.5 * reward_scaling, game.notation) +
                        "% stronger<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] === 1) {
                    c.desc +=
                        "<br>Currently: Normal spice multipliers are " +
                        format_dec(2.5 * reward_scaling, game.notation) +
                        "% stronger<br>Next: Normal spice multipliers are " +
                        format_dec(5 * reward_scaling, game.notation) +
                        "% stronger<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] === 2) {
                    c.desc +=
                        "<br>Currently: Normal spice multipliers are " +
                        format_dec(5 * reward_scaling, game.notation) +
                        "% stronger<br>Next: Normal spice multipliers are " +
                        format_dec(7.5 * reward_scaling, game.notation) +
                        "% stronger<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] >= 12) {
                    c.desc +=
                        "<br>Currently: Normal spice multipliers are " +
                        format_dec(
                            (game.collapse_complete[c.id] * 1.5 + 12) *
                                reward_scaling,
                            game.notation
                        ) +
                        "% stronger<br>Next: Normal spice multipliers are " +
                        format_dec(
                            (game.collapse_complete[c.id] * 1.5 + 13.5) *
                                reward_scaling,
                            game.notation
                        ) +
                        "% stronger"
                } else {
                    c.desc +=
                        "<br>Currently: Normal spice multipliers are " +
                        format_dec(
                            game.collapse_complete[c.id] * 2.5 * reward_scaling,
                            game.notation
                        ) +
                        "% stronger<br>Next: Normal spice multipliers are " +
                        format_dec(
                            (game.collapse_complete[c.id] * 2.5 + 2.5) *
                                reward_scaling,
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
                        "<br>Reward: Unstable spice decay now also produces arcane spice deities<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] === 1) {
                    c.desc +=
                        "<br>Currently: Unstable spice decay has produced " +
                        format_inum(
                            game.unstable_boost
                                .pow((2 * reward_scaling) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next: Unstable spice decay will produce " +
                        format_inum(
                            game.unstable_boost
                                .pow((3 * reward_scaling) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next research unlock in " +
                        format_small(2) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 2) {
                    c.desc +=
                        "<br>Currently: Unstable spice decay has produced " +
                        format_inum(
                            game.unstable_boost
                                .pow((3 * reward_scaling) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next: Unstable spice decay will produce " +
                        format_inum(
                            game.unstable_boost
                                .pow((4 * reward_scaling) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] === 3) {
                    c.desc +=
                        "<br>Currently: Unstable spice decay has produced " +
                        format_inum(
                            game.unstable_boost
                                .pow((4 * reward_scaling) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next: Unstable spice decay will produce " +
                        format_inum(
                            game.unstable_boost
                                .pow((5 * reward_scaling) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next research unlock in " +
                        format_small(2) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 4) {
                    c.desc +=
                        "<br>Currently: Unstable spice decay has produced " +
                        format_inum(
                            game.unstable_boost
                                .pow((5 * reward_scaling) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next: Unstable spice decay will produce " +
                        format_inum(
                            game.unstable_boost
                                .pow((6 * reward_scaling) / 60000)
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else {
                    c.desc +=
                        "<br>Currently: Unstable spice decay has produced " +
                        format_inum(
                            game.unstable_boost
                                .pow(
                                    ((1 + game.collapse_complete[c.id]) *
                                        reward_scaling) /
                                        60000
                                )
                                .floor()
                                .sub(1),
                            game.notation
                        ) +
                        " arcane spice deities<br>Next: Unstable spice decay will produce " +
                        format_inum(
                            game.unstable_boost
                                .pow(
                                    ((2 + game.collapse_complete[c.id]) *
                                        reward_scaling) /
                                        60000
                                )
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
                    format_small(100000) +
                    "x slower, reach the goal in 500 microseconds or less"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: The game runs " +
                        format_num(2 ** reward_scaling9, game.notation) +
                        "x faster<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 2) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(
                            2 **
                                (game.collapse_complete[c.id] *
                                    reward_scaling9),
                            game.notation
                        ) +
                        "x faster<br>Next: The game runs " +
                        format_num(
                            2 **
                                ((game.collapse_complete[c.id] + 1) *
                                    reward_scaling9),
                            game.notation
                        ) +
                        "x faster<br>Next research unlock in " +
                        format_small(4 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 3) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(8 ** reward_scaling9, game.notation) +
                        "x faster<br>Next: The game runs " +
                        format_num(16 ** reward_scaling9, game.notation) +
                        "x faster<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 5) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(
                            2 **
                                (game.collapse_complete[c.id] *
                                    reward_scaling9),
                            game.notation
                        ) +
                        "x faster<br>Next: The game runs " +
                        format_num(
                            2 **
                                ((game.collapse_complete[c.id] + 1) *
                                    reward_scaling9),
                            game.notation
                        ) +
                        "x faster<br>Next research unlock in " +
                        format_small(7 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 6) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(64 ** reward_scaling9, game.notation) +
                        "x faster<br>Next: The game runs " +
                        format_num(192 ** reward_scaling9, game.notation) +
                        "x faster<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(
                            (32 *
                                factorial(game.collapse_complete[c.id] - 4)) **
                                reward_scaling9,
                            game.notation
                        ) +
                        "x faster<br>Next: The game runs " +
                        format_num(
                            (32 *
                                factorial(game.collapse_complete[c.id] - 3)) **
                                reward_scaling9,
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
                        format_small(Math.round(4194304 * reward_scaling)) +
                        " color boosts<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 3) {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(
                            Math.round(
                                (2097152 +
                                    2097152 * game.collapse_complete[c.id]) *
                                    reward_scaling
                            )
                        ) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(
                            Math.round(
                                (4194304 +
                                    2097152 * game.collapse_complete[c.id]) *
                                    reward_scaling
                            )
                        ) +
                        " color boosts<br>Next research unlock in " +
                        format_small(5 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 4) {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(Math.round(10485760 * reward_scaling)) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(Math.round(12582912 * reward_scaling)) +
                        " color boosts<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 7) {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(
                            Math.round(
                                (2097152 +
                                    2097152 * game.collapse_complete[c.id]) *
                                    reward_scaling
                            )
                        ) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(
                            Math.round(
                                (4194304 +
                                    2097152 * game.collapse_complete[c.id]) *
                                    reward_scaling
                            )
                        ) +
                        " color boosts<br>Next research unlock in " +
                        format_small(9 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 8) {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(Math.round(18874368 * reward_scaling)) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(Math.round(20971520 * reward_scaling)) +
                        " color boosts<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(
                            Math.round(
                                (2097152 +
                                    2097152 * game.collapse_complete[c.id]) *
                                    reward_scaling
                            )
                        ) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(
                            Math.round(
                                (4194304 +
                                    2097152 * game.collapse_complete[c.id]) *
                                    reward_scaling
                            )
                        ) +
                        " color boosts"
                }
                break
            case 4:
                c.desc =
                    "Ascension is disabled, but Challenge 6 is not required to Collapse"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: You gain " +
                        format_num(1, game.notation) +
                        "% of your pending Ansuz runes every second<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] === 1) {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_num(1, game.notation) +
                        "% of your pending Ansuz runes every second<br>Next: You gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    2 *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next research unlock in " +
                        format_small(5) +
                        " completions"
                } else if (game.collapse_complete[c.id] <= 4) {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_num(1, game.notation) +
                        "% of your pending Ansuz runes every second,<br>and you gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    game.collapse_complete[c.id] *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next: You gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    (game.collapse_complete[c.id] + 1) *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next research unlock in " +
                        format_small(6 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 5) {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_num(1, game.notation) +
                        "% of your pending Ansuz runes every second,<br>and you gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    5 *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next: You gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    6 *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 9) {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_num(1, game.notation) +
                        "% of your pending Ansuz runes every second,<br>and you gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    game.collapse_complete[c.id] *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next: You gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    (game.collapse_complete[c.id] + 1) *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next research unlock in " +
                        format_small(11 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 10) {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_num(1, game.notation) +
                        "% of your pending Ansuz runes every second,<br>and you gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    10 *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next: You gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    11 *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_num(1, game.notation) +
                        "% of your pending Ansuz runes every second,<br>and you gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    game.collapse_complete[c.id] *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)<br>Next: You gain " +
                        format_idec(
                            Decimal.pow(
                                3,
                                ((
                                    game.arcane_enchantment +
                                    game.free_enchantment
                                ).toString() **
                                    0.5 *
                                    (game.collapse_complete[c.id] + 1) *
                                    reward_scaling) /
                                    9
                            ),
                            game.notation
                        ) +
                        "x more Ansuz runes (based on arcane enchantments)"
                }
                break
            case 5:
                c.desc =
                    "Same as Challenge 6, but all research boosts are disabled, and red, yellow, green, & blue spice production is disabled"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: You gain data " +
                        format_dec(2 * reward_scaling, game.notation) +
                        "x faster while researching<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 2) {
                    c.desc +=
                        "<br>Currently: You gain data " +
                        format_dec(
                            (2 * reward_scaling) **
                                game.collapse_complete[c.id],
                            game.notation
                        ) +
                        "x faster while researching<br>Next: You gain data " +
                        format_dec(
                            (2 * reward_scaling) **
                                (game.collapse_complete[c.id] + 1),
                            game.notation
                        ) +
                        "x faster while researching<br>Next research unlock in " +
                        format_small(4 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 3) {
                    c.desc +=
                        "<br>Currently: You gain data " +
                        format_dec((2 * reward_scaling) ** 3, game.notation) +
                        "x faster while researching<br>Next: You gain data " +
                        format_dec((2 * reward_scaling) ** 4, game.notation) +
                        "x faster while researching<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 6) {
                    c.desc +=
                        "<br>Currently: You gain data " +
                        format_dec(
                            (2 * reward_scaling) **
                                game.collapse_complete[c.id],
                            game.notation
                        ) +
                        "x faster while researching<br>Next: You gain data " +
                        format_dec(
                            (2 * reward_scaling) **
                                (game.collapse_complete[c.id] + 1),
                            game.notation
                        ) +
                        "x faster while researching<br>Next research unlock in " +
                        format_small(8 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 7) {
                    c.desc +=
                        "<br>Currently: You gain data " +
                        format_dec((2 * reward_scaling) ** 7, game.notation) +
                        "x faster while researching<br>Next: You gain data " +
                        format_dec((2 * reward_scaling) ** 8, game.notation) +
                        "x faster while researching<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else {
                    c.desc +=
                        "<br>Currently: You gain data " +
                        format_dec(
                            (2 * reward_scaling) **
                                game.collapse_complete[c.id],
                            game.notation
                        ) +
                        "x faster while researching<br>Next: You gain data " +
                        format_dec(
                            (2 * reward_scaling) **
                                (game.collapse_complete[c.id] + 1),
                            game.notation
                        ) +
                        "x faster while researching"
                }
                break
        }

        let panel = challenge_map.get(c)
        let button = panel.querySelector(".co_challenge_button")
        let info = panel.querySelector(".co_challenge_text")

        if (game.research_complete[c.unlock] >= 1) {
            panel.style.display = "flex"

            if (game.collapse_challenge === c.id + 7) {
                if (collapse_amount.cmp(get_collapse_goal(c.id, 0)) >= 0) {
                    button.className = "co_challenge_button finished"
                    button.innerHTML = "Complete Challenge"
                } else {
                    button.className = "co_challenge_button inside"
                    button.innerHTML = "In Progress"
                }
            } else {
                button.className = "co_challenge_button outside"
                button.innerHTML = "Enter Challenge"
            }

            if (
                game.pending_completions > 0 &&
                game.collapse_challenge === c.id + 7
            ) {
                info.innerHTML =
                    "<span class='small_text'>" +
                    c.desc +
                    "<br></span><br>Goal: <span class='atomic_spice'>+" +
                    format_infdec(
                        get_collapse_goal(c.id, game.pending_completions),
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
                    format_infdec(get_collapse_goal(c.id, 0), game.notation) +
                    " atomic spice</span><br>Completions: " +
                    format_small(game.collapse_complete[c.id])
            }
        } else {
            panel.style.display = "none"
        }
    }
}

//graphics updates for research
function research_update() {
    let total_completions = 0
    for (let i = 0; i < 6; i++) {
        total_completions += game.collapse_complete[i]
    }

    for (const r of research.researches) {
        let button = research_map.get(r)
        let button2 = research_map2.get(r)

        if (game.research_complete[r.id] >= 1) {
            if (!r.repeat) {
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
                    if (game.research_complete[r.req] >= 1) {
                        button.style.display = "block"
                    } else {
                        button.style.display = "none"
                    }
                } else if (r.req >= -700) {
                    if (total_completions >= -r.req) {
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
                let antispice_halflife = 1
                if (game.antispice_bought[0]) antispice_halflife = 1.15
                r.desc =
                    "The half-life of unstable spice becomes " +
                    format_dec(33 * antispice_halflife) +
                    "% shorter<br>Current unstable spice half-life: " +
                    format_time_long(game.halflife, game.notation, 1, true)
                if (game.collapse_challenge === 12)
                    r.desc =
                        "The half-life of unstable spice becomes " +
                        format_dec(33 * antispice_halflife) +
                        "% shorter<br>Disabled in Challenge 12"
                break
            case 2:
                r.desc =
                    "Unstable spice decay now also boosts crystallized spice production"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unstable spice decay now also boosts crystallized spice production<br>Disabled in Challenge 12"
                break
            case 3:
                let antispice_rune_exp = 1
                if (game.antispice_bought[0]) antispice_rune_exp = 1.15
                r.desc =
                    "The rune power production exponent is increased by " +
                    format_dec(0.1 * antispice_rune_exp, game.notation) +
                    "<br>Current rune power production exponent: " +
                    format_dec(
                        2 +
                            game.research_complete[3] *
                                0.1 *
                                antispice_rune_exp,
                        game.notation
                    )

                if (game.collapse_challenge === 12) {
                    r.desc =
                        "The rune power production exponent is increased by " +
                        format_dec(0.1 * antispice_rune_exp, game.notation) +
                        "<br>Disabled in Challenge 12"
                }
                break
            case 5:
                let rune_atomic = game.total_rune_power
                    .pow(1 / 150)
                    .div(2e18)
                    .add(1)
                if (rune_atomic.cmp(Decimal.pow(2, 1024)) >= 0)
                    rune_atomic = Decimal.pow(
                        10,
                        (rune_atomic.log(10) / Decimal.pow(2, 1024).log(10)) **
                            0.5 *
                            Decimal.pow(2, 1024).log(10)
                    )
                let a = Decimal.pow(2, 3072).log(10)
                if (rune_atomic.cmp(Decimal.pow(2, 3072)) >= 0)
                    rune_atomic = Decimal.pow(
                        10,
                        2 * a - a ** 2 / rune_atomic.log(10)
                    )
                r.desc =
                    "Atomic spice gains are additionally boosted by total rune power produced<br>Current boost: " +
                    format_idec(rune_atomic, game.notation) +
                    "x"
                if (game.collapse_challenge !== 0) {
                    r.desc =
                        "Atomic spice gains are additionally boosted by total rune power produced<br>Disabled in Collapse Challenges"
                }
                break
            case 7:
                let antispice_efficiency = 1
                if (game.antispice_bought[0]) antispice_efficiency = 1.15
                if (game.research_complete[7] < 4)
                    r.desc =
                        "Atomic spice conversion is " +
                        format_dec(10 * antispice_efficiency, game.notation) +
                        "% more efficient<br>Current atomic spice efficiency: " +
                        format_small(Math.round(game.atomic_efficiency * 100)) +
                        "%"
                else
                    r.desc =
                        "Atomic spice conversion is " +
                        format_dec(5 * antispice_efficiency, game.notation) +
                        "% more efficient<br>Current atomic spice efficiency: " +
                        format_small(Math.round(game.atomic_efficiency * 100)) +
                        "%"
                break
            case 10:
                r.desc =
                    "Unstable spice decay now also boosts arcane spice production"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unstable spice decay now also boosts arcane spice production<br>Disabled in Challenge 12"
                break
            case 12:
                if (game.collapse <= 1224)
                    r.desc =
                        "Ansuz rune gains from Ascension are boosted by Times Collapsed stat<br>Current boost: " +
                        format_idec(
                            Decimal.pow(7.27e27, (game.collapse / 10) ** 0.5),
                            game.notation
                        ) +
                        "x"
                else
                    r.desc =
                        "Ansuz rune gains from Ascension are boosted by Times Collapsed stat<br>Current boost: " +
                        format_idec(
                            Decimal.pow(
                                7.27e27,
                                (game.collapse - 1013.3) ** 0.25 + 7.2535
                            ),
                            game.notation
                        ) +
                        "x"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Ansuz rune gains from Ascension are boosted by Times Collapsed stat<br>Disabled in Challenge 12"
                break
            case 13:
                r.desc =
                    "You get " +
                    format_small(1) +
                    " free arcane enchantment for every " +
                    format_small(10) +
                    " arcane enchantments you have<br>Currently: +" +
                    format_small(game.arcane_enchantment / 10n) +
                    " free arcane enchantments"
                if (game.collapse_challenge === 7)
                    r.desc =
                        "You get " +
                        format_small(1) +
                        " free arcane enchantment for every " +
                        format_small(10) +
                        " arcane enchantments you have<br>No effect in Challenge 7"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "You get " +
                        format_small(1) +
                        " free arcane enchantment for every " +
                        format_small(10) +
                        " arcane enchantments you have<br>Disabled in Challenge 12"
                break
            case 14:
                r.desc =
                    "Boosts from rune power are now " +
                    format_small(5) +
                    "x stronger"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Boosts from rune power are now " +
                        format_small(5) +
                        "x stronger<br>Disabled in Challenge 12"
                break
            case 15:
                r.desc =
                    "You get " +
                    format_small(10) +
                    " free arcane enchantments for every arcane strengthener you have<br>Currently: +" +
                    format_small(game.arcane_strengthener * 10) +
                    " free arcane enchantments"
                if (game.collapse_challenge === 7)
                    r.desc =
                        "You get " +
                        format_small(10) +
                        " free arcane enchantments for every arcane strengthener you have<br>No effect in Challenge 7"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "You get " +
                        format_small(10) +
                        " free arcane enchantments for every arcane strengthener you have<br>Disabled in Challenge 12"
                break
            case 16:
                r.desc =
                    "Unstable spice boosts are 20% stronger when unstable spice is completely decayed"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unstable spice boosts are 20% stronger when unstable spice is completely decayed<br>Disabled in Challenge 12"
                break
            case 17:
                r.desc = "Unlocks automation for Collapse"
                if (game.collapse_challenge !== 0) {
                    r.desc =
                        "Unlocks automation for Collapse<br>Disabled in Collapse Challenges"
                }
                break
            case 19:
                if (game.atomic_spice.cmp(1) >= 0) {
                    let amount = game.atomic_spice.log(10) * 0.08888

                    if (amount > 100) {
                        amount = (amount - 100) / 300 + 2
                        if (amount > 3) amount = 4 - 1 / (amount - 2)
                        r.desc =
                            "Unspent atomic spice makes the unstable spice decay boost stronger<br>The boost is currently " +
                            format_dec(amount, game.notation) +
                            "x stronger"
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

                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unspent atomic spice makes the unstable spice decay boost stronger<br>Disabled in Challenge 12"
                break
            case 24:
                r.desc =
                    "You gain " +
                    format_small(46656) +
                    "x more atomic spice for every Collapse challenge completion<br>Current boost: " +
                    format_idec(
                        Decimal.pow(46656, total_completions),
                        game.notation
                    ) +
                    "x"
                if (game.collapse_challenge !== 0) {
                    r.desc =
                        "You gain " +
                        format_small(46656) +
                        "x more atomic spice for every Collapse challenge completion<br>Disabled in Collapse Challenges"
                }
                break
            case 27:
                r.desc =
                    "You get " +
                    format_small(50) +
                    " free arcane enchantments for every Collapse (up to " +
                    format_small(50) +
                    "% of your bought arcane enchantments)"
                if (game.collapse >= 100000) {
                    r.desc =
                        "You get about " +
                        format_small(
                            Math.floor(
                                -5000 *
                                    5 ** 0.5 *
                                    ((game.collapse - 87501) ** 0.5 -
                                        (game.collapse - 87500) ** 0.5)
                            )
                        ) +
                        " free arcane enchantments for every Collapse (up to " +
                        format_small(50) +
                        "% of your bought arcane enchantments)"
                }
                if (game.collapse >= 1337500) {
                    r.desc =
                        "You get " +
                        format_small(5) +
                        " free arcane enchantments for every Collapse (up to " +
                        format_small(50) +
                        "% of your bought arcane enchantments)"
                }
                if (game.collapse_challenge === 12) {
                    r.desc += "<br>Disabled in Challenge 12"
                } else if (game.collapse_challenge === 7) {
                    r.desc += "<br>No effect in Challenge 7"
                } else {
                    let collapse_free = BigInt(game.collapse) * 50n
                    if (game.collapse >= 100000)
                        collapse_free = BigInt(
                            Math.floor(
                                2500000 *
                                    ((game.collapse - 87500) / 50000) ** 0.5 +
                                    3750000
                            )
                        )
                    if (game.collapse >= 1337500)
                        collapse_free = BigInt(game.collapse) * 5n + 9562500n
                    r.desc +=
                        "<br>Currently: +" +
                        format_small(collapse_free) +
                        " free arcane enchantments"
                    if (collapse_free > game.arcane_enchantment / 2n)
                        r.desc +=
                            "<br>Limited to: +" +
                            format_small(game.arcane_enchantment / 2n) +
                            " free arcane enchantments"
                }
                break
            case 34:
                r.desc =
                    "You gain 50% more rainbow spice after color augments begin"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "You gain 50% more rainbow spice after color augments begin<br>Disabled in Challenge 12"
                break
            case 37:
                r.desc =
                    "Boosts from rune power are now " +
                    format_small(50) +
                    "x stronger"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Boosts from rune power are now " +
                        format_small(50) +
                        "x stronger<br>Disabled in Challenge 12"
                break
            case 38:
                let prestige_amount =
                    1 + (1.05 ** (total_completions - 55)) ** 0.5
                let ascension_amount =
                    1 + (1.05 ** (total_completions - 55)) ** 2
                if (ascension_amount >= 10000)
                    ascension_amount = (ascension_amount / 10000) ** 0.5 * 10000
                let collapse_amount = 1 + 1.05 ** (total_completions - 55)
                if (collapse_amount >= 100)
                    collapse_amount = (collapse_amount / 100) ** 0.5 * 100
                r.desc =
                    "You gain " +
                    format_small(Math.floor(prestige_amount)) +
                    "x more Times Prestiged stat on Prestige,<br>you gain " +
                    format_small(Math.floor(ascension_amount)) +
                    "x more Times Ascended stat on Ascension,<br>and you gain " +
                    format_small(Math.floor(collapse_amount)) +
                    "x more Times Collapsed stat on Collapse<br>(Based on Collapse challenge completions)"
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

        let reward_scaling = 1
        if (game.antispice_bought[1]) reward_scaling = 1.05
        let rate = 1 * (2 * reward_scaling) ** game.collapse_complete[5]
        if (game.data_boosts >= 1)
            rate =
                2 *
                1.5 ** (game.data_boosts - 1) *
                (2 * reward_scaling) ** game.collapse_complete[5]
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

                if (r === 7 && game.research_complete[r] >= 7) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (4 +
                                        ((game.research_complete[r] - 6) *
                                            (game.research_complete[r] - 5)) /
                                            2)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }

                if (r === 0 && game.research_complete[r] >= 21) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (game.research_complete[r] * 3 - 41)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }
                if (r === 0 && game.research_complete[r] >= 30) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (game.research_complete[r] * 9 - 215)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }
                if (r === 3 && game.research_complete[r] >= 15) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (game.research_complete[r] * 3 - 29)) /
                                research.researches[r].unit
                        ) * research.researches[r].unit
                }
                if (r === 3 && game.research_complete[r] >= 55) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (game.research_complete[r] * 7.5 - 272)) /
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
            times_researched =
                "<br><br>This research has been researched " +
                format_small(game.research_complete[game.research_view - 1]) +
                " times"
        }
        if (game.research_select === game.research_view) {
            document.getElementById("research_info").innerHTML =
                research.researches[r].desc +
                "<br><br>Data on this research: " +
                format_num(Math.floor(game.data[r]), game.notation) +
                " / " +
                format_num(goal, game.notation) +
                "<br>Estimated time to completion: " +
                format_time_long((goal - game.data[r]) / rate, game.notation) +
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
                    game.research_complete[r] === 1 &&
                    !research.researches[r].repeat
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
                    game.research_complete[r] === 1 &&
                    !research.researches[r].repeat
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
                    .mul(4096)
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
                    .mul(4096)
                    .round()
            ) >= 0
        ) {
            document.getElementById("research_cost").className = "atomic_cost"
            document.getElementById("research_upgrade").className =
                "spice_buy can_buy"
        } else {
            document.getElementById("research_cost").className = "empty_cost"
            document.getElementById("research_upgrade").className = "spice_buy"
        }
    }
}

//graphics updates for antispice and antispice perks
function antispice_update() {
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
            "Your basic antispice is boosting arcane spice production " +
            format_inum(new Decimal(1), game.notation) +
            "x,<br>and making first generators " +
            format_dec(0, game.notation) +
            "% stronger"
    else {
        if (game.collapse_challenge !== 0) {
            let stronger =
                format_dec(
                    get_antispice_amount("pure").log(10) ** (2 / 3) * 2.25,
                    game.notation
                ) + "% stronger"
            if (get_antispice_amount("pure").log(10) ** (2 / 3) * 2.25 >= 100)
                stronger =
                    format_dec(
                        get_antispice_amount("pure").log(10) ** (2 / 3) *
                            0.0225 +
                            1,
                        game.notation
                    ) + "x stronger"
            document.getElementById("pure_antispice_boost").innerHTML =
                "Your basic antispice is boosting arcane spice production " +
                format_inum(
                    get_antispice_amount("pure", true).pow(7500).add(1),
                    game.notation
                ) +
                "x,<br>and making first generators " +
                stronger
        } else {
            let stronger =
                format_dec(
                    get_antispice_amount("pure").log(10) ** (2 / 3) * 4.5,
                    game.notation
                ) + "% stronger"
            if (get_antispice_amount("pure").log(10) ** (2 / 3) * 4.5 >= 100)
                stronger =
                    format_dec(
                        get_antispice_amount("pure").log(10) ** (2 / 3) *
                            0.045 +
                            1,
                        game.notation
                    ) + "x stronger"
            document.getElementById("pure_antispice_boost").innerHTML =
                "Your basic antispice is boosting arcane spice production " +
                format_inum(
                    get_antispice_amount("pure", true).pow(15000).add(1),
                    game.notation
                ) +
                "x,<br>and making first generators " +
                stronger
        }
    }

    if (game.research_complete[23] >= 1) {
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
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        get_antispice_amount("red").log(10) ** (2 / 3) * 2.25,
                        game.notation
                    ) + "% stronger"
                if (
                    get_antispice_amount("red").log(10) ** (2 / 3) * 2.25 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("red").log(10) ** (2 / 3) *
                                0.0225 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("red_antispice_boost").innerHTML =
                    "Your red antispice is boosting red spice production " +
                    format_inum(
                        get_antispice_amount("red", true).pow(1.25e9).add(1),
                        game.notation
                    ) +
                    "x,<br>improving synergy between spices by " +
                    format_dec(
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.75,
                        game.notation
                    ) +
                    "%,<br>and making second generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        get_antispice_amount("red").log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (get_antispice_amount("red").log(10) ** (2 / 3) * 4.5 >= 100)
                    stronger =
                        format_dec(
                            get_antispice_amount("red").log(10) ** (2 / 3) *
                                0.045 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("red_antispice_boost").innerHTML =
                    "Your red antispice is boosting red spice production " +
                    format_inum(
                        get_antispice_amount("red", true).pow(2.5e9).add(1),
                        game.notation
                    ) +
                    "x,<br>improving synergy between spices by " +
                    format_dec(
                        get_antispice_amount("red").log(10) ** (2 / 3) * 1.5,
                        game.notation
                    ) +
                    "%,<br>and making second generators " +
                    stronger
            }
        }
    } else {
        document.getElementById("red_antispice_block").style.display = "none"
    }

    if (game.research_complete[26] >= 1) {
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
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        get_antispice_amount("yellow").log(10) ** (2 / 3) *
                            2.25,
                        game.notation
                    ) + "% stronger"
                if (
                    get_antispice_amount("yellow").log(10) ** (2 / 3) * 2.25 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("yellow").log(10) ** (2 / 3) *
                                0.0225 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("yellow_antispice_boost").innerHTML =
                    "Your yellow antispice is boosting yellow spice production " +
                    format_inum(
                        get_antispice_amount("yellow", true)
                            .pow(1.125e9)
                            .mul(Decimal.pow(10, 3.5e9))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>making color boosts and ALL strengtheners " +
                    format_dec(
                        get_antispice_amount("yellow").log(10) ** (2 / 3) * 20 +
                            1,
                        game.notation
                    ) +
                    "x stronger,<br>and making third generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        get_antispice_amount("yellow").log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (
                    get_antispice_amount("yellow").log(10) ** (2 / 3) * 4.5 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("yellow").log(10) ** (2 / 3) *
                                0.045 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("yellow_antispice_boost").innerHTML =
                    "Your yellow antispice is boosting yellow spice production " +
                    format_inum(
                        get_antispice_amount("yellow", true)
                            .pow(2.25e9)
                            .mul(Decimal.pow(10, 7e9))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>making color boosts and ALL strengtheners " +
                    format_dec(
                        get_antispice_amount("yellow").log(10) ** (2 / 3) * 40 +
                            1,
                        game.notation
                    ) +
                    "x stronger,<br>and making third generators " +
                    stronger
            }
        }
    } else {
        document.getElementById("yellow_antispice_block").style.display = "none"
    }

    if (game.research_complete[29] >= 1) {
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
                "% stronger,<br>and making fourth generators " +
                format_dec(0, game.notation) +
                "% stronger"
        else {
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        get_antispice_amount("green").log(10) ** (2 / 3) * 2.25,
                        game.notation
                    ) + "% stronger"
                if (
                    get_antispice_amount("green").log(10) ** (2 / 3) * 2.25 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("green").log(10) ** (2 / 3) *
                                0.0225 +
                                1,
                            game.notation
                        ) + "x stronger"
                let stronger2 =
                    format_dec(
                        get_antispice_amount("green").log(10) ** 0.5 * 7.5,
                        game.notation
                    ) + "% stronger"
                if (get_antispice_amount("green").log(10) ** 0.5 * 7.5 >= 100)
                    stronger2 =
                        format_dec(
                            get_antispice_amount("green").log(10) ** 0.5 *
                                0.075 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("green_antispice_boost").innerHTML =
                    "Your green antispice is boosting green spice production " +
                    format_inum(
                        get_antispice_amount("green", true)
                            .pow(1.05e9)
                            .mul(Decimal.pow(10, 1e10))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>making crystal infusions and arcane enchantments " +
                    stronger2 +
                    ",<br>and making fourth generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        get_antispice_amount("green").log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (
                    get_antispice_amount("green").log(10) ** (2 / 3) * 4.5 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("green").log(10) ** (2 / 3) *
                                0.045 +
                                1,
                            game.notation
                        ) + "x stronger"
                let stronger2 =
                    format_dec(
                        get_antispice_amount("green").log(10) ** 0.5 * 15,
                        game.notation
                    ) + "% stronger"
                if (get_antispice_amount("green").log(10) ** 0.5 * 15 >= 100)
                    stronger2 =
                        format_dec(
                            get_antispice_amount("green").log(10) ** 0.5 *
                                0.15 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("green_antispice_boost").innerHTML =
                    "Your green antispice is boosting green spice production " +
                    format_inum(
                        get_antispice_amount("green", true)
                            .pow(2.1e9)
                            .mul(Decimal.pow(10, 2e10))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>making crystal infusions and arcane enchantments " +
                    stronger2 +
                    ",<br>and making fourth generators " +
                    stronger
            }
        }
    } else {
        document.getElementById("green_antispice_block").style.display = "none"
    }

    if (game.research_complete[33] >= 1) {
        document.getElementById("blue_antispice_block").style.display = "block"

        document.getElementById("blue_antispice_num").innerHTML = format_inum(
            game.antispice[4],
            game.notation
        )
        if (game.antispice[4].cmp(0) === 0)
            document.getElementById("blue_antispice_boost").innerHTML =
                "Your blue antispice is boosting blue spice production " +
                format_inum(new Decimal(1), game.notation) +
                "x,<br>increasing Prestige and Ascension gains by " +
                format_dec(0, game.notation) +
                "%,<br>and making fifth generators " +
                format_dec(0, game.notation) +
                "% stronger"
        else {
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        get_antispice_amount("blue").log(10) ** (2 / 3) * 2.25,
                        game.notation
                    ) + "% stronger"
                if (
                    get_antispice_amount("blue").log(10) ** (2 / 3) * 2.25 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("blue").log(10) ** (2 / 3) *
                                0.0225 +
                                1,
                            game.notation
                        ) + "x stronger"
                let increasing =
                    format_dec(
                        get_antispice_amount("blue").log(10) ** 0.75 * 3,
                        game.notation
                    ) + "%"
                if (get_antispice_amount("blue").log(10) ** 0.75 * 3 >= 100)
                    increasing =
                        " a factor of " +
                        format_dec(
                            get_antispice_amount("blue").log(10) ** 0.75 *
                                0.03 +
                                1,
                            game.notation
                        ) +
                        "x"
                document.getElementById("blue_antispice_boost").innerHTML =
                    "Your blue antispice is boosting blue spice production " +
                    format_inum(
                        Decimal.pow(get_antispice_amount("blue", true), 1e9)
                            .mul(Decimal.pow(10, 3.75e10))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>increasing Prestige and Ascension gains by " +
                    increasing +
                    ",<br>and making fifth generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        get_antispice_amount("blue").log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (
                    get_antispice_amount("blue").log(10) ** (2 / 3) * 4.5 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("blue").log(10) ** (2 / 3) *
                                0.045 +
                                1,
                            game.notation
                        ) + "x stronger"
                let increasing =
                    format_dec(
                        get_antispice_amount("blue").log(10) ** 0.75 * 6,
                        game.notation
                    ) + "%"
                if (get_antispice_amount("blue").log(10) ** 0.75 * 6 >= 100)
                    increasing =
                        " a factor of " +
                        format_dec(
                            get_antispice_amount("blue").log(10) ** 0.75 *
                                0.06 +
                                1,
                            game.notation
                        ) +
                        "x"
                document.getElementById("blue_antispice_boost").innerHTML =
                    "Your blue antispice is boosting blue spice production " +
                    format_inum(
                        Decimal.pow(get_antispice_amount("blue", true), 2e9)
                            .mul(Decimal.pow(10, 7.5e10))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>increasing Prestige and Ascension gains by " +
                    increasing +
                    ",<br>and making fifth generators " +
                    stronger
            }
        }
    } else {
        document.getElementById("blue_antispice_block").style.display = "none"
    }

    if (game.research_complete[36] >= 1) {
        document.getElementById("pink_antispice_block").style.display = "block"

        document.getElementById("pink_antispice_num").innerHTML = format_inum(
            game.antispice[5],
            game.notation
        )
        if (game.antispice[5].cmp(0) === 0)
            document.getElementById("pink_antispice_boost").innerHTML =
                "Your pink antispice is boosting pink spice production " +
                format_inum(new Decimal(1), game.notation) +
                "x,<br>boosting crystallized spice production " +
                format_inum(new Decimal(1), game.notation) +
                "x,<br>and making sixth generators " +
                format_dec(0, game.notation) +
                "% stronger"
        else {
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        get_antispice_amount("pink").log(10) ** (2 / 3) * 2.25,
                        game.notation
                    ) + "% stronger"
                if (
                    get_antispice_amount("pink").log(10) ** (2 / 3) * 2.25 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("pink").log(10) ** (2 / 3) *
                                0.0225 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("pink_antispice_boost").innerHTML =
                    "Your pink antispice is boosting pink spice production " +
                    format_inum(
                        Decimal.pow(get_antispice_amount("pink", true), 1e9)
                            .mul(Decimal.pow(10, 6e10))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>boosting crystallized spice production " +
                    format_inum(
                        Decimal.pow(
                            get_antispice_amount("crystal", true),
                            2.5e7
                        )
                            .mul(Decimal.pow(10, 1e9))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>and making sixth generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        get_antispice_amount("pink").log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (
                    get_antispice_amount("pink").log(10) ** (2 / 3) * 4.5 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("pink").log(10) ** (2 / 3) *
                                0.045 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("pink_antispice_boost").innerHTML =
                    "Your pink antispice is boosting pink spice production " +
                    format_inum(
                        Decimal.pow(get_antispice_amount("pink", true), 2e9)
                            .mul(Decimal.pow(10, 1.2e11))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>boosting crystallized spice production " +
                    format_inum(
                        Decimal.pow(get_antispice_amount("crystal", true), 5e7)
                            .mul(Decimal.pow(10, 2e9))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>and making sixth generators " +
                    stronger
            }
        }
    } else {
        document.getElementById("pink_antispice_block").style.display = "none"
    }

    if (game.research_complete[39] >= 1) {
        document.getElementById("rainbow_antispice_block").style.display =
            "block"

        document.getElementById("rainbow_antispice_num").innerHTML = format_num(
            game.antispice[6],
            game.notation
        )

        document.getElementById("total_rainbow_antispice").innerHTML =
            "You have a total of " +
            format_num(game.total_rainbow_antispice, game.notation) +
            " rainbow antispice"

        let total_bought = 0
        for (let i = 0; i < 8; i++) {
            if (game.antispice_bought[i]) total_bought++
        }

        if (total_bought >= 1 && !game.antispice_bought[8]) {
            document.getElementById("refund_perks").style.display = "block"
        } else {
            document.getElementById("refund_perks").style.display = "none"
        }

        for (const p of antispice_perk.perks) {
            let button = antispice_map.get(p)
            if (p.id !== 8)
                document.getElementById("ap_desc" + p.id).innerHTML = p.desc

            let price = p.price
            if (p.price === 0) {
                if (game.antispice_bought[p.id]) {
                    price = game.antispice_order[p.id]
                } else {
                    price = total_bought + 1
                }
            }

            if (p.id !== 8)
                document.getElementById("ap_cost" + p.id).innerHTML =
                    "-" +
                    format_num(price, game.notation) +
                    " rainbow antispice"

            if (p.id >= 8) {
                if (total_bought === 8) {
                    button.style.display = "block"
                } else {
                    button.style.display = "none"
                }

                if (game.antispice_bought[p.id] && p.id !== 8) {
                    button.className = "antispice_perk ap_bought ap_special"
                } else {
                    if (game.antispice[6] >= price && p.id !== 8) {
                        button.className =
                            "antispice_perk ap_unlocked ap_special"
                    } else {
                        button.className = "antispice_perk ap_locked ap_special"
                    }
                }
            } else {
                if (game.antispice_bought[p.id]) {
                    button.className = "antispice_perk ap_bought"
                } else {
                    if (game.antispice[6] >= price) {
                        button.className = "antispice_perk ap_unlocked"
                    } else {
                        button.className = "antispice_perk ap_locked"
                    }
                }
            }

            if (p.id === 8) {
                button.innerHTML = "Coming soon..."
            }
        }
    } else {
        document.getElementById("rainbow_antispice_block").style.display =
            "none"
    }
}

//graphics updates for statistics page
function stats_update() {
    let spice_unit = " g"
    let rainbow_unit = " μg"
    let arcane_unit = " mg"
    if (game.notation === 14) {
        spice_unit = ""
        rainbow_unit = ""
        arcane_unit = ""
    }

    let stats_str =
        "You have " +
        format_idec(game.red_spice, game.notation) +
        spice_unit +
        " red spice."

    if (game.color_boosts === 1)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            spice_unit +
            " red spice,<br>and " +
            format_idec(game.yellow_spice, game.notation) +
            spice_unit +
            " yellow spice."
    else if (game.color_boosts === 2)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            spice_unit +
            " red spice,<br>" +
            format_idec(game.yellow_spice, game.notation) +
            spice_unit +
            " yellow spice,<br>and " +
            format_idec(game.green_spice, game.notation) +
            spice_unit +
            " green spice."
    else if (game.color_boosts === 3)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            spice_unit +
            " red spice,<br>" +
            format_idec(game.yellow_spice, game.notation) +
            spice_unit +
            " yellow spice,<br>" +
            format_idec(game.green_spice, game.notation) +
            spice_unit +
            " green spice,<br>and " +
            format_idec(game.blue_spice, game.notation) +
            spice_unit +
            " blue spice."
    else if (game.color_boosts >= 4)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            spice_unit +
            " red spice,<br>" +
            format_idec(game.yellow_spice, game.notation) +
            spice_unit +
            " yellow spice,<br>" +
            format_idec(game.green_spice, game.notation) +
            spice_unit +
            " green spice,<br>" +
            format_idec(game.blue_spice, game.notation) +
            spice_unit +
            " blue spice,<br>and " +
            format_idec(game.pink_spice, game.notation) +
            spice_unit +
            " pink spice."

    stats_str +=
        "<br><br>You have accumulated a total of " +
        format_idec(game.total_spice, game.notation) +
        spice_unit +
        " spice."

    if (game.collapse_challenge === 10 && game.color_boosts >= 4)
        stats_str +=
            "<br>You have done " +
            format_small(game.color_boosts) +
            " color augments."
    else if (game.color_boosts >= game.augment_start)
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
            rainbow_unit +
            " rainbow spice."

        if (game.prestige_bought[12] >= 1)
            stats_str +=
                "<br>You have " +
                format_idec(game.crystal_spice, game.notation) +
                spice_unit +
                " crystallized spice."

        if (game.gamespeed !== 1) {
            if (game.collapse_challenge === 9)
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(
                        game.prestige_time_played,
                        game.notation,
                        game.gamespeed,
                        true
                    ) +
                    " in this Prestige (game time)."
            else
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(
                        game.prestige_time_played,
                        game.notation,
                        game.gamespeed
                    ) +
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

        if (game.collapse_challenge !== 11) {
            stats_str +=
                "<br>You have " + format_inum(game.ansuz, game.notation) + " ᚫ."

            stats_str +=
                "<br>You have produced a total of " +
                format_inum(game.total_rune_power.floor(), game.notation) +
                " rune power."

            if (game.ascend_complete[0] && game.ascend_bought[16])
                stats_str +=
                    "<br>You have " +
                    format_idec(game.arcane_spice, game.notation) +
                    arcane_unit +
                    " arcane spice."

            if (game.gamespeed !== 1) {
                if (game.collapse_challenge === 9)
                    stats_str +=
                        "<br><br>You have spent " +
                        format_time_long(
                            game.ascend_time_played,
                            game.notation,
                            game.gamespeed,
                            true
                        ) +
                        " in this Ascension (game time)."
                else
                    stats_str +=
                        "<br><br>You have spent " +
                        format_time_long(
                            game.ascend_time_played,
                            game.notation,
                            game.gamespeed
                        ) +
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
            spice_unit +
            " spice in this Collapse."

        if (game.gamespeed !== 1) {
            if (game.collapse_challenge === 9)
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(
                        game.collapse_time_played,
                        game.notation,
                        game.gamespeed,
                        true
                    ) +
                    " in this Collapse (game time)."
            else
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(
                        game.collapse_time_played,
                        game.notation,
                        game.gamespeed
                    ) +
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
                format_time_long(
                    game.total_time_played,
                    game.notation,
                    game.gamespeed
                ) +
                " (game time).<br>The game is currently running " +
                format_num(game.gamespeed, game.notation) +
                "x faster.<br><br>You have played for a total of " +
                format_time_long(game.real_time_played[0], game.notation) +
                " (real time)."
        else
            stats_str +=
                "<br><br><br>You have played for a total of " +
                format_time_long(
                    game.total_time_played,
                    game.notation,
                    game.gamespeed
                ) +
                " (game time).<br>The game is currently running " +
                format_dec(1 / game.gamespeed, game.notation) +
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
            stats_str +=
                "<br>#" +
                (i + 1) +
                " took " +
                format_time(game.prestige_time_history[i], game.notation, true)
            if (game.prestige_real_time_history[i] !== -1)
                stats_str +=
                    " (" +
                    format_time(
                        game.prestige_real_time_history[i],
                        game.notation,
                        true
                    ) +
                    " real time)"
            stats_str +=
                " and gave " +
                format_idec(game.prestige_amount_history[i], game.notation) +
                rainbow_unit +
                " rainbow spice."
            if (
                game.prestige_amount_history[i]
                    .div(game.prestige_time_history[i])
                    .mul(60)
                    .cmp(1) >= 0
            )
                stats_str +=
                    " +" +
                    format_idec(
                        game.prestige_amount_history[i]
                            .div(game.prestige_time_history[i])
                            .mul(60),
                        game.notation
                    ) +
                    rainbow_unit +
                    " rainbow spice/min"
            else
                stats_str +=
                    " +" +
                    format_idec(
                        game.prestige_amount_history[i]
                            .div(game.prestige_time_history[i])
                            .mul(3600),
                        game.notation
                    ) +
                    rainbow_unit +
                    " rainbow spice/hour"
        }
    }

    if (entries > 0) {
        average = average.div(entries)
        if (average.mul(60).cmp(1) >= 0)
            stats_str +=
                "<br><br>Average rainbow spice gain: +" +
                format_idec(average.mul(60), game.notation) +
                rainbow_unit +
                " rainbow spice/min"
        else
            stats_str +=
                "<br><br>Average rainbow spice gain: +" +
                format_idec(average.mul(3600), game.notation) +
                rainbow_unit +
                " rainbow spice/hour"
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
    average = new Decimal(0)

    for (let i = 0; i < 10; i++) {
        if (game.ascend_time_history[i] === -1) {
            stats_str += "<br>#" + (i + 1) + " (no data)"
        } else {
            entries++
            average = average.add(
                game.ascend_amount_history[i].div(game.ascend_time_history[i])
            )
            stats_str += "<br>#" + (i + 1)
            if (game.ascend_challenge_history[i] !== -1)
                stats_str +=
                    " was in Challenge " +
                    game.ascend_challenge_history[i] +
                    ","
            stats_str +=
                " took " +
                format_time(game.ascend_time_history[i], game.notation, true)
            if (game.ascend_real_time_history[i] !== -1)
                stats_str +=
                    " (" +
                    format_time(
                        game.ascend_real_time_history[i],
                        game.notation,
                        true
                    ) +
                    " real time)"
            stats_str +=
                " and gave " +
                format_inum(game.ascend_amount_history[i], game.notation) +
                " ᚫ."
            if (
                game.ascend_amount_history[i]
                    .mul(60)
                    .div(game.ascend_time_history[i])
                    .cmp(1) >= 0
            )
                stats_str +=
                    " +" +
                    format_idec(
                        game.ascend_amount_history[i]
                            .mul(60)
                            .div(game.ascend_time_history[i]),
                        game.notation
                    ) +
                    " ᚫ/min"
            else
                stats_str +=
                    " +" +
                    format_idec(
                        game.ascend_amount_history[i]
                            .mul(3600)
                            .div(game.ascend_time_history[i]),
                        game.notation
                    ) +
                    " ᚫ/hour"
        }
    }

    if (entries > 0) {
        average = average.div(entries)
        if (average * 60 >= 1)
            stats_str +=
                "<br><br>Average Ansuz rune gain: +" +
                format_idec(average.mul(60), game.notation) +
                " ᚫ/min"
        else
            stats_str +=
                "<br><br>Average Ansuz rune gain: +" +
                format_idec(average.mul(3600), game.notation) +
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
            stats_str += "<br>#" + (i + 1)
            if (game.collapse_challenge_history[i] !== -1)
                stats_str +=
                    " was in Challenge " +
                    game.collapse_challenge_history[i] +
                    ","
            stats_str +=
                " took " +
                format_time(game.collapse_time_history[i], game.notation, true)
            if (game.collapse_real_time_history[i] !== -1)
                stats_str +=
                    " (" +
                    format_time(
                        game.collapse_real_time_history[i],
                        game.notation,
                        true
                    ) +
                    " real time)"
            stats_str +=
                " and gave " +
                format_inum(game.collapse_amount_history[i], game.notation) +
                " atomic spice."
            if (
                game.collapse_amount_history[i]
                    .mul(60 / game.collapse_time_history[i])
                    .cmp(1) >= 0
            )
                stats_str +=
                    " +" +
                    format_idec(
                        game.collapse_amount_history[i].mul(
                            60 / game.collapse_time_history[i]
                        ),
                        game.notation
                    ) +
                    " atomic spice/min"
            else
                stats_str +=
                    " +" +
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
                " atomic spice/min"
        else
            stats_str +=
                "<br><br>Average atomic spice gain: +" +
                format_idec(average.mul(3600), game.notation) +
                " atomic spice/hour"
    } else {
        stats_str += "<br><br>Average atomic spice gain: undefined"
    }

    document.getElementById("collapse_statistics_text").innerHTML = stats_str
}

//graphics updates for settings page
function settings_update() {
    let str = "Hotkeys:<br>Up: Next tab<br>Down: Previous tab"

    if (game.color_boosts > 0 || game.prestige_bought[12])
        str += "<br>Right: Next subtab<br>Left: Previous subtab"

    str +=
        "<br>1-6: Buy until X of generator<br>Shift+1-6: Buy 1 of generator<br>S: Buy strengthener"

    if (
        game.color_boosts >= 1 ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    )
        str += "<br>M: Max all"

    if (game.half_distribute_unlocked) str += "<br>Shift+M: Max half"

    if (
        game.color_boosts >= 1 ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    )
        str += "<br>B: Color shift/boost"

    if (game.prestige >= 1 || game.ascend >= 1 || game.collapse >= 1)
        str += "<br>P: Prestige"

    if (game.prestige_bought[12] >= 1 || game.ascend >= 1 || game.collapse >= 1)
        str += "<br>I: Buy crystal infusion"

    if (game.ascend >= 1 || game.collapse >= 1) str += "<br>A: Ascend"

    if (game.ascend_bought[16] || game.collapse >= 1)
        str += "<br>X: Exit challenge"

    if (game.ascend_complete[0] || game.collapse >= 1)
        str += "<br>N: Buy arcane enchantment"

    if (game.collapse >= 1) str += "<br>C: Collapse"

    document.getElementById("hotkeys_list").innerHTML = str
}
