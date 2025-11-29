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

    let effective_red_spice = game.total_red_spice
    if (game.total_red_spice.cmp(Decimal.pow(10, 1e12)) >= 0)
        effective_red_spice = Decimal.pow(
            10,
            1e12 * (game.total_red_spice.log(10) / 1e12) ** 0.5
        )

    let synergy_str = ""
    if (
        game.prestige_bought[11] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        synergy_str =
            "<br><br>Red " +
            spice_text[0] +
            " synergies:<br>Yellow, green, blue & pink " +
            spice_text[0] +
            " production " +
            format_idec(
                Decimal.max(effective_red_spice.pow(0.005).add(1), 1),
                game.notation
            ) +
            "x"

        if (game.ascend_bought[0]) {
            synergy_str =
                "<br><br>Red " +
                spice_text[0] +
                " synergies:<br>Yellow, green, blue & pink " +
                spice_text[0] +
                " production " +
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
                "<br><br>Red " +
                spice_text[0] +
                " synergies:<br>Yellow, green, blue & pink " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        }
    }
    if (game.ascend_bought[18] || game.collapse >= 1 || game.expand >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[18]
        ) {
            synergy_str +=
                "<br>Crystallized " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            synergy_str +=
                "<br>Crystallized " +
                spice_text[0] +
                " production " +
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
    if (game.ascend_bought[30] || game.collapse >= 1 || game.expand >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[30]
        ) {
            synergy_str +=
                "<br>Arcane " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            synergy_str +=
                "<br>Arcane " +
                spice_text[0] +
                " production " +
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
            " red " +
            spice_text[0] +
            ", all " +
            spice_text[0] +
            " production multipliers will be heavily reduced</span>"
        if (game.expand >= 1)
            limit_str =
                "<br><br><span class='bold'>After " +
                format_idec(game.realm_limit, game.notation) +
                spice_unit +
                " red " +
                spice_text[0] +
                ", all " +
                spice_text[0] +
                " production multipliers will be heavily reduced</span><br>Post-Expansion spice production boosts apply after this reduction"
    }

    document.getElementById("red_spice_up").innerHTML =
        "+" +
        format_idec(
            game.red_spice_gen[0]
                .floor()
                .mul(game.total_red_spice_boost[0])
                .mul(game.realtime_production ? game.gamespeed : 1),
            game.notation
        ) +
        spice_unit +
        " red " +
        spice_text[0] +
        "/sec" +
        synergy_str +
        limit_str
    if (
        game.red_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        document.getElementById("red_spice_up").innerHTML =
            "+" +
            format_idec(
                game.red_spice_gen[0]
                    .floor()
                    .mul(game.total_red_spice_boost[0])
                    .mul(game.realtime_production ? game.gamespeed : 1),
                game.notation
            ) +
            spice_unit +
            " red " +
            spice_text[0] +
            "/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten red " +
            spice_text[0] +
            " generators purchased, that generator's boost increases by 1"

    document.getElementById("yellow_spice_num").innerHTML =
        format_idec(game.yellow_spice, game.notation) + spice_unit

    synergy_str = ""
    if (
        game.prestige_bought[8] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        synergy_str =
            "<br><br>Yellow " +
            spice_text[0] +
            " synergies:<br>Red " +
            spice_text[0] +
            " production " +
            format_idec(
                Decimal.max(
                    game.total_yellow_spice
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
                "<br><br>Yellow " +
                spice_text[0] +
                " synergies:<br>Red " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        }
    }

    document.getElementById("yellow_spice_up").innerHTML =
        "+" +
        format_idec(
            game.yellow_spice_gen[0]
                .floor()
                .mul(game.total_yellow_spice_boost[0])
                .mul(game.realtime_production ? game.gamespeed : 1),
            game.notation
        ) +
        spice_unit +
        " yellow " +
        spice_text[0] +
        "/sec" +
        synergy_str +
        limit_str
    if (
        game.yellow_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        document.getElementById("yellow_spice_up").innerHTML =
            "+" +
            format_idec(
                game.yellow_spice_gen[0]
                    .floor()
                    .mul(game.total_yellow_spice_boost[0])
                    .mul(game.realtime_production ? game.gamespeed : 1),
                game.notation
            ) +
            spice_unit +
            " yellow " +
            spice_text[0] +
            "/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten yellow " +
            spice_text[0] +
            " generators purchased, that generator's boost increases by 1"

    document.getElementById("green_spice_num").innerHTML =
        format_idec(game.green_spice, game.notation) + spice_unit

    synergy_str = ""
    if (
        game.prestige_bought[8] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        synergy_str =
            "<br><br>Green " +
            spice_text[0] +
            " synergies:<br>Yellow " +
            spice_text[0] +
            " production " +
            format_idec(
                Decimal.max(
                    game.total_green_spice
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
                "<br><br>Green " +
                spice_text[0] +
                " synergies:<br>Yellow " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        }
    }

    document.getElementById("green_spice_up").innerHTML =
        "+" +
        format_idec(
            game.green_spice_gen[0]
                .floor()
                .mul(game.total_green_spice_boost[0])
                .mul(game.realtime_production ? game.gamespeed : 1),
            game.notation
        ) +
        spice_unit +
        " green " +
        spice_text[0] +
        "/sec" +
        synergy_str +
        limit_str
    if (
        game.green_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        document.getElementById("green_spice_up").innerHTML =
            "+" +
            format_idec(
                game.green_spice_gen[0]
                    .floor()
                    .mul(game.total_green_spice_boost[0])
                    .mul(game.realtime_production ? game.gamespeed : 1),
                game.notation
            ) +
            spice_unit +
            " green " +
            spice_text[0] +
            "/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten green " +
            spice_text[0] +
            " generators purchased, that generator's boost increases by 1"

    document.getElementById("blue_spice_num").innerHTML =
        format_idec(game.blue_spice, game.notation) + spice_unit

    synergy_str = ""
    if (
        game.prestige_bought[8] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        synergy_str =
            "<br><br>Blue " +
            spice_text[0] +
            " synergies:<br>Green " +
            spice_text[0] +
            " production " +
            format_idec(
                Decimal.max(
                    game.total_blue_spice
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
                "<br><br>Blue " +
                spice_text[0] +
                " synergies:<br>Green " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        }
    }

    document.getElementById("blue_spice_up").innerHTML =
        "+" +
        format_idec(
            game.blue_spice_gen[0]
                .floor()
                .mul(game.total_blue_spice_boost[0])
                .mul(game.realtime_production ? game.gamespeed : 1),
            game.notation
        ) +
        spice_unit +
        " blue " +
        spice_text[0] +
        "/sec" +
        synergy_str +
        limit_str
    if (
        game.blue_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        document.getElementById("blue_spice_up").innerHTML =
            "+" +
            format_idec(
                game.blue_spice_gen[0]
                    .floor()
                    .mul(game.total_blue_spice_boost[0])
                    .mul(game.realtime_production ? game.gamespeed : 1),
                game.notation
            ) +
            spice_unit +
            " blue " +
            spice_text[0] +
            "/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten blue " +
            spice_text[0] +
            " generators purchased, that generator's boost increases by 1"

    document.getElementById("pink_spice_num").innerHTML =
        format_idec(game.pink_spice, game.notation) + spice_unit

    synergy_str = ""
    if (
        game.prestige_bought[8] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        synergy_str =
            "<br><br>Pink " +
            spice_text[0] +
            " synergies:<br>Blue " +
            spice_text[0] +
            " production " +
            format_idec(
                Decimal.max(
                    game.total_pink_spice
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
                "<br><br>Pink " +
                spice_text[0] +
                " synergies:<br>Blue " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        }
    }
    if (game.ascend_bought[13] || game.collapse >= 1 || game.expand >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[13]
        ) {
            synergy_str +=
                "<br>Crystallized " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            let effective_pink_spice = game.total_pink_spice
            if (game.total_pink_spice.cmp(Decimal.pow(10, 2.5e11)) >= 0)
                effective_pink_spice = Decimal.pow(
                    10,
                    2.5 * 1e11 * (game.total_pink_spice.log(10) / 2.5e11) ** 0.5
                )

            synergy_str +=
                "<br>Crystallized " +
                spice_text[0] +
                " production " +
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
            game.pink_spice_gen[0]
                .floor()
                .mul(game.total_pink_spice_boost[0])
                .mul(game.realtime_production ? game.gamespeed : 1),
            game.notation
        ) +
        spice_unit +
        " pink " +
        spice_text[0] +
        "/sec" +
        synergy_str +
        limit_str
    if (
        game.pink_spice_bought[0] >= 10n ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        document.getElementById("pink_spice_up").innerHTML =
            "+" +
            format_idec(
                game.pink_spice_gen[0]
                    .floor()
                    .mul(game.total_pink_spice_boost[0])
                    .mul(game.realtime_production ? game.gamespeed : 1),
                game.notation
            ) +
            spice_unit +
            " pink " +
            spice_text[0] +
            "/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every ten pink " +
            spice_text[0] +
            " generators purchased, that generator's multiplier increases by 1"

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
                        " red " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " red " +
                        spice_text[0] +
                        " " +
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
                        " red " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    if (gen.id === 0) {
                        info_str +=
                            spice_unit + " red " + spice_text[0] + "/sec"
                    } else {
                        info_str +=
                            " red " +
                            spice_text[0] +
                            " " +
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
                    "Your red " +
                    spice_text[0] +
                    " " +
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
                    " red " +
                    spice_text[0]
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
                    " red " +
                    spice_text[0]
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
                        game.collapse >= 1 ||
                        game.expand >= 1
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
                        " yellow " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " yellow " +
                        spice_text[0] +
                        " " +
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
                        " yellow " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    if (gen.id === 0) {
                        info_str +=
                            spice_unit + " yellow " + spice_text[0] + "/sec"
                        if (game.prestige_bought[10] >= 1)
                            info_str +=
                                ",<br>and producing " +
                                format_idec(
                                    game.yellow_spice_gen[gen.id]
                                        .floor()
                                        .pow(0.1)
                                        .mul(
                                            game.realtime_production
                                                ? game.gamespeed
                                                : 1
                                        ),
                                    game.notation
                                ) +
                                " red " +
                                spice_text[0] +
                                " galaxies/sec"
                        else if (
                            game.ascend >= 1 ||
                            game.collapse >= 1 ||
                            game.expand >= 1
                        )
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
                                " red " +
                                spice_text[0] +
                                " galaxies/sec"
                    } else {
                        info_str +=
                            " yellow " +
                            spice_text[0] +
                            " " +
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
                    "Your yellow " +
                    spice_text[0] +
                    " " +
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
                    " yellow " +
                    spice_text[0]
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
                    " yellow " +
                    spice_text[0]
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
                        game.collapse >= 1 ||
                        game.expand >= 1
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
                        " green " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " green " +
                        spice_text[0] +
                        " " +
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
                        " green " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    if (gen.id === 0) {
                        info_str +=
                            spice_unit + " green " + spice_text[0] + "/sec"
                        if (game.prestige_bought[10] >= 1)
                            info_str +=
                                ",<br>and producing " +
                                format_idec(
                                    game.green_spice_gen[gen.id]
                                        .floor()
                                        .pow(0.1)
                                        .mul(
                                            game.realtime_production
                                                ? game.gamespeed
                                                : 1
                                        ),
                                    game.notation
                                ) +
                                " yellow " +
                                spice_text[0] +
                                " galaxies/sec"
                        else if (
                            game.ascend >= 1 ||
                            game.collapse >= 1 ||
                            game.expand >= 1
                        )
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
                                " yellow " +
                                spice_text[0] +
                                " galaxies/sec"
                    } else {
                        info_str +=
                            " green " +
                            spice_text[0] +
                            " " +
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
                    "Your green " +
                    spice_text[0] +
                    " " +
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
                    " green " +
                    spice_text[0]
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
                    " green " +
                    spice_text[0]
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
                        game.collapse >= 1 ||
                        game.expand >= 1
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
                        " blue " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " blue " +
                        spice_text[0] +
                        " " +
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
                        " blue " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    if (gen.id === 0) {
                        info_str +=
                            spice_unit + " blue " + spice_text[0] + "/sec"
                        if (game.prestige_bought[10] >= 1)
                            info_str +=
                                ",<br>and producing " +
                                format_idec(
                                    game.blue_spice_gen[gen.id]
                                        .floor()
                                        .pow(0.1)
                                        .mul(
                                            game.realtime_production
                                                ? game.gamespeed
                                                : 1
                                        ),
                                    game.notation
                                ) +
                                " green " +
                                spice_text[0] +
                                " galaxies/sec"
                        else if (
                            game.ascend >= 1 ||
                            game.collapse >= 1 ||
                            game.expand >= 1
                        )
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
                                " green " +
                                spice_text[0] +
                                " galaxies/sec"
                    } else {
                        info_str +=
                            " blue " +
                            spice_text[0] +
                            " " +
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
                    "Your blue " +
                    spice_text[0] +
                    " " +
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
                    " blue " +
                    spice_text[0]
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
                    " blue " +
                    spice_text[0]
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
                        game.collapse >= 1 ||
                        game.expand >= 1
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
                        " pink " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    info_str +=
                        " pink " +
                        spice_text[0] +
                        " " +
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
                        " pink " +
                        spice_text[0] +
                        " " +
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
                            .mul(game.realtime_production ? game.gamespeed : 1)
                            .div(gen.id + 1),
                        game.notation
                    )
                    if (gen.id === 0) {
                        info_str +=
                            spice_unit + " pink " + spice_text[0] + "/sec"
                        if (game.prestige_bought[10] >= 1)
                            info_str +=
                                ",<br>and producing " +
                                format_idec(
                                    game.pink_spice_gen[gen.id]
                                        .floor()
                                        .pow(0.1)
                                        .mul(
                                            game.realtime_production
                                                ? game.gamespeed
                                                : 1
                                        ),
                                    game.notation
                                ) +
                                " blue " +
                                spice_text[0] +
                                " galaxies/sec"
                        else if (
                            game.ascend >= 1 ||
                            game.collapse >= 1 ||
                            game.expand >= 1
                        )
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
                                " blue " +
                                spice_text[0] +
                                " galaxies/sec"
                    } else {
                        info_str +=
                            " pink " +
                            spice_text[0] +
                            " " +
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
                    "Your pink " +
                    spice_text[0] +
                    " " +
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
                    " pink " +
                    spice_text[0]
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
                    " pink " +
                    spice_text[0]
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
                        game.collapse >= 1 ||
                        game.expand >= 1
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
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        document.getElementById("red_gen_s").style.display = "block"

        let s_str =
            "You have " +
            format_small(game.red_strengthener) +
            " red " +
            spice_text[0] +
            " strengtheners,<br>boosting all red " +
            spice_text[0] +
            " generators " +
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
                " red " +
                spice_text[0] +
                " strengtheners,<br>boosting all red " +
                spice_text[0] +
                " generators " +
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
                " red " +
                spice_text[0] +
                " strengtheners,<br>boosting all red " +
                spice_text[0] +
                " generators " +
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
                ",<br>boosting all yellow " +
                spice_text[0] +
                " generators " +
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
                ",<br>boosting all yellow " +
                spice_text[0] +
                " generators " +
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
            " red " +
            spice_text[0]
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
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        document.getElementById("yellow_gen_s").style.display = "block"

        let s_str = ""
        s_str =
            "You have " +
            format_small(game.yellow_strengthener) +
            " yellow " +
            spice_text[0] +
            " strengtheners,<br>boosting all red & yellow " +
            spice_text[0] +
            " generators " +
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
                " yellow " +
                spice_text[0] +
                " strengtheners,<br>boosting all red & yellow " +
                spice_text[0] +
                " generators " +
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
                " yellow " +
                spice_text[0] +
                " strengtheners,<br>boosting all red & yellow " +
                spice_text[0] +
                " generators " +
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
                ",<br>boosting all green " +
                spice_text[0] +
                " generators " +
                format_idec(
                    new Decimal(1 + 0.2 * game.prestige_bought[5]).pow(
                        game.yellow_strengthener * antispice_boosts
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 2)
            s_str +=
                ",<br>boosting all green " +
                spice_text[0] +
                " generators " +
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
            " yellow " +
            spice_text[0]
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
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        document.getElementById("green_gen_s").style.display = "block"

        let s_str = ""
        s_str =
            "You have " +
            format_small(game.green_strengthener) +
            " green " +
            spice_text[0] +
            " strengtheners,<br>boosting all red, yellow & green " +
            spice_text[0] +
            " generators " +
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
                " green " +
                spice_text[0] +
                " strengtheners,<br>boosting all red, yellow & green " +
                spice_text[0] +
                " generators " +
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
                " green " +
                spice_text[0] +
                " strengtheners,<br>boosting all red, yellow & green " +
                spice_text[0] +
                " generators " +
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
                ",<br>boosting all blue " +
                spice_text[0] +
                " generators " +
                format_idec(
                    new Decimal(1 + 0.2 * game.prestige_bought[5]).pow(
                        game.green_strengthener * antispice_boosts
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 3)
            s_str +=
                ",<br>boosting all blue " +
                spice_text[0] +
                " generators " +
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
            " green " +
            spice_text[0]
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
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        document.getElementById("blue_gen_s").style.display = "block"

        let s_str = ""
        s_str =
            "You have " +
            format_small(game.blue_strengthener) +
            " blue " +
            spice_text[0] +
            " strengtheners,<br>boosting all red, yellow, green & blue " +
            spice_text[0] +
            " generators " +
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
                " blue " +
                spice_text[0] +
                " strengtheners,<br>boosting all red, yellow, green & blue " +
                spice_text[0] +
                " generators " +
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
                " blue " +
                spice_text[0] +
                " strengtheners,<br>boosting all red, yellow, green & blue " +
                spice_text[0] +
                " generators " +
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
                ",<br>boosting all pink " +
                spice_text[0] +
                " generators " +
                format_idec(
                    new Decimal(1 + 0.2 * game.prestige_bought[5]).pow(
                        game.blue_strengthener * antispice_boosts
                    ),
                    game.notation
                ) +
                "x"
        else if (game.color_boosts >= 4)
            s_str +=
                ",<br>boosting all pink " +
                spice_text[0] +
                " generators " +
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
            " blue " +
            spice_text[0]
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
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        document.getElementById("pink_gen_s").style.display = "block"

        document.getElementById("pink_info_s").innerHTML =
            "You have " +
            format_small(game.pink_strengthener) +
            " pink " +
            spice_text[0] +
            " strengtheners,<br>boosting ALL " +
            spice_text[0] +
            " generators " +
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
                " pink " +
                spice_text[0] +
                " strengtheners,<br>boosting ALL " +
                spice_text[0] +
                " generators " +
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
                " pink " +
                spice_text[0] +
                " strengtheners,<br>boosting ALL " +
                spice_text[0] +
                " generators " +
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
            " pink " +
            spice_text[0]
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
        game.collapse >= 1 ||
        game.expand >= 1
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
                " color shifts,<br>boosting ALL " +
                spice_text[0] +
                " generators " +
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
                    " color shifts,<br>boosting ALL " +
                    spice_text[0] +
                    " generators " +
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
                    " color shifts,<br>boosting ALL " +
                    spice_text[0] +
                    " generators " +
                    format_idec(
                        new Decimal(2).pow(
                            game.color_boosts * antispice_boosts
                        ),
                        game.notation
                    ) +
                    "x"
            document.getElementById("color_shift_button").innerHTML =
                "Reset for a new " + spice_text[0] + " color"
        } else {
            document.getElementById("color_shift_header").innerHTML =
                "Color Boost"
            if (game.color_boosts >= 5) {
                document.getElementById("color_shift_info").innerHTML =
                    "You have " +
                    format_small(game.color_boosts) +
                    " color boosts,<br>boosting ALL " +
                    spice_text[0] +
                    " generators " +
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
                        " color boosts,<br>boosting ALL " +
                        spice_text[0] +
                        " generators " +
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
                        " color boosts,<br>boosting ALL " +
                        spice_text[0] +
                        " generators " +
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
                    " color shifts,<br>boosting ALL " +
                    spice_text[0] +
                    " generators " +
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
                        " color shifts,<br>boosting ALL " +
                        spice_text[0] +
                        " generators " +
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
                        " color shifts,<br>boosting ALL " +
                        spice_text[0] +
                        " generators " +
                        format_idec(
                            new Decimal(2).pow(
                                (game.color_boosts * 2 - 4) * antispice_boosts
                            ),
                            game.notation
                        ) +
                        "x"
            }
            document.getElementById("color_shift_button").innerHTML =
                "Reset for a " + spice_text[0] + " boost"
            if (game.prestige_bought[22] >= 1)
                document.getElementById("color_shift_button").innerHTML =
                    "Gain a " + spice_text[0] + " boost"
        }
        if (game.augment_reached) {
            if (game.collapse_challenge === 10) {
                if (game.color_boosts >= 4) {
                    document.getElementById("color_shift_header").innerHTML =
                        "Color Augment"
                    document.getElementById("color_shift_header").className =
                        "spice_gen_name boost"
                    document.getElementById("color_shift_info").innerHTML =
                        "You have " +
                        format_small(game.color_boosts) +
                        " color augments,<br>boosting ALL " +
                        spice_text[0] +
                        " generators " +
                        format_idec(
                            new Decimal(
                                2 +
                                    0.2 * game.prestige_bought[2] +
                                    2 *
                                        (game.ascend_bought[2] +
                                            game.ascend_bought[14])
                            ).pow(
                                (game.color_boosts * 2 - 4) * antispice_boosts
                            ),
                            game.notation
                        ) +
                        "x<br><br>After " +
                        format_small(4) +
                        " color boosts, color augments begin with much harsher scaling"
                    if (game.prestige_bought[18] >= 1)
                        document.getElementById("color_shift_info").innerHTML =
                            "You have " +
                            format_small(game.color_boosts) +
                            " color augments,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
                            format_idec(
                                new Decimal(
                                    6 +
                                        2 *
                                            (game.ascend_bought[2] +
                                                game.ascend_bought[14])
                                ).pow(
                                    (game.color_boosts * 2 - 4) *
                                        antispice_boosts
                                ),
                                game.notation
                            ) +
                            "x<br><br>After " +
                            format_small(4) +
                            " color boosts, color augments begin with much harsher scaling"
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        document.getElementById("color_shift_info").innerHTML =
                            "You have " +
                            format_small(game.color_boosts) +
                            " color augments,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
                            format_idec(
                                new Decimal(2).pow(
                                    (game.color_boosts * 2 - 4) *
                                        antispice_boosts
                                ),
                                game.notation
                            ) +
                            "x<br><br>After " +
                            format_small(4) +
                            " color boosts, color augments begin with much harsher scaling"
                    document.getElementById("color_shift_button").innerHTML =
                        "Reset for a " + spice_text[0] + " boost"
                    if (game.prestige_bought[22] >= 1)
                        document.getElementById(
                            "color_shift_button"
                        ).innerHTML = "Gain a " + spice_text[0] + " boost"
                } else {
                    document.getElementById("color_shift_header").innerHTML =
                        "Color Shift"
                    document.getElementById("color_shift_info").innerHTML =
                        "You have " +
                        format_small(game.color_boosts) +
                        " color shifts,<br>boosting ALL " +
                        spice_text[0] +
                        " generators " +
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
                        format_small(4) +
                        " color boosts, color augments begin with much harsher scaling"
                    if (game.prestige_bought[18] >= 1)
                        document.getElementById("color_shift_info").innerHTML =
                            "You have " +
                            format_small(game.color_boosts) +
                            " color shifts,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
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
                            format_small(4) +
                            " color boosts, color augments begin with much harsher scaling"
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        document.getElementById("color_shift_info").innerHTML =
                            "You have " +
                            format_small(game.color_boosts) +
                            " color shifts,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
                            format_idec(
                                new Decimal(2).pow(
                                    game.color_boosts * antispice_boosts
                                ),
                                game.notation
                            ) +
                            "x<br><br>After " +
                            format_small(4) +
                            " color boosts, color augments begin with much harsher scaling"
                    document.getElementById("color_shift_button").innerHTML =
                        "Reset for a new " + spice_text[0] + " color"
                }
            } else {
                if (game.color_boosts >= game.augment_start) {
                    document.getElementById("color_shift_header").innerHTML =
                        "Color Augment"
                    document.getElementById("color_shift_header").className =
                        "spice_gen_name boost"
                    document.getElementById("color_shift_info").innerHTML =
                        "You have " +
                        format_small(game.color_boosts) +
                        " color augments,<br>boosting ALL " +
                        spice_text[0] +
                        " generators " +
                        format_idec(
                            new Decimal(
                                2 +
                                    0.2 * game.prestige_bought[2] +
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
                    if (game.prestige_bought[18] >= 1)
                        document.getElementById("color_shift_info").innerHTML =
                            "You have " +
                            format_small(game.color_boosts) +
                            " color augments,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
                            format_idec(
                                new Decimal(
                                    6 +
                                        2 *
                                            (game.ascend_bought[2] +
                                                game.ascend_bought[14])
                                ).pow(
                                    (game.color_boosts * 2 - 4) *
                                        antispice_boosts
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
                            " color augments,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
                            format_idec(
                                new Decimal(2).pow(
                                    (game.color_boosts * 2 - 4) *
                                        antispice_boosts
                                ),
                                game.notation
                            ) +
                            "x<br><br>After " +
                            format_small(game.augment_start) +
                            " color boosts, color augments begin with much harsher scaling"
                    document.getElementById("color_shift_button").innerHTML =
                        "Reset for a " + spice_text[0] + " boost"
                    if (game.prestige_bought[22] >= 1)
                        document.getElementById(
                            "color_shift_button"
                        ).innerHTML = "Gain a " + spice_text[0] + " boost"
                } else if (game.color_boosts >= 4) {
                    document.getElementById("color_shift_header").innerHTML =
                        "Color Boost"
                    if (game.color_boosts >= 5) {
                        document.getElementById("color_shift_info").innerHTML =
                            "You have " +
                            format_small(game.color_boosts) +
                            " color boosts,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
                            format_idec(
                                new Decimal(
                                    2 +
                                        0.2 * game.prestige_bought[2] +
                                        2 *
                                            (game.ascend_bought[2] +
                                                game.ascend_bought[14])
                                ).pow(
                                    (game.color_boosts * 2 - 4) *
                                        antispice_boosts
                                ),
                                game.notation
                            ) +
                            "x<br><br>After " +
                            format_small(game.augment_start) +
                            " color boosts, color augments begin with much harsher scaling"
                        if (game.prestige_bought[18] >= 1)
                            document.getElementById(
                                "color_shift_info"
                            ).innerHTML =
                                "You have " +
                                format_small(game.color_boosts) +
                                " color boosts,<br>boosting ALL " +
                                spice_text[0] +
                                " generators " +
                                format_idec(
                                    new Decimal(
                                        6 +
                                            2 *
                                                (game.ascend_bought[2] +
                                                    game.ascend_bought[14])
                                    ).pow(
                                        (game.color_boosts * 2 - 4) *
                                            antispice_boosts
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
                            document.getElementById(
                                "color_shift_info"
                            ).innerHTML =
                                "You have " +
                                format_small(game.color_boosts) +
                                " color boosts,<br>boosting ALL " +
                                spice_text[0] +
                                " generators " +
                                format_idec(
                                    new Decimal(2).pow(
                                        (game.color_boosts * 2 - 4) *
                                            antispice_boosts
                                    ),
                                    game.notation
                                ) +
                                "x<br><br>After " +
                                format_small(game.augment_start) +
                                " color boosts, color augments begin with much harsher scaling"
                    } else {
                        document.getElementById("color_shift_info").innerHTML =
                            "You have " +
                            format_small(game.color_boosts) +
                            " color shifts,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
                            format_idec(
                                new Decimal(
                                    2 +
                                        0.2 * game.prestige_bought[2] +
                                        2 *
                                            (game.ascend_bought[2] +
                                                game.ascend_bought[14])
                                ).pow(
                                    (game.color_boosts * 2 - 4) *
                                        antispice_boosts
                                ),
                                game.notation
                            ) +
                            "x<br><br>After " +
                            format_small(game.augment_start) +
                            " color boosts, color augments begin with much harsher scaling"
                        if (game.prestige_bought[18] >= 1)
                            document.getElementById(
                                "color_shift_info"
                            ).innerHTML =
                                "You have " +
                                format_small(game.color_boosts) +
                                " color shifts,<br>boosting ALL " +
                                spice_text[0] +
                                " generators " +
                                format_idec(
                                    new Decimal(
                                        6 +
                                            2 *
                                                (game.ascend_bought[2] +
                                                    game.ascend_bought[14])
                                    ).pow(
                                        (game.color_boosts * 2 - 4) *
                                            antispice_boosts
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
                            document.getElementById(
                                "color_shift_info"
                            ).innerHTML =
                                "You have " +
                                format_small(game.color_boosts) +
                                " color shifts,<br>boosting ALL " +
                                spice_text[0] +
                                " generators " +
                                format_idec(
                                    new Decimal(2).pow(
                                        (game.color_boosts * 2 - 4) *
                                            antispice_boosts
                                    ),
                                    game.notation
                                ) +
                                "x<br><br>After " +
                                format_small(game.augment_start) +
                                " color boosts, color augments begin with much harsher scaling"
                    }
                    document.getElementById("color_shift_button").innerHTML =
                        "Reset for a " + spice_text[0] + " boost"
                    if (game.prestige_bought[22] >= 1)
                        document.getElementById(
                            "color_shift_button"
                        ).innerHTML = "Gain a " + spice_text[0] + " boost"
                } else {
                    document.getElementById("color_shift_header").innerHTML =
                        "Color Shift"
                    document.getElementById("color_shift_info").innerHTML =
                        "You have " +
                        format_small(game.color_boosts) +
                        " color shifts,<br>boosting ALL " +
                        spice_text[0] +
                        " generators " +
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
                            " color shifts,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
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
                            " color shifts,<br>boosting ALL " +
                            spice_text[0] +
                            " generators " +
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
                        "Reset for a new " + spice_text[0] + " color"
                }
            }
        }
        if (
            game.color_boosts >= 4 &&
            game.color_boosts < 10 &&
            game.prestige === 0 &&
            game.ascend === 0 &&
            game.collapse === 0 &&
            game.expand === 0
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
                    " red " +
                    spice_text[0] +
                    " galaxies"
                break
            case 1:
                document.getElementById("color_shift_req").innerHTML =
                    "Requires " +
                    format_small(50 * scaling) +
                    " yellow " +
                    spice_text[0] +
                    " galaxies"
                break
            case 2:
                document.getElementById("color_shift_req").innerHTML =
                    "Requires " +
                    format_small(50 * scaling) +
                    " green " +
                    spice_text[0] +
                    " galaxies"
                break
            case 3:
                document.getElementById("color_shift_req").innerHTML =
                    "Requires " +
                    format_small(50 * scaling) +
                    " blue " +
                    spice_text[0] +
                    " galaxies"
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
                            " pink " +
                            spice_text[0] +
                            " galaxies"
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
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 29)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 50 - 250) * scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 133)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 75 - 975) * scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 223)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 100 - 4300) * scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 523)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 150 - 15450) * scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 1201)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 200 - 41600) * scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 4104)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 300 - 161700) * scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 7501)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 500 - 982500) * scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 80003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1000 - 4733000) *
                                        scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 132003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1500 - 44734500) *
                                        scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 1666667)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 2500 - 176737500) *
                                        scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= game.augment_start)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 4000 - 2676738000) *
                                        scaling
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies"
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
                                " pink " +
                                spice_text[0] +
                                " galaxies"
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
                            " pink " +
                            spice_text[0] +
                            " galaxies"
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
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 29)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 50 - 250) * scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 133)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 75 - 975) * scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 223)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 100 - 4300) * scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 523)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 150 - 15450) * scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 1201)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 200 - 41600) * scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 4104)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 300 - 161700) * scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 7500)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 500 - 982500) * scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 80003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1000 - 4733000) *
                                        scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 132003)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 1500 - 44734500) *
                                        scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= 1666667)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 2500 - 176737500) *
                                        scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
                        else if (game.color_boosts <= game.augment_start)
                            document.getElementById(
                                "color_shift_req"
                            ).innerHTML =
                                "Requires " +
                                format_small(
                                    (game.color_boosts * 4000 - 2676738000) *
                                        scaling
                                ) +
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
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
                                " bought pink " +
                                spice_text[0] +
                                " galaxies"
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
            document.getElementById("green").removeAttribute("aria-disabled")

            if (game.color_boosts >= 3) {
                document.getElementById("green_max_all").style.display = "block"
                document.getElementById("blue").innerHTML = "BLUE"
                if (game.subtab[0] === 3)
                    document.getElementById("blue").className =
                        "subtab selected"
                else
                    document.getElementById("blue").className =
                        "subtab unlocked"
                document.getElementById("blue").removeAttribute("aria-disabled")

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
                    document.getElementById("pink").removeAttribute("aria-disabled")

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
                    document.getElementById("pink").setAttribute("aria-disabled", "true")
                }
            } else {
                document.getElementById("green_max_all").style.display = "none"
                document.getElementById("blue").innerHTML = "LOCKED"
                document.getElementById("blue").className = "subtab locked"
                document.getElementById("blue").setAttribute("aria-disabled", "true")
                document.getElementById("pink").innerHTML = "LOCKED"
                document.getElementById("pink").className = "subtab locked"
                document.getElementById("pink").setAttribute("aria-disabled", "true")
            }
        } else {
            document.getElementById("yellow_max_all").style.display = "none"
            document.getElementById("green").innerHTML = "LOCKED"
            document.getElementById("green").className = "subtab locked"
            document.getElementById("green").setAttribute("aria-disabled", "true")
            document.getElementById("blue").innerHTML = "LOCKED"
            document.getElementById("blue").className = "subtab locked"
            document.getElementById("blue").setAttribute("aria-disabled", "true")
            document.getElementById("pink").innerHTML = "LOCKED"
            document.getElementById("pink").className = "subtab locked"
            document.getElementById("pink").setAttribute("aria-disabled", "true")
        }
    } else {
        document.getElementById("spices_tabs").style.display = "none"
        document.getElementById("red_max_all").style.display = "none"
    }

    if (
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
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
