//graphics updates for ascension page
function ascension_update() {
    let rainbow_unit = " μg"
    if (game.notation === 14) rainbow_unit = ""

    let goal = Decimal.pow(2, 1024)
    if (game.ascend_challenge !== 0) {
        goal = ascension_challenge.challenges[game.ascend_challenge - 1].goal
    }

    if (game.rainbow_spice.cmp(goal) >= 0 && game.collapse_challenge !== 11) {
        document.getElementById("ascend_button").className =
            "ascend_button a_unlocked"
        document.getElementById("ascend_up").style.display = "block"
        let amount = game.rainbow_spice.pow(1 / 128).div(256)
        let original_amount = amount
            .pow(1 + game.realm_effects[2] / 100)
            .floor()

        if (game.research_complete[12] >= 1 && game.collapse_challenge !== 12) {
            if (game.collapse <= 612) {
                amount = amount.mul(
                    Decimal.pow(7.27e27, (game.collapse / 5) ** 0.5)
                )
            } else {
                amount = amount.mul(
                    Decimal.pow(
                        7.27e27,
                        (2 * game.collapse - 1013.3) ** 0.25 + 7.2535
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

        amount = amount.pow(1 + game.realm_effects[2] / 100)

        document.getElementById("ascend_up").innerHTML =
            "+" + format_inum(amount.floor(), game.notation) + " ᚫ"
        document.getElementById("ascend_req").style.color = "white"
        document.getElementById("ascend_req").innerHTML =
            format_idec(
                Decimal.pow(2, 1024).mul(
                    Decimal.pow(
                        original_amount
                            .pow(100 / (game.realm_effects[2] + 100))
                            .add(1),
                        128
                    )
                ),
                game.notation
            ) +
            rainbow_unit +
            " rainbow " +
            spice_text[0] +
            " for next ᚫ"

        if (game.resource_efficiency && game.ascend_challenge === 0) {
            document.getElementById("ascend_efficiency").style.display = "block"

            let efficiency_str =
                "Currently: +" +
                format_idec(
                    amount.div(game.real_time_played[2]).mul(60),
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
            " rainbow " +
            spice_text[0] +
            " required"
        if (game.collapse_challenge === 11)
            document.getElementById("ascend_req").innerHTML =
                "Cannot Ascend in Challenge 11"

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
                    Decimal.pow(0.5, game.rune_power[0].div(250))
                        .mul(0.4 * rune_speed)
                        .mul(game.realtime_production ? game.gamespeed : 1),
                    game.notation
                ) +
                " ᛡ power/sec<br>You have " +
                format_inum(game.rune_power[0].floor(), game.notation) +
                " ᛡ power, boosting red " +
                spice_text[0] +
                " production " +
                format_idec(game.rune_boost[0], game.notation) +
                "x"
        } else {
            document.getElementById("jera_text").innerHTML =
                "You have " +
                format_num(0, game.notation) +
                " ᛡ, producing " +
                format_dec(
                    0.2 * rune_speed * game.realtime_production
                        ? game.gamespeed
                        : 1,
                    game.notation
                ) +
                " ᛡ power/sec<br>You have " +
                format_inum(game.rune_power[0].floor(), game.notation) +
                " ᛡ power, boosting red " +
                spice_text[0] +
                " production " +
                format_idec(game.rune_boost[0], game.notation) +
                "x"
        }
    } else {
        document.getElementById("jera_text").innerHTML =
            "You have " +
            format_inum(game.rune[0], game.notation) +
            " ᛡ, producing " +
            format_idec(
                game.rune[0]
                    .pow(rune_exp)
                    .mul(rune_speed)
                    .mul(game.realtime_production ? game.gamespeed : 1),
                game.notation
            ) +
            " ᛡ power/sec<br>You have " +
            format_inum(game.rune_power[0].floor(), game.notation) +
            " ᛡ power, boosting red " +
            spice_text[0] +
            " production " +
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
                    Decimal.pow(0.5, game.rune_power[1].div(250))
                        .mul(0.4 * rune_speed)
                        .mul(game.realtime_production ? game.gamespeed : 1),
                    game.notation
                ) +
                " ᚱ power/sec<br>You have " +
                format_inum(game.rune_power[1].floor(), game.notation) +
                " ᚱ power, boosting yellow, green, & blue " +
                spice_text[0] +
                " production " +
                format_idec(game.rune_boost[1], game.notation) +
                "x"
        } else {
            document.getElementById("raido_text").innerHTML =
                "You have " +
                format_num(0, game.notation) +
                " ᚱ, producing " +
                format_dec(
                    0.2 * rune_speed * game.realtime_production
                        ? game.gamespeed
                        : 1,
                    game.notation
                ) +
                " ᚱ power/sec<br>You have " +
                format_inum(game.rune_power[1].floor(), game.notation) +
                " ᚱ power, boosting yellow, green, & blue " +
                spice_text[0] +
                " production " +
                format_idec(game.rune_boost[1], game.notation) +
                "x"
        }
    } else {
        document.getElementById("raido_text").innerHTML =
            "You have " +
            format_inum(game.rune[1], game.notation) +
            " ᚱ, producing " +
            format_idec(
                game.rune[1]
                    .pow(rune_exp)
                    .mul(rune_speed)
                    .mul(game.realtime_production ? game.gamespeed : 1),
                game.notation
            ) +
            " ᚱ power/sec<br>You have " +
            format_inum(game.rune_power[1].floor(), game.notation) +
            " ᚱ power, boosting yellow, green, & blue " +
            spice_text[0] +
            " production " +
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
                    Decimal.pow(0.5, game.rune_power[2].div(250))
                        .mul(0.4 * rune_speed)
                        .mul(game.realtime_production ? game.gamespeed : 1),
                    game.notation
                ) +
                " ᛟ power/sec<br>You have " +
                format_inum(game.rune_power[2].floor(), game.notation) +
                " ᛟ power, boosting pink " +
                spice_text[0] +
                " production " +
                format_idec(game.rune_boost[2], game.notation) +
                "x"
        } else {
            document.getElementById("othala_text").innerHTML =
                "You have " +
                format_num(0, game.notation) +
                " ᛟ, producing " +
                format_dec(
                    0.2 * rune_speed * game.realtime_production
                        ? game.gamespeed
                        : 1,
                    game.notation
                ) +
                " ᛟ power/sec<br>You have " +
                format_inum(game.rune_power[2].floor(), game.notation) +
                " ᛟ power, boosting pink " +
                spice_text[0] +
                " production " +
                format_idec(game.rune_boost[2], game.notation) +
                "x"
        }
    } else {
        document.getElementById("othala_text").innerHTML =
            "You have " +
            format_inum(game.rune[2], game.notation) +
            " ᛟ, producing " +
            format_idec(
                game.rune[2]
                    .pow(rune_exp)
                    .mul(rune_speed)
                    .mul(game.realtime_production ? game.gamespeed : 1),
                game.notation
            ) +
            " ᛟ power/sec<br>You have " +
            format_inum(game.rune_power[2].floor(), game.notation) +
            " ᛟ power, boosting pink " +
            spice_text[0] +
            " production " +
            format_idec(game.rune_boost[2], game.notation) +
            "x"
    }

    if (
        game.rune[2].cmp(1) === -1 &&
        game.collapse === 0 &&
        game.expand === 0
    ) {
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

    if (game.ascend_bought[16] || game.collapse >= 1 || game.expand >= 1) {
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
        document.getElementById("ascension_challenges").removeAttribute("aria-disabled")
    } else {
        document.getElementById("ascension_challenges").innerHTML = "LOCKED"
        document.getElementById("ascension_challenges").className =
            "subtab locked"
        document.getElementById("ascension_challenges").setAttribute("aria-disabled", "true")
    }

    if (
        (game.ascend_complete[0] && game.ascend_bought[16]) ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        document.getElementById("arcane_spice").innerHTML =
            "ARCANE&nbsp;" + spice_text[2]
        if (game.subtab[3] === 3)
            document.getElementById("arcane_spice").className =
                "subtab selected"
        else
            document.getElementById("arcane_spice").className =
                "subtab unlocked"
        document.getElementById("arcane_spice").removeAttribute("aria-disabled")
    } else {
        document.getElementById("arcane_spice").innerHTML = "LOCKED"
        document.getElementById("arcane_spice").className = "subtab locked"
        document.getElementById("arcane_spice").setAttribute("aria-disabled", "true")
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
            if (game.collapse <= 612) {
                amount = amount.mul(
                    Decimal.pow(7.27e27, (game.collapse / 5) ** 0.5)
                )
            } else {
                amount = amount.mul(
                    Decimal.pow(
                        7.27e27,
                        (2 * game.collapse - 1013.3) ** 0.25 + 7.2535
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

        amount = amount.pow(1 + game.realm_effects[2] / 100)

        let str = "+" + format_dec(0, game.notation) + " ᚫ/sec"
        if (game.rainbow_spice.cmp(Decimal.pow(2, 1024)) >= 0) {
            str =
                "+" +
                format_idec(
                    amount
                        .floor()
                        .mul(0.01)
                        .mul(game.realtime_production ? game.gamespeed : 1),
                    game.notation
                ) +
                " ᚫ/sec"
        }
        if (game.collapse_challenge === 11) {
            str = "+" + format_dec(0, game.notation) + " ᚫ/sec"
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
                    "The boost from red " +
                    spice_text[0] +
                    " amount is " +
                    format_small(2) +
                    "x stronger"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "The boost from red " +
                        spice_text[0] +
                        " amount is " +
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
                u.desc =
                    "Crystallized " +
                    spice_text[0] +
                    " generator multipliers are stronger"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystallized " +
                        spice_text[0] +
                        " generator multipliers are stronger<br>(Disabled)"
                break
            case 6:
                u.desc =
                    "Crystal infusions boost crystallized " +
                    spice_text[0] +
                    " production " +
                    format_dec(1.12) +
                    "x"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystal infusions boost crystallized " +
                        spice_text[0] +
                        " production " +
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
                u.desc =
                    "Pink " +
                    spice_text[0] +
                    " boosts crystallized " +
                    spice_text[0] +
                    " by its total amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Pink " +
                        spice_text[0] +
                        " boosts crystallized " +
                        spice_text[0] +
                        " by its total amount<br>(Disabled)"
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
                if (game.ascend < 5120)
                    u.desc =
                        "Times Ascended stat boosts rainbow " +
                        spice_text[0] +
                        " gains<br>(Currently: " +
                        format_idec(
                            Decimal.pow(2, game.ascend / 10),
                            game.notation
                        ) +
                        "x)"
                else
                    u.desc =
                        "Times Ascended stat boosts rainbow " +
                        spice_text[0] +
                        " gains<br>(Currently: " +
                        format_idec(
                            Decimal.pow(
                                2,
                                5 * (2 * game.ascend - 7740) ** 0.5 + 262
                            ),
                            game.notation
                        ) +
                        "x)"
                if (game.galactic_bought[14]) {
                    u.desc =
                        "Times Ascended stat boosts rainbow " +
                        spice_text[0] +
                        " gains<br>(Currently: " +
                        format_idec(
                            Decimal.pow(2, game.ascend ** 0.5 * 20000),
                            game.notation
                        ) +
                        "x)"
                }
                if (
                    game.ascend_challenge !== 0 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Times Ascended stat boosts rainbow " +
                        spice_text[0] +
                        " gains<br>(Disabled)"
                break
            case 18:
                u.desc =
                    "Red " +
                    spice_text[0] +
                    " boosts crystallized " +
                    spice_text[0] +
                    " by its total amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Red " +
                        spice_text[0] +
                        " boosts crystallized " +
                        spice_text[0] +
                        " by its total amount<br>(Disabled)"
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
                    "Arcane " +
                    spice_text[0] +
                    " is boosted based on unused Ansuz runes<br>(Currently: " +
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
                        "Arcane " +
                        spice_text[0] +
                        " is boosted based on unused Ansuz runes<br>(Disabled)"
                break
            case 21:
                u.desc =
                    "You gain " +
                    format_small(Math.floor(game.color_boosts / 50) + 1) +
                    "x more Times Prestiged stat<br>(based on color boosts)"
                break
            case 22:
                u.desc =
                    "Arcane " +
                    spice_text[0] +
                    " boosts crystallized " +
                    spice_text[0] +
                    " by its total amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Arcane " +
                        spice_text[0] +
                        " boosts crystallized " +
                        spice_text[0] +
                        " by its total amount<br>(Disabled)"
                break
            case 26:
                u.desc =
                    "Boosts from rune power are " +
                    format_small(50) +
                    "% stronger"
                break
            case 29:
                u.desc =
                    "Arcane enchantments also boost arcane " +
                    spice_text[0] +
                    " production " +
                    format_dec(13 / 12, game.notation) +
                    "x"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Arcane enchantments also boost arcane " +
                        spice_text[0] +
                        " production " +
                        format_dec(4 / 3, game.notation) +
                        "x<br>(Disabled)"
                break
            case 30:
                u.desc =
                    "Red " +
                    spice_text[0] +
                    " boosts arcane " +
                    spice_text[0] +
                    " by its total amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Red " +
                        spice_text[0] +
                        " boosts arcane " +
                        spice_text[0] +
                        " by its total amount<br>(Disabled)"
                break
            case 31:
                u.desc =
                    "Arcane " +
                    spice_text[0] +
                    " boosts itself by its total amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Arcane " +
                        spice_text[0] +
                        " boosts itself by its total amount<br>(Disabled)"
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
                "-" + format_inum(u.price.pow(0.5).ceil(), game.notation) + " ᚫ"
        } else {
            document.getElementById("as_desc" + u.id).innerHTML = u.desc
            document.getElementById("as_cost" + u.id).innerHTML =
                "-" + format_inum(u.price, game.notation) + " ᚫ"
        }

        if (key.shift >= 0) {
            let id_list = [
                "1",
                "2",
                "3",
                "4",
                "5b",
                "6b",
                "7b",
                "8c",
                "5a",
                "6a",
                "7a",
                "8a",
                "8b",
                "9",
                "10",
                "11",
                "12",
                "13a",
                "14a",
                "15a",
                "14c",
                "13b",
                "14b",
                "15b",
                "14d",
                "16",
                "17",
                "18a",
                "18b",
                "19a",
                "19c",
                "19b",
                "20",
                "21",
                "22",
            ]

            document.getElementById("as_cost" + u.id).style.display = "none"
            document.getElementById("as_desc" + u.id).innerHTML =
                '<span class="big">' + id_list[u.id] + "</span>"
        } else {
            document.getElementById("as_cost" + u.id).style.display = "block"
        }

        let visible = true

        if (game.collapse >= 1 || game.expand >= 1) {
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
                    game.ansuz.cmp(u.price.pow(0.5).ceil()) >= 0 &&
                    condition1 &&
                    condition2 &&
                    (game.rune[2].cmp(1) >= 0 ||
                        game.collapse >= 1 ||
                        game.expand >= 1)
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
                    (game.rune[2].cmp(1) >= 0 ||
                        game.collapse >= 1 ||
                        game.expand >= 1)
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

        if (game.galactic_bought[6]) {
            document.getElementById("ascend_c11").style.display = "flex"
        } else {
            document.getElementById("ascend_c11").style.display = "none"
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

    if ((game.collapse >= 1 || game.expand >= 1) && !game.ascend_bought[16]) {
        document.getElementById("ascend_challenge_unlock").style.display =
            "block"
    } else {
        document.getElementById("ascend_challenge_unlock").style.display =
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
                " rainbow " +
                spice_text[0] +
                "</span>"

            if (c.id === 5 && (game.collapse >= 1 || game.expand >= 1)) {
                info.innerHTML =
                    "All " +
                    spice_text[0] +
                    " production boosts from Prestige and Ascension upgrades<br>are disabled, and rune power production is disabled<br>Completing this Challenge is required to Collapse<br>Goal: <span class='rainbow_spice'>" +
                    format_infdec(c.goal, game.notation) +
                    rainbow_unit +
                    " rainbow " +
                    spice_text[0] +
                    "</span>"
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
    if (game.ascend_bought[22] || game.collapse >= 1 || game.expand >= 1) {
        synergy_str =
            "<br><br>Arcane " +
            spice_text[0] +
            " synergies:<br>Crystallized " +
            spice_text[0] +
            " production " +
            format_idec(
                Decimal.max(
                    game.total_arcane_spice.pow(20).add(1).pow(antispice_power),
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
                "<br><br>Arcane " +
                spice_text[0] +
                " synergies:<br>Crystallized " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        }
    }
    if (game.ascend_bought[31] || game.collapse >= 1 || game.expand >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[31]
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
                        game.total_arcane_spice
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

    document.getElementById("arcane_spice_up").innerHTML =
        "+" +
        format_idec(
            game.arcane_spice_gen[0]
                .floor()
                .mul(game.total_arcane_spice_boost[0])
                .mul(game.realtime_production ? game.gamespeed : 1)
                .mul(5),
            game.notation
        ) +
        arcane_unit +
        " arcane " +
        spice_text[0] +
        "/sec" +
        synergy_str +
        limit_str
    if (
        game.arcane_spice_bought[0] >= 3n ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        document.getElementById("arcane_spice_up").innerHTML =
            "+" +
            format_idec(
                game.arcane_spice_gen[0]
                    .floor()
                    .mul(game.total_arcane_spice_boost[0])
                    .mul(game.realtime_production ? game.gamespeed : 1)
                    .mul(5),
                game.notation
            ) +
            arcane_unit +
            " arcane " +
            spice_text[0] +
            "/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every three arcane " +
            spice_text[0] +
            " generators bought, that generator's boost is multiplied by 3"

    if (game.ascend_complete[0] && game.ascend_bought[16]) {
        document.getElementById("arcane_gen_page").style.display = "flex"
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
                        " arcane " +
                        spice_text[0] +
                        " " +
                        gen.plural
                    if (
                        game.arcane_spice_gen[gen.id].cmp(
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
                    if (gen.id === 5) {
                        info_str =
                            "You have " +
                            format_inum(
                                game.arcane_spice_gen[gen.id]
                                    .floor()
                                    .add(game.free_deity),
                                game.notation
                            ) +
                            " arcane " +
                            spice_text[0] +
                            " " +
                            gen.plural
                        if (
                            game.arcane_spice_gen[gen.id]
                                .add(game.free_deity)
                                .cmp(
                                    new Decimal(
                                        game.arcane_spice_bought[
                                            gen.id
                                        ].toString()
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
                                    .mul(
                                        game.realtime_production
                                            ? game.gamespeed
                                            : 1
                                    )
                                    .mul(5),
                                game.notation
                            ) +
                            arcane_unit +
                            " arcane " +
                            spice_text[0] +
                            "/sec"
                        if (
                            game.ascend_bought[32] &&
                            game.ascend_challenge !== 2
                        ) {
                            info_str +=
                                ",<br>and producing " +
                                format_idec(
                                    game.arcane_spice_gen[gen.id]
                                        .floor()
                                        .pow(36.5)
                                        .mul(
                                            game.realtime_production
                                                ? game.gamespeed
                                                : 1
                                        ),
                                    game.notation
                                ) +
                                " crystallized " +
                                spice_text[0] +
                                " galaxies/sec"
                        } else if (game.collapse >= 1 || game.expand >= 1) {
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
                                " crystallized " +
                                spice_text[0] +
                                " galaxies/sec"
                        }
                    } else {
                        if (gen.id === 5) {
                            info_str +=
                                format_idec(
                                    game.arcane_spice_gen[gen.id]
                                        .floor()
                                        .add(game.free_deity)
                                        .mul(
                                            game.total_arcane_spice_boost[
                                                gen.id
                                            ]
                                        )
                                        .mul(
                                            game.realtime_production
                                                ? game.gamespeed
                                                : 1
                                        )
                                        .mul(5),
                                    game.notation
                                ) +
                                " arcane " +
                                spice_text[0] +
                                " " +
                                spice_gen.generators[gen.rid - 1].plural +
                                "/sec"
                        } else {
                            info_str +=
                                format_idec(
                                    game.arcane_spice_gen[gen.id]
                                        .floor()
                                        .mul(
                                            game.total_arcane_spice_boost[
                                                gen.id
                                            ]
                                        )
                                        .mul(
                                            game.realtime_production
                                                ? game.gamespeed
                                                : 1
                                        )
                                        .mul(5),
                                    game.notation
                                ) +
                                " arcane " +
                                spice_text[0] +
                                " " +
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
                        "Your arcane " +
                        spice_text[0] +
                        " " +
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
                        document.getElementById(
                            "arcane_cost" + gen.id
                        ).className = "rune_cost"
                        document.getElementById(
                            "arcane_buy" + gen.id
                        ).className = "spice_buy can_buy"
                    } else {
                        document.getElementById(
                            "arcane_cost" + gen.id
                        ).className = "empty_cost"
                        document.getElementById(
                            "arcane_buy" + gen.id
                        ).className = "spice_buy"
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

                        document.getElementById(
                            "arcane_buy" + gen.id
                        ).style.width = "auto"

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
                        document.getElementById(
                            "arcane_buy" + gen.id
                        ).style.width = "auto"
                    }

                    n = 3n - (game.arcane_spice_bought[gen.id] % 3n)
                    price = game.arcane_spice_price[gen.id]
                        .mul(1 - 3 ** n.toString())
                        .div(-2)
                    document.getElementById("arcane_ucost" + gen.id).innerHTML =
                        "-" + format_inum(price.round(), game.notation) + " ᚫ"
                    if (game.ansuz.cmp(price) >= 0) {
                        document.getElementById(
                            "arcane_ucost" + gen.id
                        ).className = "rune_cost"
                        document.getElementById(
                            "arcane_ubuy" + gen.id
                        ).className = "spice_buy can_buy"
                    } else {
                        document.getElementById(
                            "arcane_ucost" + gen.id
                        ).className = "empty_cost"
                        document.getElementById(
                            "arcane_ubuy" + gen.id
                        ).className = "spice_buy"
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
    } else {
        document.getElementById("arcane_gen_page").style.display = "none"
    }

    if (
        game.arcane_unlocked[3] &&
        game.ascend_complete[0] &&
        game.ascend_bought[16]
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

        document.getElementById("arcane_gen_s").style.display = "block"
        let s_str =
            "You have " +
            format_small(game.arcane_strengthener) +
            " arcane " +
            spice_text[0] +
            " strengtheners,<br>boosting all arcane " +
            spice_text[0] +
            " generators " +
            format_dec(1, game.notation) +
            "x"
        if (game.arcane_strengthener >= 1) {
            s_str =
                "You have " +
                format_small(game.arcane_strengthener) +
                " arcane " +
                spice_text[0] +
                " strengtheners,<br>boosting all arcane " +
                spice_text[0] +
                " generators " +
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
        " arcane enchantments,<br>boosting all crystallized " +
        spice_text[0] +
        " generators " +
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
            " free),<br>boosting all crystallized " +
            spice_text[0] +
            " generators " +
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

    if (game.ascend_bought[29] || game.collapse >= 1 || game.expand >= 1) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            !game.ascend_bought[29]
        ) {
            s_str +=
                ",<br>and boosting all arcane " +
                spice_text[0] +
                " generators " +
                format_dec(1, game.notation) +
                "x"
        } else {
            if (game.free_enchantment > 0n) {
                s_str +=
                    ",<br>and boosting all arcane " +
                    spice_text[0] +
                    " generators " +
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
                    ",<br>and boosting all arcane " +
                    spice_text[0] +
                    " generators " +
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
        s_str =
            "Arcane enchantments refresh " +
            spice_text[0] +
            " production for 1 second"
    }

    document.getElementById("arcane_info_n").innerHTML = s_str
    document.getElementById("arcane_cost_n").innerHTML =
        "-" +
        format_idec(game.arcane_enchantment_price, game.notation) +
        arcane_unit +
        " arcane " +
        spice_text[0]
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

    if (
        game.arcane_max_unlocked &&
        game.ascend_complete[0] &&
        game.ascend_bought[16]
    ) {
        document.getElementById("arcane_max_all").style.display = "inline"
    } else {
        document.getElementById("arcane_max_all").style.display = "none"
    }

    if (
        (game.collapse >= 1 || game.expand >= 1) &&
        (!game.ascend_complete[0] || !game.ascend_bought[16])
    ) {
        document.getElementById("arcane_unlock").style.display = "block"
    } else {
        document.getElementById("arcane_unlock").style.display = "none"
    }

    if (game.ascend_bought[17])
        document.getElementById("enchantment_auto").style.display = "inline"
    else document.getElementById("enchantment_auto").style.display = "none"

    if (
        game.research_complete[11] >= 1 &&
        game.ascend_complete[0] &&
        game.ascend_bought[16]
    )
        document.getElementById("arcane_auto").style.display = "inline"
    else document.getElementById("arcane_auto").style.display = "none"
}
