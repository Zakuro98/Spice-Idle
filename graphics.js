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
    let antispice_power = 1
    if (game.antispice[1].cmp(1) >= 0) {
        let antispice_amount = game.antispice[1]
        if (antispice_amount.cmp(Decimal.pow(10, 39)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 39))
                .pow(0.5)
                .mul(Decimal.pow(10, 39))
        if (antispice_amount.cmp(Decimal.pow(10, 54.5)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 54.5))
                .pow(0.5)
                .mul(Decimal.pow(10, 54.5))
        if (antispice_amount.cmp(Decimal.pow(10, 121)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 121))
                .pow(0.5)
                .mul(Decimal.pow(10, 121))
        antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.015
        if (game.collapse_challenge !== 0)
            antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.0075
    }

    document.getElementById("red_spice_num").innerHTML =
        format_idec(game.red_spice, game.notation) + " g"

    let effective_red_spice = game.highest_red_spice
    if (game.highest_red_spice.cmp(Decimal.pow(10, 10 ** 12)) >= 0)
        effective_red_spice = Decimal.pow(
            10,
            10 ** 12 * (game.highest_red_spice.log(10) / 10 ** 12) ** 0.5
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
                            .pow(0.0075)
                            .add(1)
                            .pow(antispice_power),
                        1
                    ),
                    game.notation
                ) +
                "x"
        }

        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
                            .pow(0.00004)
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
            game.collapse_challenge === 7 ||
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
                            .pow(0.00000025)
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
            " g red spice, all spice production multipliers will be heavily reduced</span>"
    }

    document.getElementById("red_spice_up").innerHTML =
        "+" +
        format_idec(
            game.red_spice_gen[0].floor().mul(game.total_red_spice_boost[0]),
            game.notation
        ) +
        " g red spice/sec" +
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
            " g red spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten red spice generators purchased, that generator's boost increases by 1"

    document.getElementById("yellow_spice_num").innerHTML =
        format_idec(game.yellow_spice, game.notation) + " g"

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
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
        " g yellow spice/sec" +
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
            " g yellow spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten yellow spice generators purchased, that generator's boost increases by 1"

    document.getElementById("green_spice_num").innerHTML =
        format_idec(game.green_spice, game.notation) + " g"

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
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
        " g green spice/sec" +
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
            " g green spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten green spice generators purchased, that generator's boost increases by 1"

    document.getElementById("blue_spice_num").innerHTML =
        format_idec(game.blue_spice, game.notation) + " g"

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
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
        " g blue spice/sec" +
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
            " g blue spice/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten blue spice generators purchased, that generator's boost increases by 1"

    document.getElementById("pink_spice_num").innerHTML =
        format_idec(game.pink_spice, game.notation) + " g"

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
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[13]
        ) {
            synergy_str +=
                "<br>Crystallized spice production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            let effective_pink_spice = game.highest_pink_spice
            if (
                game.highest_pink_spice.cmp(Decimal.pow(10, 2.5 * 10 ** 11)) >=
                0
            )
                effective_pink_spice = Decimal.pow(
                    10,
                    2.5 *
                        10 ** 11 *
                        (game.highest_pink_spice.log(10) / (2.5 * 10 ** 11)) **
                            0.5
                )

            synergy_str +=
                "<br>Crystallized spice production " +
                format_idec(
                    Decimal.max(
                        effective_pink_spice
                            .pow(0.00008)
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
        " g pink spice/sec" +
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
            " g pink spice/sec" +
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
                    "-" + format_idec(price, game.notation) + " g red spice"
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
                    " g yellow spice"
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
                    "-" + format_idec(price, game.notation) + " g yellow spice"
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
                    " g green spice"
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
                    "-" + format_idec(price, game.notation) + " g green spice"
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
                    " g blue spice"
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
                    "-" + format_idec(price, game.notation) + " g blue spice"
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
                    " g pink spice"
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
                    "-" + format_idec(price, game.notation) + " g pink spice"
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
        let antispice_amount = game.antispice[2]
        if (antispice_amount.cmp(Decimal.pow(10, 14)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 14))
                .pow(0.5)
                .mul(Decimal.pow(10, 14))
        if (antispice_amount.cmp(Decimal.pow(10, 19.5)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 19.5))
                .pow(0.5)
                .mul(Decimal.pow(10, 19.5))
        if (antispice_amount.cmp(Decimal.pow(10, 42.25)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 42.25))
                .pow(0.5)
                .mul(Decimal.pow(10, 42.25))
        antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 180
        if (game.collapse_challenge !== 0)
            antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 90
    }

    if (game.antispice_bought[4]) antispice_boosts *= 1.3

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
            game.collapse_challenge === 7 ||
            game.collapse_challenge === 12
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
            game.collapse_challenge !== 7 &&
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
            " g red spice"
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
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
            game.collapse_challenge === 12
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
            game.collapse_challenge !== 7 &&
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
            " g yellow spice"
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
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
            game.collapse_challenge === 12
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
            game.collapse_challenge !== 7 &&
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
            " g green spice"
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
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
            game.collapse_challenge === 12
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
            game.collapse_challenge !== 7 &&
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
            " g blue spice"
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
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
            game.collapse_challenge === 12
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
            if (
                game.ascend_challenge === 1 ||
                game.ascend_challenge === 6 ||
                game.collapse_challenge === 7 ||
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
                game.collapse_challenge === 7 ||
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
                game.collapse_challenge === 7 ||
                game.collapse_challenge === 12
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
                    "x<br><br>You have not yet reached Color augments"
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
                        "x<br><br>You have not yet reached Color augments"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                        "x<br><br>You have not yet reached Color augments"
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
                    "x<br><br>You have not yet reached Color augments"
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
                        "x<br><br>You have not yet reached Color augments"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                        "x<br><br>You have not yet reached Color augments"
                document.getElementById("color_shift_button").innerHTML =
                    "Reset for a spice boost"
                if (game.prestige_bought[22] >= 1)
                    document.getElementById("color_shift_button").innerHTML =
                        "Gain a spice boost"
            }
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

        let amount = new Decimal(0)
        if (game.color_boosts <= 16)
            amount = new Decimal(2).pow((game.color_boosts - 10) / 3)
        else amount = new Decimal(2).pow((game.color_boosts - 8) / 4)
        if (game.research_complete[31] >= 1 && game.collapse_challenge !== 12) {
            if (game.color_boosts >= game.augment_start) {
                let augment_amount = new Decimal(2).pow(
                    (game.augment_start - 8) / 4
                )
                amount = amount.div(augment_amount).pow(1.5).mul(augment_amount)
            }
        }
        if (
            game.ascend_bought[15] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
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
            let antispice_amount = game.antispice[4]
            if (antispice_amount.cmp(new Decimal(20000)) >= 0)
                antispice_amount = antispice_amount
                    .div(new Decimal(20000))
                    .pow(0.5)
                    .mul(new Decimal(20000))
            if (
                antispice_amount.cmp(Decimal.pow(10, 11).mul(2 * 5 ** 0.5)) >= 0
            )
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))

            if (game.collapse_challenge !== 0) {
                amount = amount.pow(
                    1 + antispice_amount.log(10) ** 0.75 * 0.0325
                )
            } else {
                amount = amount.pow(
                    1 + antispice_amount.log(10) ** 0.75 * 0.065
                )
            }
        }

        if (game.antispice_bought[2]) {
            amount = amount.pow(1.15)
        }

        document.getElementById("prestige_up").innerHTML =
            "+" + format_idec(amount, game.notation) + " μg rainbow spice"
        document.getElementById("prestige_req").style.color = "white"
        document.getElementById("prestige_req").innerHTML =
            format_small(game.color_boosts) + " color boosts done"
        if (game.color_boosts >= 2000000)
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
                " μg rainbow spice/min"

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
                                " μg rainbow spice/min at " +
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
                                " μg rainbow spice/min at " +
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
                            " μg rainbow spice/min at +" +
                            format_idec(
                                game.peak_rainbow_amount,
                                game.notation
                            ) +
                            " μg rainbow spice"
                        break
                    case 2:
                        if (game.peak_rainbow_time < 1)
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_rainbow_gain.mul(60),
                                    game.notation
                                ) +
                                " μg rainbow spice/min at " +
                                game.peak_rainbow_time.toFixed(2) +
                                "s"
                        else
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_rainbow_gain.mul(60),
                                    game.notation
                                ) +
                                " μg rainbow spice/min at " +
                                format_dec(
                                    game.peak_rainbow_time,
                                    game.notation
                                ) +
                                "s"
                        break
                }
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
        document.getElementById("prestige_efficiency").style.display = "none"
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
        if (game.research_complete[31] >= 1 && game.collapse_challenge !== 12) {
            if (game.color_boosts >= game.augment_start) {
                let augment_amount = new Decimal(2).pow(
                    (game.augment_start - 8) / 4
                )
                amount = amount.div(augment_amount).pow(1.5).mul(augment_amount)
            }
        }
        if (
            game.ascend_bought[15] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
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
            let antispice_amount = game.antispice[4]
            if (antispice_amount.cmp(new Decimal(20000)) >= 0)
                antispice_amount = antispice_amount
                    .div(new Decimal(20000))
                    .pow(0.5)
                    .mul(new Decimal(20000))
            if (
                antispice_amount.cmp(Decimal.pow(10, 11).mul(2 * 5 ** 0.5)) >= 0
            )
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))

            if (game.collapse_challenge !== 0) {
                amount = amount.pow(
                    1 + antispice_amount.log(10) ** 0.75 * 0.0325
                )
            } else {
                amount = amount.pow(
                    1 + antispice_amount.log(10) ** 0.75 * 0.065
                )
            }
        }

        if (game.antispice_bought[2]) {
            amount = amount.pow(1.15)
        }

        let str = "+" + format_dec(0, game.notation) + " μg rainbow spice/sec"
        if (game.color_boosts >= 10) {
            str =
                "+" +
                format_idec(amount.div(10), game.notation) +
                " μg rainbow spice/sec"
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
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Increase boost from strengtheners/shifts<br>(Disabled)"
                break
            case 3:
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Red spice boosts every other color by its amount<br>(Disabled)"
                break
            case 14:
                u.desc = "Crystallized spice boosts pink spice by its amount"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystallized spice furnace multipliers are raised to the 1.25 power<br>(Disabled)"
                break
        }

        let button = prestige_map.get(u)
        document.getElementById("pr_desc" + u.id).innerHTML = u.desc
        document.getElementById("pr_cost" + u.id).innerHTML =
            "-" + format_idec(u.price, game.notation) + " μg rainbow spice"

        let bought = true
        if (game.reduce_flashing) {
            if (game.prestige_bought[u.id] < u.max) u.unbought++
            else u.unbought = 0
            if (u.unbought >= game.tickspeed / 2) bought = false
        } else {
            u.unbought = 0
            if (game.prestige_bought[u.id] < u.max) bought = false
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
    let antispice_power = 1
    if (game.antispice[1].cmp(1) >= 0) {
        let antispice_amount = game.antispice[1]
        if (antispice_amount.cmp(Decimal.pow(10, 39)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 39))
                .pow(0.5)
                .mul(Decimal.pow(10, 39))
        if (antispice_amount.cmp(Decimal.pow(10, 54.5)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 54.5))
                .pow(0.5)
                .mul(Decimal.pow(10, 54.5))
        if (antispice_amount.cmp(Decimal.pow(10, 121)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 121))
                .pow(0.5)
                .mul(Decimal.pow(10, 121))
        antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.015
        if (game.collapse_challenge !== 0)
            antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.0075
    }

    document.getElementById("crystal_spice_num").innerHTML =
        format_idec(game.crystal_spice, game.notation) + " g"

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
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
            " g red spice, all spice production multipliers will be heavily reduced</span>"
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
        " g crystallized spice/sec" +
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
            " g crystallized spice/sec" +
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
                    " μg rainbow spice"
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
                    " μg rainbow spice"
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
            let antispice_amount = game.antispice[2]
            if (antispice_amount.cmp(Decimal.pow(10, 14)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 14))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 14))
            if (antispice_amount.cmp(Decimal.pow(10, 19.5)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 19.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 19.5))
            if (antispice_amount.cmp(Decimal.pow(10, 42.25)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 42.25))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 42.25))
            antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 180
            if (game.collapse_challenge !== 0)
                antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 90
        }

        if (game.antispice_bought[4]) antispice_boosts *= 1.3

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
        let antispice_amount = game.antispice[3]
        if (antispice_amount.cmp(Decimal.pow(10, 6)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 6))
                .pow(0.5)
                .mul(Decimal.pow(10, 6))
        if (antispice_amount.cmp(Decimal.pow(10, 8)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 8))
                .pow(0.5)
                .mul(Decimal.pow(10, 8))
        if (antispice_amount.cmp(Decimal.pow(10, 17.5)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 17.5))
                .pow(0.5)
                .mul(Decimal.pow(10, 17.5))

        antispice_infusions = 1 + antispice_amount.log(10) ** 0.5 * 0.2
        if (game.collapse_challenge !== 0)
            antispice_infusions = 1 + antispice_amount.log(10) ** 0.5 * 0.1
    }

    if (game.antispice_bought[5]) antispice_infusions *= 1.054

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
        game.collapse_challenge !== 7 &&
        game.collapse_challenge !== 12
    ) {
        s_str +=
            ",<br>boosting all normal spice generators " +
            format_idec(
                Decimal.pow(
                    5,
                    (
                        game.crystal_infusion +
                        BigInt(
                            game.prestige_bought[20] *
                                12 *
                                (1 + game.ascend_bought[5])
                        )
                    ).toString() *
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
        game.collapse_challenge !== 7 &&
        game.collapse_challenge !== 12
    ) {
        s_str +=
            ",<br>boosting all normal spice generators " +
            format_idec(
                Decimal.pow(
                    5,
                    (
                        game.crystal_infusion +
                        BigInt(
                            game.prestige_bought[20] *
                                12 *
                                (1 + game.ascend_bought[5])
                        )
                    ).toString() *
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
                    (
                        game.crystal_infusion +
                        BigInt(
                            game.prestige_bought[20] *
                                12 *
                                (1 + game.ascend_bought[5])
                        )
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
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
                            game.crystal_infusion +
                            BigInt(
                                game.prestige_bought[20] *
                                    12 *
                                    (1 + game.ascend_bought[5])
                            )
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
        " g crystallized spice"
    if (game.crystal_spice.cmp(game.crystal_infusion_price) >= 0) {
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
        if (game.research_complete[10] >= 1 && game.collapse_challenge !== 12)
            amount = Math.floor(
                (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8 *
                    (Math.log2((game.collapse + 25) / 25) ** 2 * 6.27 + 1)
            )

        let original_amount = amount

        if (game.antispice[4].cmp(1) >= 0) {
            let antispice_amount = game.antispice[4]
            if (antispice_amount.cmp(new Decimal(20000)) >= 0)
                antispice_amount = antispice_amount
                    .div(new Decimal(20000))
                    .pow(0.5)
                    .mul(new Decimal(20000))
            if (
                antispice_amount.cmp(Decimal.pow(10, 11).mul(2 * 5 ** 0.5)) >= 0
            )
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))

            if (game.collapse_challenge !== 0) {
                amount =
                    amount ** (1 + antispice_amount.log(10) ** 0.75 * 0.0325)
            } else {
                amount =
                    amount ** (1 + antispice_amount.log(10) ** 0.75 * 0.065)
            }
        }

        if (game.antispice_bought[3]) {
            amount = amount ** 1.25
        }

        document.getElementById("ascend_up").innerHTML =
            "+" + format_num(Math.floor(amount), game.notation) + " ᚫ"
        document.getElementById("ascend_req").style.color = "white"
        document.getElementById("ascend_req").innerHTML =
            format_idec(
                Decimal.pow(2, 1024).pow((original_amount + 1) ** 0.125),
                game.notation
            ) + " μg rainbow spice for next ᚫ"
        if (game.research_complete[10] >= 1 && game.collapse_challenge !== 12)
            document.getElementById("ascend_req").innerHTML =
                format_idec(
                    Decimal.pow(2, 1024).pow(
                        (original_amount /
                            (Math.log2((game.collapse + 25) / 25) ** 2 * 6.27 +
                                1) +
                            1) **
                            0.125
                    ),
                    game.notation
                ) + " μg rainbow spice for next ᚫ"

        if (game.resource_efficiency && game.ascend_challenge === 0) {
            document.getElementById("ascend_efficiency").style.display = "block"

            let efficiency_str =
                "Currently: +" +
                format_dec(
                    (amount / game.ascend_time_played) * 60,
                    game.notation
                ) +
                " ᚫ/min"

            if (game.ascend_bought[12]) {
                switch (game.autoas_mode) {
                    case 0:
                        efficiency_str +=
                            "<br>Peak: +" +
                            format_dec(
                                game.peak_ansuz_gain * 60,
                                game.notation
                            ) +
                            " ᚫ/min at +" +
                            format_num(game.peak_ansuz_amount, game.notation) +
                            " ᚫ"
                        break
                    case 1:
                        if (game.peak_ansuz_time < 1)
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_dec(
                                    game.peak_ansuz_gain * 60,
                                    game.notation
                                ) +
                                " ᚫ/min at " +
                                game.peak_ansuz_time.toFixed(2) +
                                "s"
                        else
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_dec(
                                    game.peak_ansuz_gain * 60,
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
            format_idec(goal, game.notation) + " μg rainbow spice required"
        document.getElementById("ascend_efficiency").style.display = "none"
    }

    document.getElementById("ansuz_num").innerHTML =
        format_num(game.ansuz, game.notation) + " ᚫ"

    let rune_speed = 1
    if (game.research_complete[3] >= 1 && game.collapse_challenge !== 12) {
        if (game.research_complete[3] >= 12)
            rune_speed = 2099520 * 2 ** (game.research_complete[3] - 12)
        else if (game.research_complete[3] >= 4)
            rune_speed = 320 * 3 ** (game.research_complete[3] - 4)
        else if (game.research_complete[3] >= 1)
            rune_speed = 5 * 4 ** (game.research_complete[3] - 1)
        else rune_speed = 5

        if (game.antispice_bought[0])
            rune_speed *= 1.11 ** game.research_complete[3]
    }
    if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
        rune_speed = 0

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
        document.getElementById("jera_half").style.display = "block"
        document.getElementById("raido_half").style.display = "block"
        document.getElementById("othala_half").style.display = "block"
    } else {
        document.getElementById("half_distribute").style.display = "none"
        document.getElementById("jera_half").style.display = "none"
        document.getElementById("raido_half").style.display = "none"
        document.getElementById("othala_half").style.display = "none"
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

    if (game.collapse_complete[4] >= 1) {
        document.getElementById("ansuz_up").style.display = "block"
        document.getElementById("ansuz_up2").style.display = "block"
        document.getElementById("ansuz_up3").style.display = "block"

        let amount = Math.floor(
            (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8
        )
        if (game.research_complete[10] >= 1 && game.collapse_challenge !== 12)
            amount = Math.floor(
                (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8 *
                    (Math.log2((game.collapse + 25) / 25) ** 2 * 6.27 + 1)
            )

        if (game.antispice[4].cmp(1) >= 0) {
            let antispice_amount = game.antispice[4]
            if (antispice_amount.cmp(new Decimal(20000)) >= 0)
                antispice_amount = antispice_amount
                    .div(new Decimal(20000))
                    .pow(0.5)
                    .mul(new Decimal(20000))
            if (
                antispice_amount.cmp(Decimal.pow(10, 11).mul(2 * 5 ** 0.5)) >= 0
            )
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))

            if (game.collapse_challenge !== 0) {
                amount =
                    amount ** (1 + antispice_amount.log(10) ** 0.75 * 0.0325)
            } else {
                amount =
                    amount ** (1 + antispice_amount.log(10) ** 0.75 * 0.065)
            }
        }

        if (game.antispice_bought[3]) {
            amount = amount ** 1.25
        }

        let reward_scaling = 1
        if (game.antispice_bought[1]) reward_scaling = 1.05
        let str = "+" + format_dec(0, game.notation) + " ᚫ/sec"
        if (game.rainbow_spice.cmp(Decimal.pow(2, 1024)) >= 0) {
            str =
                "+" +
                format_dec(
                    (amount *
                        game.collapse_complete[4] *
                        (game.collapse_complete[4] + 1) *
                        reward_scaling) /
                        200,
                    game.notation
                ) +
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
                    format_small(50) +
                    "% stronger"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Increase boost from strengtheners/boosts<br>(Disabled)"
                break
            case 4:
                u.desc = "Crystallized spice generator multipliers are stronger"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Times Ascended stat boosts rainbow spice gains<br>(Disabled)"
                break
            case 18:
                u.desc = "Red spice boosts crystallized spice by its amount"
                if (
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
                    game.collapse_challenge === 7 ||
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
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Red spice boosts arcane spice by its amount<br>(Disabled)"
                break
            case 31:
                u.desc = "Arcane spice boosts itself by its amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
                    game.collapse_challenge === 12
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
        let antispice_amount = game.antispice[1]
        if (antispice_amount.cmp(Decimal.pow(10, 39)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 39))
                .pow(0.5)
                .mul(Decimal.pow(10, 39))
        if (antispice_amount.cmp(Decimal.pow(10, 54.5)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 54.5))
                .pow(0.5)
                .mul(Decimal.pow(10, 54.5))
        if (antispice_amount.cmp(Decimal.pow(10, 121)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 121))
                .pow(0.5)
                .mul(Decimal.pow(10, 121))
        antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.015
        if (game.collapse_challenge !== 0)
            antispice_power = 1 + antispice_amount.log(10) ** (2 / 3) * 0.0075
    }

    document.getElementById("arcane_spice_num").innerHTML =
        format_idec(game.arcane_spice, game.notation) + " mg"

    let synergy_str = ""
    if (game.ascend_bought[22] || game.collapse >= 1) {
        synergy_str =
            "<br><br>Arcane spice synergies:<br>Crystallized spice production " +
            format_idec(
                Decimal.max(
                    game.highest_arcane_spice
                        .pow(10)
                        .add(1)
                        .pow(antispice_power),
                    1
                ),
                game.notation
            ) +
            "x"

        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
            game.collapse_challenge === 7 ||
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
            " g red spice, all spice production multipliers will be heavily reduced</span>"
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
        " mg arcane spice/sec" +
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
            " mg arcane spice/sec" +
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
                        ) + " mg arcane spice/sec"
                    if (game.ascend_bought[32] && game.ascend_challenge !== 2) {
                        info_str +=
                            ",<br>and producing " +
                            format_idec(
                                game.arcane_spice_gen[gen.id].floor().pow(60),
                                game.notation
                            ) +
                            " crystallized spice singularities/sec"
                    } else if (game.collapse >= 1) {
                        info_str +=
                            ",<br>and producing " +
                            format_dec(0, game.notation) +
                            " crystallized spice singularities/sec"
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
                price =
                    (game.arcane_spice_price[gen.id] *
                        (1 - 1.1 ** n.toString())) /
                    -0.1
                document.getElementById("arcane_ucost" + gen.id).innerHTML =
                    "-" + format_num(Math.round(price), game.notation) + " ᚫ"
                if (game.ansuz >= price) {
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
            let antispice_amount = game.antispice[2]
            if (antispice_amount.cmp(Decimal.pow(10, 14)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 14))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 14))
            if (antispice_amount.cmp(Decimal.pow(10, 19.5)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 19.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 19.5))
            if (antispice_amount.cmp(Decimal.pow(10, 42.25)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 42.25))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 42.25))
            antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 180
            if (game.collapse_challenge !== 0)
                antispice_boosts = 1 + antispice_amount.log(10) ** (2 / 3) * 90
        }

        if (game.antispice_bought[4]) antispice_boosts *= 1.3

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
        let antispice_amount = game.antispice[3]
        if (antispice_amount.cmp(Decimal.pow(10, 6)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 6))
                .pow(0.5)
                .mul(Decimal.pow(10, 6))
        if (antispice_amount.cmp(Decimal.pow(10, 8)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 8))
                .pow(0.5)
                .mul(Decimal.pow(10, 8))
        if (antispice_amount.cmp(Decimal.pow(10, 17.5)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 17.5))
                .pow(0.5)
                .mul(Decimal.pow(10, 17.5))

        antispice_infusions = 1 + antispice_amount.log(10) ** 0.5 * 0.2
        if (game.collapse_challenge !== 0)
            antispice_infusions = 1 + antispice_amount.log(10) ** 0.5 * 0.1
    }

    if (game.antispice_bought[5]) antispice_infusions *= 1.054

    let s_str =
        "You have " +
        format_small(game.arcane_enchantment) +
        " arcane enchantments,<br>boosting all crystallized spice generators " +
        format_idec(
            Decimal.pow(
                4,
                game.arcane_enchantment.toString() * 100 * antispice_infusions
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
                        100 *
                        antispice_infusions
                ),
                game.notation
            ) +
            "x"
    }

    if (game.ascend_bought[29] || game.collapse >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
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
                            4 / 3,
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
                            4 / 3,
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
        " mg arcane spice"
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
    let collapse_amount = game.collapse_spice.pow(5 * 10 ** -10).floor()

    if (collapse_amount.cmp(Decimal.pow(10, 1800)) >= 0) {
        collapse_amount = collapse_amount
            .div(Decimal.pow(10, 200))
            .pow(10 / ((collapse_amount.log(10) * 0.3 - 56) ** 0.5 - 2))
            .mul(Decimal.pow(10, 200))

        if (collapse_amount.cmp(Decimal.pow(10, 20000)) >= 0)
            collapse_amount = Decimal.pow(
                10,
                20000 * (collapse_amount.log(10) / 20000) ** (2 / 3)
            )
    } else if (collapse_amount.cmp(Decimal.pow(10, 200)) >= 0) {
        collapse_amount = collapse_amount
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
            rune_amount = Decimal.pow(10, 200 - 10000 / rune_amount.log(10))

        collapse_amount = collapse_amount.mul(rune_amount)
    }

    let total_completions = 0
    for (let i = 0; i < 6; i++) {
        total_completions += game.collapse_complete[i]
    }
    if (game.research_complete[22] >= 1 && game.collapse_challenge === 0)
        collapse_amount = collapse_amount.mul(
            Decimal.pow(888, total_completions)
        )

    let goal = new Decimal(1)
    if (game.collapse_challenge !== 0) {
        let c = collapse_challenge.challenges[game.collapse_challenge - 7]
        let completions = game.collapse_complete[game.collapse_challenge - 7]

        let temp_goal = c.goal.mul(c.delta.pow(completions))

        let extra = [1, 1, 1, 1, 1, 1]
        let superstep = c.goal.mul(c.delta.pow(Math.abs(c.scaling1) - 1))
        let superdelta = c.delta
        let step1 = c.goal
        if (c.scaling1 !== undefined) {
            if (c.scaling1 < 0) extra[0] = 0
            step1 = step1.mul(c.delta.pow(Math.abs(c.scaling1) - 1))
            if (completions >= Math.abs(c.scaling1))
                temp_goal = step1.mul(
                    c.delta2.pow(
                        completions - Math.abs(c.scaling1) + extra[0] + 1
                    )
                )

            superstep = step1.mul(
                c.delta2.pow(c.superscaling - Math.abs(c.scaling1) + extra[0])
            )
            superdelta = c.delta2
        }

        let step2 = step1
        if (c.scaling2 !== undefined) {
            if (c.scaling2 < 0) extra[1] = 0
            step2 = step2.mul(
                c.delta2.pow(
                    Math.abs(c.scaling2) - Math.abs(c.scaling1) + extra[0]
                )
            )
            if (completions >= Math.abs(c.scaling2))
                temp_goal = step2.mul(
                    c.delta3.pow(
                        completions - Math.abs(c.scaling2) + extra[1] + 1
                    )
                )

            superstep = step2.mul(
                c.delta3.pow(c.superscaling - Math.abs(c.scaling2) + extra[1])
            )
            superdelta = c.delta3
        }

        let step3 = step2
        if (c.scaling3 !== undefined) {
            if (c.scaling3 < 0) extra[2] = 0
            step3 = step3.mul(
                c.delta3.pow(
                    Math.abs(c.scaling3) - Math.abs(c.scaling2) + extra[1]
                )
            )
            if (completions >= Math.abs(c.scaling3))
                temp_goal = step3.mul(
                    c.delta4.pow(
                        completions - Math.abs(c.scaling3) + extra[2] + 1
                    )
                )

            superstep = step3.mul(
                c.delta4.pow(c.superscaling - Math.abs(c.scaling3) + extra[2])
            )
            superdelta = c.delta4
        }

        let step4 = step3
        if (c.scaling4 !== undefined) {
            if (c.scaling4 < 0) extra[3] = 0
            step4 = step4.mul(
                c.delta4.pow(
                    Math.abs(c.scaling4) - Math.abs(c.scaling3) + extra[2]
                )
            )
            if (completions >= Math.abs(c.scaling4))
                temp_goal = step4.mul(
                    c.delta5.pow(
                        completions - Math.abs(c.scaling4) + extra[3] + 1
                    )
                )

            superstep = step4.mul(
                c.delta5.pow(c.superscaling - Math.abs(c.scaling4) + extra[3])
            )
            superdelta = c.delta5
        }

        let step5 = step4
        if (c.scaling5 !== undefined) {
            if (c.scaling5 < 0) extra[4] = 0
            step5 = step5.mul(
                c.delta5.pow(
                    Math.abs(c.scaling5) - Math.abs(c.scaling4) + extra[3]
                )
            )
            if (completions >= Math.abs(c.scaling5))
                temp_goal = step5.mul(
                    c.delta6.pow(
                        completions - Math.abs(c.scaling5) + extra[4] + 1
                    )
                )

            superstep = step5.mul(
                c.delta6.pow(c.superscaling - Math.abs(c.scaling5) + extra[4])
            )
            superdelta = c.delta6
        }

        let step6 = step5
        if (c.scaling6 !== undefined) {
            if (c.scaling6 < 0) extra[5] = 0
            step6 = step6.mul(
                c.delta6.pow(
                    Math.abs(c.scaling6) - Math.abs(c.scaling5) + extra[4]
                )
            )
            if (completions >= Math.abs(c.scaling6))
                temp_goal = step6.mul(
                    c.delta7.pow(
                        completions - Math.abs(c.scaling6) + extra[5] + 1
                    )
                )

            superstep = step6.mul(
                c.delta7.pow(c.superscaling - Math.abs(c.scaling6) + extra[5])
            )
            superdelta = c.delta7
        }

        if (completions >= c.superscaling) {
            temp_goal = superstep.mul(
                superdelta.pow(
                    ((completions - c.superscaling + 2) *
                        (completions - c.superscaling + 3)) /
                        2 -
                        1
                )
            )
        }

        goal = temp_goal
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

            if (game.research_complete[15] >= 1) {
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
                }
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

        document.getElementById("collapse_efficiency").style.display = "none"
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
            .pow(game.atomic_efficiency / 132)
        if (amount.cmp(Decimal.pow(10, 420)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 420) ** 0.8 * 420)
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
            (game.antitotal_spice[1].log(10) / (4.2 * 10 ** 11)) ** 0.5
        )

        let atomic_amount = game.spent_atomic_spice[1]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 320)

        let amount = atomic_amount.mul(red_amount)
        if (amount.cmp(Decimal.pow(10, 336)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 336) ** 0.8 * 336)
        let yield_str =
            "Expected yield: <span class='red_antispice'>+" +
            format_inum(amount.sub(game.antispice[1]).floor(), game.notation) +
            " red antispice</span>"
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
            " g red spice</span><br>" +
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
            (game.antitotal_spice[2].log(10) / (1.75 * 10 ** 12)) ** 0.5
        )

        let atomic_amount = game.spent_atomic_spice[2]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 1000)

        let amount = atomic_amount.mul(yellow_amount)
        if (amount.cmp(Decimal.pow(10, 116)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 116) ** 0.8 * 116)
        let yield_str =
            "Expected yield: <span class='yellow_antispice'>+" +
            format_inum(amount.sub(game.antispice[2]).floor(), game.notation) +
            " yellow antispice</span>"
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
            " g yellow spice</span><br>" +
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
            (game.antitotal_spice[3].log(10) / (4.5 * 10 ** 12)) ** 0.5
        )

        let atomic_amount = game.spent_atomic_spice[3]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 2575)

        let amount = atomic_amount.mul(green_amount)
        if (amount.cmp(Decimal.pow(10, 48)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 48) ** 0.8 * 48)
        let yield_str =
            "Expected yield: <span class='green_antispice'>+" +
            format_inum(amount.sub(game.antispice[3]).floor(), game.notation) +
            " green antispice</span>"
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
            " g green spice</span><br>" +
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
            (game.antitotal_spice[4].log(10) / (3.5 * 10 ** 13)) ** 0.5
        )

        let atomic_amount = game.spent_atomic_spice[4]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 4850)

        let amount = atomic_amount.mul(blue_amount)
        if (amount.cmp(Decimal.pow(10, 19)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 19) ** 0.8 * 19)
        let yield_str =
            "Expected yield: <span class='blue_antispice'>+" +
            format_inum(amount.sub(game.antispice[4]).floor(), game.notation) +
            " blue antispice</span>"
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
            " g blue spice</span><br>" +
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
            (game.antitotal_spice[5].log(10) / (3.75 * 10 ** 13)) ** 0.5
        )

        let atomic_amount = game.spent_atomic_spice[5]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 16500)

        let amount = atomic_amount.mul(pink_amount)
        if (amount.cmp(Decimal.pow(10, 7.5)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 7.5) ** 0.8 * 7.5)
        let yield_str =
            "Expected yield: <span class='pink_antispice'>+" +
            format_inum(amount.sub(game.antispice[5]).floor(), game.notation) +
            " pink antispice</span>"
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
            " g pink spice</span><br>" +
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
            (game.antitotal_spice[6].log(10) - 11300000) / 900000
        if (rainbow_amount < 0) rainbow_amount = 0
        if (rainbow_amount > 24) rainbow_amount = 24

        let atomic_amount =
            (game.spent_atomic_spice[6]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .log(10) -
                31320) /
            1620
        if (atomic_amount < 0) atomic_amount = 0
        if (atomic_amount > 24) atomic_amount = 24

        let amount =
            Math.floor(atomic_amount + rainbow_amount) -
            game.total_rainbow_antispice
        let yield_str =
            "Expected yield: <span class='rainbow_antispice'>+" +
            format_num(amount, game.notation) +
            " rainbow antispice</span> (" +
            format_dec(((atomic_amount + rainbow_amount) % 1) * 100) +
            "% to next)"
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
            " μg rainbow spice</span><br>" +
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

    if (game.research_complete[34] >= 1) {
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
    if (game.collapse_challenge === 12)
        document.getElementById("unstable_boost").innerHTML =
            "Your unstable spice is decaying away with a half-life of " +
            format_time_long(game.halflife, 0, true) +
            ",<br>the resulting energy is boosting all normal spice production " +
            format_idec(game.unstable_boost, game.notation) +
            "x,<br>and has produced " +
            format_inum(game.free_deity, game.notation) +
            " arcane spice deities"
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

        if (game.research_complete[30] >= 1) {
            document.getElementById("collider_tab6").style.display = "block"
        } else {
            document.getElementById("collider_tab6").style.display = "none"
        }

        if (game.research_complete[33] >= 1) {
            document.getElementById("collider_tab7").style.display = "block"
        } else {
            document.getElementById("collider_tab7").style.display = "none"
        }

        if (game.research_complete[37] >= 1) {
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

    if (total_completions > 1) {
        document.getElementById("collapse_challenge_info").innerHTML =
            "Entering a Collapse Challenge will reset your current Collapse, and disable Collapse automation in the Challenge" +
            "<br>You must Collapse for the required amount of atomic spice to complete the Challenge" +
            "<br><br>Collapse Challenge rewards do not apply in the Challenge they're from" +
            "<br><br>You have a total of " +
            format_small(total_completions) +
            " Collapse challenge completions."
    } else if (total_completions === 1) {
        document.getElementById("collapse_challenge_info").innerHTML =
            "Entering a Collapse Challenge will reset your current Collapse, and disable Collapse automation in the Challenge" +
            "<br>You must Collapse for the required amount of atomic spice to complete the Challenge" +
            "<br><br>Collapse Challenge rewards do not apply in the Challenge they're from" +
            "<br><br>You have a total of " +
            format_small(1) +
            " Collapse challenge completion."
    } else {
        document.getElementById("collapse_challenge_info").innerHTML =
            "Entering a Collapse Challenge will reset your current Collapse, and disable Collapse automation in the Challenge" +
            "<br>You must Collapse for the required amount of atomic spice to complete the Challenge" +
            "<br><br>Collapse Challenge rewards do not apply in the Challenge they're from"
    }

    let reward_scaling = 1
    if (game.antispice_bought[1]) reward_scaling = 1.05

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
                        format_small(2) +
                        " completions"
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
                    format_small(99999) +
                    "x slower, reach the goal in 999 microseconds or less"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: The game runs " +
                        format_num(2 * reward_scaling, game.notation) +
                        "x faster<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 2) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(
                            (2 * reward_scaling) **
                                game.collapse_complete[c.id],
                            game.notation
                        ) +
                        "x faster<br>Next: The game runs " +
                        format_num(
                            (2 * reward_scaling) **
                                (game.collapse_complete[c.id] + 1),
                            game.notation
                        ) +
                        "x faster<br>Next research unlock in " +
                        format_small(4 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 3) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num((2 * reward_scaling) ** 3, game.notation) +
                        "x faster<br>Next: The game runs " +
                        format_num((2 * reward_scaling) ** 4, game.notation) +
                        "x faster<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 5) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(
                            (2 * reward_scaling) **
                                game.collapse_complete[c.id],
                            game.notation
                        ) +
                        "x faster<br>Next: The game runs " +
                        format_num(
                            (2 * reward_scaling) **
                                (game.collapse_complete[c.id] + 1),
                            game.notation
                        ) +
                        "x faster<br>Next research unlock in " +
                        format_small(7 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 6) {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num((2 * reward_scaling) ** 6, game.notation) +
                        "x faster<br>Next: The game runs " +
                        format_num((2 * reward_scaling) ** 7, game.notation) +
                        "x faster<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else {
                    c.desc +=
                        "<br>Currently: The game runs " +
                        format_num(
                            (2 * reward_scaling) **
                                game.collapse_complete[c.id],
                            game.notation
                        ) +
                        "x faster<br>Next: The game runs " +
                        format_num(
                            (2 * reward_scaling) **
                                (game.collapse_complete[c.id] + 1),
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
                        format_small(4000000 * reward_scaling) +
                        " color boosts<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 3) {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(
                            (2000000 + 2000000 * game.collapse_complete[c.id]) *
                                reward_scaling
                        ) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(
                            (4000000 + 2000000 * game.collapse_complete[c.id]) *
                                reward_scaling
                        ) +
                        " color boosts<br>Next research unlock in " +
                        format_small(5 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 4) {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(10000000 * reward_scaling) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(12000000 * reward_scaling) +
                        " color boosts<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 7) {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(
                            (2000000 + 2000000 * game.collapse_complete[c.id]) *
                                reward_scaling
                        ) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(
                            (4000000 + 2000000 * game.collapse_complete[c.id]) *
                                reward_scaling
                        ) +
                        " color boosts<br>Next research unlock in " +
                        format_small(9 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 8) {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(18000000 * reward_scaling) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(20000000 * reward_scaling) +
                        " color boosts<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else {
                    c.desc +=
                        "<br>Currently: Color augments begin at " +
                        format_small(
                            (2000000 + 2000000 * game.collapse_complete[c.id]) *
                                reward_scaling
                        ) +
                        " color boosts<br>Next: Color augments begin at " +
                        format_small(
                            (4000000 + 2000000 * game.collapse_complete[c.id]) *
                                reward_scaling
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
                        format_dec(1 * reward_scaling, game.notation) +
                        "% of your pending Ansuz runes every second<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 4) {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_dec(
                            (game.collapse_complete[c.id] *
                                (game.collapse_complete[c.id] + 1) *
                                reward_scaling) /
                                2,
                            game.notation
                        ) +
                        "% of your pending Ansuz runes every second<br>Next: You gain " +
                        format_dec(
                            ((game.collapse_complete[c.id] + 1) *
                                (game.collapse_complete[c.id] + 2) *
                                reward_scaling) /
                                2,
                            game.notation
                        ) +
                        "% of your pending Ansuz runes every second<br>Next research unlock in " +
                        format_small(6 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 5) {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_dec(15 * reward_scaling, game.notation) +
                        "% of your pending Ansuz runes every second<br>Next: You gain " +
                        format_dec(21 * reward_scaling, game.notation) +
                        "% of your pending Ansuz runes every second<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] <= 9) {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_dec(
                            (game.collapse_complete[c.id] *
                                (game.collapse_complete[c.id] + 1) *
                                reward_scaling) /
                                2,
                            game.notation
                        ) +
                        "% of your pending Ansuz runes every second<br>Next: You gain " +
                        format_dec(
                            ((game.collapse_complete[c.id] + 1) *
                                (game.collapse_complete[c.id] + 2) *
                                reward_scaling) /
                                2,
                            game.notation
                        ) +
                        "% of your pending Ansuz runes every second<br>Next research unlock in " +
                        format_small(11 - game.collapse_complete[c.id]) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 10) {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_dec(55 * reward_scaling, game.notation) +
                        "% of your pending Ansuz runes every second<br>Next: You gain " +
                        format_dec(66 * reward_scaling, game.notation) +
                        "% of your pending Ansuz runes every second<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else {
                    c.desc +=
                        "<br>Currently: You gain " +
                        format_dec(
                            (game.collapse_complete[c.id] *
                                (game.collapse_complete[c.id] + 1) *
                                reward_scaling) /
                                2,
                            game.notation
                        ) +
                        "% of your pending Ansuz runes every second<br>Next: You gain " +
                        format_dec(
                            ((game.collapse_complete[c.id] + 1) *
                                (game.collapse_complete[c.id] + 2) *
                                reward_scaling) /
                                2,
                            game.notation
                        ) +
                        "% of your pending Ansuz runes every second"
                }
                break
            case 5:
                c.desc =
                    "Same as Challenge 6, but all research boosts are disabled, and red, yellow, green, & blue spice production is disabled, and the unstable spice boost is not disabled"
                if (game.collapse_complete[c.id] === 0) {
                    c.desc +=
                        "<br>Reward: You gain data " +
                        format_dec(2 * reward_scaling, game.notation) +
                        "x faster while researching<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] === 1) {
                    c.desc +=
                        "<br>Currently: You gain data " +
                        format_dec(2 * reward_scaling, game.notation) +
                        "x faster while researching<br>Next: You gain data " +
                        format_dec((2 * reward_scaling) ** 2, game.notation) +
                        "x faster while researching<br>Next research unlock in " +
                        format_small(2) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 2) {
                    c.desc +=
                        "<br>Currently: You gain data " +
                        format_dec((2 * reward_scaling) ** 2, game.notation) +
                        "x faster while researching<br>Next: You gain data " +
                        format_dec((2 * reward_scaling) ** 3, game.notation) +
                        "x faster while researching<br>Next research unlock in " +
                        format_small(1) +
                        " completion"
                } else if (game.collapse_complete[c.id] === 3) {
                    c.desc +=
                        "<br>Currently: You gain data " +
                        format_dec((2 * reward_scaling) ** 3, game.notation) +
                        "x faster while researching<br>Next: You gain data " +
                        format_dec((2 * reward_scaling) ** 4, game.notation) +
                        "x faster while researching<br>Next research unlock in " +
                        format_small(2) +
                        " completions"
                } else if (game.collapse_complete[c.id] === 4) {
                    c.desc +=
                        "<br>Currently: You gain data " +
                        format_dec((2 * reward_scaling) ** 4, game.notation) +
                        "x faster while researching<br>Next: You gain data " +
                        format_dec((2 * reward_scaling) ** 5, game.notation) +
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

            let completions = game.collapse_complete[c.id]

            if (game.collapse_challenge === c.id + 7) {
                let temp_goal = c.goal.mul(c.delta.pow(completions))

                let extra = [1, 1, 1, 1, 1, 1]
                let superstep = c.goal.mul(
                    c.delta.pow(Math.abs(c.scaling1) - 1)
                )
                let superdelta = c.delta
                let step1 = c.goal
                if (c.scaling1 !== undefined) {
                    if (c.scaling1 < 0) extra[0] = 0
                    step1 = step1.mul(c.delta.pow(Math.abs(c.scaling1) - 1))
                    if (completions >= Math.abs(c.scaling1))
                        temp_goal = step1.mul(
                            c.delta2.pow(
                                completions -
                                    Math.abs(c.scaling1) +
                                    extra[0] +
                                    1
                            )
                        )

                    superstep = step1.mul(
                        c.delta2.pow(
                            c.superscaling - Math.abs(c.scaling1) + extra[0]
                        )
                    )
                    superdelta = c.delta2
                }

                let step2 = step1
                if (c.scaling2 !== undefined) {
                    if (c.scaling2 < 0) extra[1] = 0
                    step2 = step2.mul(
                        c.delta2.pow(
                            Math.abs(c.scaling2) -
                                Math.abs(c.scaling1) +
                                extra[0]
                        )
                    )
                    if (completions >= Math.abs(c.scaling2))
                        temp_goal = step2.mul(
                            c.delta3.pow(
                                completions -
                                    Math.abs(c.scaling2) +
                                    extra[1] +
                                    1
                            )
                        )

                    superstep = step2.mul(
                        c.delta3.pow(
                            c.superscaling - Math.abs(c.scaling2) + extra[1]
                        )
                    )
                    superdelta = c.delta3
                }

                let step3 = step2
                if (c.scaling3 !== undefined) {
                    if (c.scaling3 < 0) extra[2] = 0
                    step3 = step3.mul(
                        c.delta3.pow(
                            Math.abs(c.scaling3) -
                                Math.abs(c.scaling2) +
                                extra[1]
                        )
                    )
                    if (completions >= Math.abs(c.scaling3))
                        temp_goal = step3.mul(
                            c.delta4.pow(
                                completions -
                                    Math.abs(c.scaling3) +
                                    extra[2] +
                                    1
                            )
                        )

                    superstep = step3.mul(
                        c.delta4.pow(
                            c.superscaling - Math.abs(c.scaling3) + extra[2]
                        )
                    )
                    superdelta = c.delta4
                }

                let step4 = step3
                if (c.scaling4 !== undefined) {
                    if (c.scaling4 < 0) extra[3] = 0
                    step4 = step4.mul(
                        c.delta4.pow(
                            Math.abs(c.scaling4) -
                                Math.abs(c.scaling3) +
                                extra[2]
                        )
                    )
                    if (completions >= Math.abs(c.scaling4))
                        temp_goal = step4.mul(
                            c.delta5.pow(
                                completions -
                                    Math.abs(c.scaling4) +
                                    extra[3] +
                                    1
                            )
                        )

                    superstep = step4.mul(
                        c.delta5.pow(
                            c.superscaling - Math.abs(c.scaling4) + extra[3]
                        )
                    )
                    superdelta = c.delta5
                }

                let step5 = step4
                if (c.scaling5 !== undefined) {
                    if (c.scaling5 < 0) extra[4] = 0
                    step5 = step5.mul(
                        c.delta5.pow(
                            Math.abs(c.scaling5) -
                                Math.abs(c.scaling4) +
                                extra[3]
                        )
                    )
                    if (completions >= Math.abs(c.scaling5))
                        temp_goal = step5.mul(
                            c.delta6.pow(
                                completions -
                                    Math.abs(c.scaling5) +
                                    extra[4] +
                                    1
                            )
                        )

                    superstep = step5.mul(
                        c.delta6.pow(
                            c.superscaling - Math.abs(c.scaling5) + extra[4]
                        )
                    )
                    superdelta = c.delta6
                }

                let step6 = step5
                if (c.scaling6 !== undefined) {
                    if (c.scaling6 < 0) extra[5] = 0
                    step6 = step6.mul(
                        c.delta6.pow(
                            Math.abs(c.scaling6) -
                                Math.abs(c.scaling5) +
                                extra[4]
                        )
                    )
                    if (completions >= Math.abs(c.scaling6))
                        temp_goal = step6.mul(
                            c.delta7.pow(
                                completions -
                                    Math.abs(c.scaling6) +
                                    extra[5] +
                                    1
                            )
                        )

                    superstep = step6.mul(
                        c.delta7.pow(
                            c.superscaling - Math.abs(c.scaling6) + extra[5]
                        )
                    )
                    superdelta = c.delta7
                }

                if (completions >= c.superscaling) {
                    temp_goal = superstep.mul(
                        superdelta.pow(
                            ((completions - c.superscaling + 2) *
                                (completions - c.superscaling + 3)) /
                                2 -
                                1
                        )
                    )
                }

                if (collapse_amount.cmp(temp_goal) >= 0) {
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
                let temp_goal = c.goal.mul(
                    c.delta.pow(completions + game.pending_completions)
                )

                let extra = [1, 1, 1, 1, 1, 1]
                let superstep = c.goal.mul(
                    c.delta.pow(Math.abs(c.scaling1) - 1)
                )
                let superdelta = c.delta
                let step1 = c.goal
                if (c.scaling1 !== undefined) {
                    if (c.scaling1 < 0) extra[0] = 0
                    step1 = step1.mul(c.delta.pow(Math.abs(c.scaling1) - 1))
                    if (
                        completions + game.pending_completions >=
                        Math.abs(c.scaling1)
                    )
                        temp_goal = step1.mul(
                            c.delta2.pow(
                                completions +
                                    game.pending_completions -
                                    Math.abs(c.scaling1) +
                                    extra[0] +
                                    1
                            )
                        )

                    superstep = step1.mul(
                        c.delta2.pow(
                            c.superscaling - Math.abs(c.scaling1) + extra[0]
                        )
                    )
                    superdelta = c.delta2
                }

                let step2 = step1
                if (c.scaling2 !== undefined) {
                    if (c.scaling2 < 0) extra[1] = 0
                    step2 = step2.mul(
                        c.delta2.pow(
                            Math.abs(c.scaling2) -
                                Math.abs(c.scaling1) +
                                extra[0]
                        )
                    )
                    if (
                        completions + game.pending_completions >=
                        Math.abs(c.scaling2)
                    )
                        temp_goal = step2.mul(
                            c.delta3.pow(
                                completions +
                                    game.pending_completions -
                                    Math.abs(c.scaling2) +
                                    extra[1] +
                                    1
                            )
                        )

                    superstep = step2.mul(
                        c.delta3.pow(
                            c.superscaling - Math.abs(c.scaling2) + extra[1]
                        )
                    )
                    superdelta = c.delta3
                }

                let step3 = step2
                if (c.scaling3 !== undefined) {
                    if (c.scaling3 < 0) extra[2] = 0
                    step3 = step3.mul(
                        c.delta3.pow(
                            Math.abs(c.scaling3) -
                                Math.abs(c.scaling2) +
                                extra[1]
                        )
                    )
                    if (
                        completions + game.pending_completions >=
                        Math.abs(c.scaling3)
                    )
                        temp_goal = step3.mul(
                            c.delta4.pow(
                                completions +
                                    game.pending_completions -
                                    Math.abs(c.scaling3) +
                                    extra[2] +
                                    1
                            )
                        )

                    superstep = step3.mul(
                        c.delta4.pow(
                            c.superscaling - Math.abs(c.scaling3) + extra[2]
                        )
                    )
                    superdelta = c.delta4
                }

                let step4 = step3
                if (c.scaling4 !== undefined) {
                    if (c.scaling4 < 0) extra[3] = 0
                    step4 = step4.mul(
                        c.delta4.pow(
                            Math.abs(c.scaling4) -
                                Math.abs(c.scaling3) +
                                extra[2]
                        )
                    )
                    if (
                        completions + game.pending_completions >=
                        Math.abs(c.scaling4)
                    )
                        temp_goal = step4.mul(
                            c.delta5.pow(
                                completions +
                                    game.pending_completions -
                                    Math.abs(c.scaling4) +
                                    extra[3] +
                                    1
                            )
                        )

                    superstep = step4.mul(
                        c.delta5.pow(
                            c.superscaling - Math.abs(c.scaling4) + extra[3]
                        )
                    )
                    superdelta = c.delta5
                }

                let step5 = step4
                if (c.scaling5 !== undefined) {
                    if (c.scaling5 < 0) extra[4] = 0
                    step5 = step5.mul(
                        c.delta5.pow(
                            Math.abs(c.scaling5) -
                                Math.abs(c.scaling4) +
                                extra[3]
                        )
                    )
                    if (
                        completions + game.pending_completions >=
                        Math.abs(c.scaling5)
                    )
                        temp_goal = step5.mul(
                            c.delta6.pow(
                                completions +
                                    game.pending_completions -
                                    Math.abs(c.scaling5) +
                                    extra[4] +
                                    1
                            )
                        )

                    superstep = step5.mul(
                        c.delta6.pow(
                            c.superscaling - Math.abs(c.scaling5) + extra[4]
                        )
                    )
                    superdelta = c.delta6
                }

                let step6 = step5
                if (c.scaling6 !== undefined) {
                    if (c.scaling6 < 0) extra[5] = 0
                    step6 = step6.mul(
                        c.delta6.pow(
                            Math.abs(c.scaling6) -
                                Math.abs(c.scaling5) +
                                extra[4]
                        )
                    )
                    if (
                        completions + game.pending_completions >=
                        Math.abs(c.scaling6)
                    )
                        temp_goal = step6.mul(
                            c.delta7.pow(
                                completions +
                                    game.pending_completions -
                                    Math.abs(c.scaling6) +
                                    extra[5] +
                                    1
                            )
                        )

                    superstep = step6.mul(
                        c.delta7.pow(
                            c.superscaling - Math.abs(c.scaling6) + extra[5]
                        )
                    )
                    superdelta = c.delta7
                }

                if (completions + game.pending_completions >= c.superscaling) {
                    temp_goal = superstep.mul(
                        superdelta.pow(
                            ((completions +
                                game.pending_completions -
                                c.superscaling +
                                2) *
                                (completions +
                                    game.pending_completions -
                                    c.superscaling +
                                    3)) /
                                2 -
                                1
                        )
                    )
                }

                info.innerHTML =
                    "<span class='small_text'>" +
                    c.desc +
                    "<br></span><br>Goal: <span class='atomic_spice'>+" +
                    format_infdec(temp_goal, game.notation) +
                    " atomic spice</span><br>Completions: " +
                    format_small(game.collapse_complete[c.id]) +
                    " (+" +
                    format_small(game.pending_completions) +
                    " on Collapse)"
            } else {
                let temp_goal = c.goal.mul(c.delta.pow(completions))

                let extra = [1, 1, 1, 1, 1, 1]
                let superstep = c.goal.mul(
                    c.delta.pow(Math.abs(c.scaling1) - 1)
                )
                let superdelta = c.delta
                let step1 = c.goal
                if (c.scaling1 !== undefined) {
                    if (c.scaling1 < 0) extra[0] = 0
                    step1 = step1.mul(c.delta.pow(Math.abs(c.scaling1) - 1))
                    if (completions >= Math.abs(c.scaling1))
                        temp_goal = step1.mul(
                            c.delta2.pow(
                                completions -
                                    Math.abs(c.scaling1) +
                                    extra[0] +
                                    1
                            )
                        )

                    superstep = step1.mul(
                        c.delta2.pow(
                            c.superscaling - Math.abs(c.scaling1) + extra[0]
                        )
                    )
                    superdelta = c.delta2
                }

                let step2 = step1
                if (c.scaling2 !== undefined) {
                    if (c.scaling2 < 0) extra[1] = 0
                    step2 = step2.mul(
                        c.delta2.pow(
                            Math.abs(c.scaling2) -
                                Math.abs(c.scaling1) +
                                extra[0]
                        )
                    )
                    if (completions >= Math.abs(c.scaling2))
                        temp_goal = step2.mul(
                            c.delta3.pow(
                                completions -
                                    Math.abs(c.scaling2) +
                                    extra[1] +
                                    1
                            )
                        )

                    superstep = step2.mul(
                        c.delta3.pow(
                            c.superscaling - Math.abs(c.scaling2) + extra[1]
                        )
                    )
                    superdelta = c.delta3
                }

                let step3 = step2
                if (c.scaling3 !== undefined) {
                    if (c.scaling3 < 0) extra[2] = 0
                    step3 = step3.mul(
                        c.delta3.pow(
                            Math.abs(c.scaling3) -
                                Math.abs(c.scaling2) +
                                extra[1]
                        )
                    )
                    if (completions >= Math.abs(c.scaling3))
                        temp_goal = step3.mul(
                            c.delta4.pow(
                                completions -
                                    Math.abs(c.scaling3) +
                                    extra[2] +
                                    1
                            )
                        )

                    superstep = step3.mul(
                        c.delta4.pow(
                            c.superscaling - Math.abs(c.scaling3) + extra[2]
                        )
                    )
                    superdelta = c.delta4
                }

                let step4 = step3
                if (c.scaling4 !== undefined) {
                    if (c.scaling4 < 0) extra[3] = 0
                    step4 = step4.mul(
                        c.delta4.pow(
                            Math.abs(c.scaling4) -
                                Math.abs(c.scaling3) +
                                extra[2]
                        )
                    )
                    if (completions >= Math.abs(c.scaling4))
                        temp_goal = step4.mul(
                            c.delta5.pow(
                                completions -
                                    Math.abs(c.scaling4) +
                                    extra[3] +
                                    1
                            )
                        )

                    superstep = step4.mul(
                        c.delta5.pow(
                            c.superscaling - Math.abs(c.scaling4) + extra[3]
                        )
                    )
                    superdelta = c.delta5
                }

                let step5 = step4
                if (c.scaling5 !== undefined) {
                    if (c.scaling5 < 0) extra[4] = 0
                    step5 = step5.mul(
                        c.delta5.pow(
                            Math.abs(c.scaling5) -
                                Math.abs(c.scaling4) +
                                extra[3]
                        )
                    )
                    if (completions >= Math.abs(c.scaling5))
                        temp_goal = step5.mul(
                            c.delta6.pow(
                                completions -
                                    Math.abs(c.scaling5) +
                                    extra[4] +
                                    1
                            )
                        )

                    superstep = step5.mul(
                        c.delta6.pow(
                            c.superscaling - Math.abs(c.scaling5) + extra[4]
                        )
                    )
                    superdelta = c.delta6
                }

                let step6 = step5
                if (c.scaling6 !== undefined) {
                    if (c.scaling6 < 0) extra[5] = 0
                    step6 = step6.mul(
                        c.delta6.pow(
                            Math.abs(c.scaling6) -
                                Math.abs(c.scaling5) +
                                extra[4]
                        )
                    )
                    if (completions >= Math.abs(c.scaling6))
                        temp_goal = step6.mul(
                            c.delta7.pow(
                                completions -
                                    Math.abs(c.scaling6) +
                                    extra[5] +
                                    1
                            )
                        )

                    superstep = step6.mul(
                        c.delta7.pow(
                            c.superscaling - Math.abs(c.scaling6) + extra[5]
                        )
                    )
                    superdelta = c.delta7
                }

                if (completions >= c.superscaling) {
                    temp_goal = superstep.mul(
                        superdelta.pow(
                            ((completions - c.superscaling + 2) *
                                (completions - c.superscaling + 3)) /
                                2 -
                                1
                        )
                    )
                }

                info.innerHTML =
                    "<span class='small_text'>" +
                    c.desc +
                    "<br></span><br>Goal: <span class='atomic_spice'>+" +
                    format_infdec(temp_goal, game.notation) +
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

        let total_completions = 0
        for (let i = 0; i < 6; i++) {
            total_completions += game.collapse_complete[i]
        }
        switch (r.id) {
            case 0:
                let antispice_halflife = 1
                if (game.antispice_bought[0]) antispice_halflife = 1.11
                r.desc =
                    "The half-life of unstable spice becomes " +
                    format_dec(33 * antispice_halflife) +
                    "% shorter<br>Current unstable spice half-life: " +
                    format_time_long(game.halflife, 0, true)
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
                let antispice_rune_power = 1
                if (game.antispice_bought[0]) antispice_rune_power = 1.11
                if (game.research_complete[3] === 0)
                    r.desc =
                        "Rune power is produced " +
                        format_small(5 * antispice_rune_power) +
                        "x faster<br>Current rune power production boost: " +
                        format_small(1) +
                        "x"
                else if (game.research_complete[3] < 4)
                    r.desc =
                        "Rune power is produced " +
                        format_small(4 * antispice_rune_power) +
                        "x faster<br>Current rune power production boost: " +
                        format_num(
                            5 *
                                4 ** (game.research_complete[3] - 1) *
                                antispice_rune_power **
                                    game.research_complete[3],
                            game.notation
                        ) +
                        "x"
                else if (game.research_complete[3] < 12)
                    r.desc =
                        "Rune power is produced " +
                        format_small(3 * antispice_rune_power) +
                        "x faster<br>Current rune power production boost: " +
                        format_num(
                            320 *
                                3 ** (game.research_complete[3] - 4) *
                                antispice_rune_power **
                                    game.research_complete[3],
                            game.notation
                        ) +
                        "x"
                else
                    r.desc =
                        "Rune power is produced " +
                        format_small(2 * antispice_rune_power) +
                        "x faster<br>Current rune power production boost: " +
                        format_num(
                            2099520 *
                                2 ** (game.research_complete[3] - 12) *
                                antispice_rune_power **
                                    game.research_complete[3],
                            game.notation
                        ) +
                        "x"

                if (game.collapse_challenge === 12) {
                    if (game.research_complete[3] === 0)
                        r.desc =
                            "Rune power is produced " +
                            format_small(5 * antispice_rune_power) +
                            "x faster"
                    else if (game.research_complete[3] < 4)
                        r.desc =
                            "Rune power is produced " +
                            format_small(4 * antispice_rune_power) +
                            "x faster"
                    else if (game.research_complete[3] < 12)
                        r.desc =
                            "Rune power is produced " +
                            format_small(3 * antispice_rune_power) +
                            "x faster"
                    else
                        r.desc =
                            "Rune power is produced " +
                            format_small(2 * antispice_rune_power) +
                            "x faster"
                    r.desc += "<br>Disabled in Challenge 12"
                }
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
                if (rune_amount.cmp(Decimal.pow(10, 100)) >= 0)
                    rune_amount = Decimal.pow(
                        10,
                        200 - 10000 / rune_amount.log(10)
                    )
                r.desc =
                    "Atomic spice gains are additionally boosted by total rune power produced<br>Current boost: " +
                    format_idec(rune_amount, game.notation) +
                    "x"
                if (game.collapse_challenge !== 0) {
                    r.desc =
                        "Atomic spice gains are additionally boosted by total rune power produced<br>Disabled in Collapse Challenges"
                }
                break
            case 7:
                let antispice_efficiency = 1
                if (game.antispice_bought[0]) antispice_efficiency = 1.11
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
            case 9:
                r.desc =
                    "Unstable spice decay now also boosts arcane spice production"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unstable spice decay now also boosts arcane spice production<br>Disabled in Challenge 12"
                break
            case 10:
                r.desc =
                    "Ansuz rune gains from Ascension are boosted by Times Collapsed stat<br>Current boost: " +
                    format_dec(
                        Math.log2((game.collapse + 25) / 25) ** 2 * 6.27 + 1,
                        game.notation
                    ) +
                    "x"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Ansuz rune gains from Ascension are boosted by Times Collapsed stat<br>Disabled in Challenge 12"
                break
            case 11:
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
            case 12:
                r.desc =
                    "Rune power boosts are an extra 50% stronger (for up to " +
                    format_small(12) +
                    "x)"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Rune power boosts are an extra 50% stronger (for up to " +
                        format_small(12) +
                        "x)<br>Disabled in Challenge 12"
                break
            case 13:
                r.desc =
                    "You get " +
                    format_small(200) +
                    " free arcane enchantments for every arcane strengthener you have<br>Currently: +" +
                    format_small(game.arcane_strengthener * 200) +
                    " free arcane enchantments"
                if (game.collapse_challenge === 7)
                    r.desc =
                        "You get " +
                        format_small(200) +
                        " free arcane enchantments for every arcane strengthener you have<br>No effect in Challenge 7"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "You get " +
                        format_small(200) +
                        " free arcane enchantments for every arcane strengthener you have<br>Disabled in Challenge 12"
                break
            case 14:
                r.desc =
                    "Unstable spice boosts are 50% stronger when unstable spice is completely decayed"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unstable spice boosts are 50% stronger when unstable spice is completely decayed<br>Disabled in Challenge 12"
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
            case 22:
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
            case 25:
                r.desc =
                    "You get " +
                    format_small(50) +
                    " free arcane enchantments for every Collapse (up to " +
                    format_small(50) +
                    "% of your bought arcane enchantments)"
                if (game.collapse >= 100000) {
                    if (
                        -5000 *
                            5 ** 0.5 *
                            ((game.collapse - 87501) ** 0.5 -
                                (game.collapse - 87500) ** 0.5) <
                        2
                    ) {
                        r.desc =
                            "You get about " +
                            format_small(1) +
                            " free arcane enchantment for every Collapse<br>(up to " +
                            format_small(50) +
                            "% of your bought arcane enchantments)"
                    } else {
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
                }
                if (game.collapse >= 31337500) {
                    r.desc =
                        "You get " +
                        format_small(1) +
                        " free arcane enchantment for every Collapse (up to " +
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
                    if (game.collapse >= 31337500)
                        collapse_free = BigInt(game.collapse) + 34912500n
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
            case 31:
                r.desc =
                    "You gain 50% more rainbow spice after color augments begin"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "You gain 50% more rainbow spice after color augments begin<br>Disabled in Challenge 12"
                break
            case 35:
                r.desc =
                    "Rune power boosts are an extra 2x stronger (for up to " +
                    format_small(24) +
                    "x)"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Rune power boosts are an extra 2x stronger (for up to " +
                        format_small(24) +
                        "x)<br>Disabled in Challenge 12"
                break
            case 36:
                let ascension_amount =
                    1 + (1.05 ** (total_completions - 55)) ** 2.7
                if (ascension_amount >= 10000)
                    ascension_amount = (ascension_amount / 10000) ** 0.5 * 10000
                let collapse_amount = 1 + 1.05 ** (total_completions - 55)
                if (collapse_amount >= 100)
                    collapse_amount = (collapse_amount / 100) ** 0.5 * 100
                r.desc =
                    "You gain " +
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
                if (r === 3 && game.research_complete[r] >= 57) {
                    goal =
                        Math.ceil(
                            (research.researches[r].data *
                                research.researches[r].factor ** 3 *
                                research.researches[r].factor2 **
                                    (game.research_complete[r] * 7.5 - 289)) /
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
        let antispice_amount = game.antispice[0]
        if (antispice_amount.cmp(Decimal.pow(10, 54)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 54))
                .pow(0.5)
                .mul(Decimal.pow(10, 54))
        if (antispice_amount.cmp(Decimal.pow(10, 77)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 77))
                .pow(0.5)
                .mul(Decimal.pow(10, 77))
        if (antispice_amount.cmp(Decimal.pow(10, 157)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 157))
                .pow(0.5)
                .mul(Decimal.pow(10, 157))
        if (game.collapse_challenge !== 0) {
            let stronger =
                format_dec(
                    antispice_amount.log(10) ** (2 / 3) * 2.25,
                    game.notation
                ) + "% stronger"
            if (antispice_amount.log(10) ** (2 / 3) * 2.25 >= 100)
                stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 0.0225 + 1,
                        game.notation
                    ) + "x stronger"
            document.getElementById("pure_antispice_boost").innerHTML =
                "Your basic antispice is boosting arcane spice production " +
                format_inum(
                    Decimal.pow(antispice_amount, 26250).add(1),
                    game.notation
                ) +
                "x,<br>and making first generators " +
                stronger
        } else {
            let stronger =
                format_dec(
                    antispice_amount.log(10) ** (2 / 3) * 4.5,
                    game.notation
                ) + "% stronger"
            if (antispice_amount.log(10) ** (2 / 3) * 4.5 >= 100)
                stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 0.045 + 1,
                        game.notation
                    ) + "x stronger"
            document.getElementById("pure_antispice_boost").innerHTML =
                "Your basic antispice is boosting arcane spice production " +
                format_inum(
                    Decimal.pow(antispice_amount, 52500).add(1),
                    game.notation
                ) +
                "x,<br>and making first generators " +
                stronger
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
            let antispice_amount = game.antispice[1]
            if (antispice_amount.cmp(Decimal.pow(10, 39)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 39))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 39))
            if (antispice_amount.cmp(Decimal.pow(10, 54.5)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 54.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 54.5))
            if (antispice_amount.cmp(Decimal.pow(10, 121)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 121))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 121))
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 2.25,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 2.25 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.0225 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("red_antispice_boost").innerHTML =
                    "Your red antispice is boosting red spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 2.625 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>improving synergy between spices by " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 0.75,
                        game.notation
                    ) +
                    "%,<br>and making second generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 4.5 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.045 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("red_antispice_boost").innerHTML =
                    "Your red antispice is boosting red spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 5.25 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>improving synergy between spices by " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 1.5,
                        game.notation
                    ) +
                    "%,<br>and making second generators " +
                    stronger
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
            let antispice_amount = game.antispice[2]
            if (antispice_amount.cmp(Decimal.pow(10, 14)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 14))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 14))
            if (antispice_amount.cmp(Decimal.pow(10, 19.5)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 19.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 19.5))
            if (antispice_amount.cmp(Decimal.pow(10, 42.25)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 42.25))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 42.25))
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 2.25,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 2.25 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.0225 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("yellow_antispice_boost").innerHTML =
                    "Your yellow antispice is boosting yellow spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 3.375 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>making color boosts and ALL strengtheners " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 90 + 1,
                        game.notation
                    ) +
                    "x stronger,<br>and making third generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 4.5 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.045 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("yellow_antispice_boost").innerHTML =
                    "Your yellow antispice is boosting yellow spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 6.75 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>making color boosts and ALL strengtheners " +
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 180 + 1,
                        game.notation
                    ) +
                    "x stronger,<br>and making third generators " +
                    stronger
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
                "% stronger,<br>and making fourth generators " +
                format_dec(0, game.notation) +
                "% stronger"
        else {
            let antispice_amount = game.antispice[3]
            if (antispice_amount.cmp(Decimal.pow(10, 6)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 6))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 6))
            if (antispice_amount.cmp(Decimal.pow(10, 8)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 8))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 8))
            if (antispice_amount.cmp(Decimal.pow(10, 17.5)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 17.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 17.5))
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 2.25,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 2.25 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.0225 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("green_antispice_boost").innerHTML =
                    "Your green antispice is boosting green spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 4.5 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>making crystal infusions and arcane enchantments " +
                    format_dec(
                        antispice_amount.log(10) ** 0.5 * 10,
                        game.notation
                    ) +
                    "% stronger,<br>and making fourth generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 4.5 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.045 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("green_antispice_boost").innerHTML =
                    "Your green antispice is boosting green spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 9 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>making crystal infusions and arcane enchantments " +
                    format_dec(
                        antispice_amount.log(10) ** 0.5 * 20,
                        game.notation
                    ) +
                    "% stronger,<br>and making fourth generators " +
                    stronger
            }
        }
    } else {
        document.getElementById("green_antispice_block").style.display = "none"
    }

    if (game.research_complete[30] >= 1) {
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
            let antispice_amount = game.antispice[4]
            if (antispice_amount.cmp(new Decimal(20000)) >= 0)
                antispice_amount = antispice_amount
                    .div(new Decimal(20000))
                    .pow(0.5)
                    .mul(new Decimal(20000))
            if (
                antispice_amount.cmp(Decimal.pow(10, 11).mul(2 * 5 ** 0.5)) >= 0
            )
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 2.25,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 2.25 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.0225 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("blue_antispice_boost").innerHTML =
                    "Your blue antispice is boosting blue spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 6 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>increasing Prestige and Ascension gains by " +
                    format_dec(
                        antispice_amount.log(10) ** 0.75 * 3.25,
                        game.notation
                    ) +
                    "%,<br>and making fifth generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 4.5 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.045 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("blue_antispice_boost").innerHTML =
                    "Your blue antispice is boosting blue spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 1.2 * 10 ** 10).add(1),
                        game.notation
                    ) +
                    "x,<br>increasing Prestige and Ascension gains by " +
                    format_dec(
                        antispice_amount.log(10) ** 0.75 * 6.5,
                        game.notation
                    ) +
                    "%,<br>and making fifth generators " +
                    stronger
            }
        }
    } else {
        document.getElementById("blue_antispice_block").style.display = "none"
    }

    if (game.research_complete[33] >= 1) {
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
            let antispice_amount = game.antispice[5]
            if (antispice_amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 7.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 7.5))
            if (game.collapse_challenge !== 0) {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 2.25,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 2.25 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.0225 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("pink_antispice_boost").innerHTML =
                    "Your pink antispice is boosting pink spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 9 * 10 ** 9).add(1),
                        game.notation
                    ) +
                    "x,<br>boosting crystallized spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 4.5 * 10 ** 8).add(1),
                        game.notation
                    ) +
                    "x,<br>and making sixth generators " +
                    stronger
            } else {
                let stronger =
                    format_dec(
                        antispice_amount.log(10) ** (2 / 3) * 4.5,
                        game.notation
                    ) + "% stronger"
                if (antispice_amount.log(10) ** (2 / 3) * 4.5 >= 100)
                    stronger =
                        format_dec(
                            antispice_amount.log(10) ** (2 / 3) * 0.045 + 1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("pink_antispice_boost").innerHTML =
                    "Your pink antispice is boosting pink spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 1.8 * 10 ** 10).add(1),
                        game.notation
                    ) +
                    "x,<br>boosting crystallized spice production " +
                    format_inum(
                        Decimal.pow(antispice_amount, 9 * 10 ** 8).add(1),
                        game.notation
                    ) +
                    "x,<br>and making sixth generators " +
                    stronger
            }
        }
    } else {
        document.getElementById("pink_antispice_block").style.display = "none"
    }

    if (game.research_complete[37] >= 1) {
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

        if (game.collapse_challenge !== 11) {
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
                        format_time_long(
                            game.ascend_time_played,
                            game.notation
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
                format_num(game.gamespeed, game.notation) +
                "x faster.<br><br>You have played for a total of " +
                format_time_long(game.real_time_played[0], game.notation) +
                " (real time)."
        else
            stats_str +=
                "<br><br><br>You have played for a total of " +
                format_time_long(game.total_time_played, game.notation) +
                " (game time).<br>The game is currently running " +
                format_num(1 / game.gamespeed, game.notation) +
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
