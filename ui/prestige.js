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
            if (game.galactic_bought[14]) {
                amount = amount.mul(Decimal.pow(2, game.ascend ** 0.5 * 20000))
            } else {
                if (game.ascend < 5120)
                    amount = amount.mul(Decimal.pow(2, game.ascend / 10))
                else
                    amount = amount.mul(
                        Decimal.pow(
                            2,
                            5 * (2 * game.ascend - 7740) ** 0.5 + 262
                        )
                    )
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

        if (game.ascend_challenge === 0)
            amount = amount.pow(1 + game.realm_effects[2] / 100)

        document.getElementById("prestige_up").innerHTML =
            "+" +
            format_idec(amount, game.notation) +
            rainbow_unit +
            " rainbow " +
            spice_text[0]
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
                    amount.div(game.real_time_played[1]).mul(60),
                    game.notation
                ) +
                rainbow_unit +
                " rainbow " +
                spice_text[0] +
                "/min"

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
                                " rainbow " +
                                spice_text[0] +
                                "/min at " +
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
                                " rainbow " +
                                spice_text[0] +
                                "/min at " +
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
                            " rainbow " +
                            spice_text[0] +
                            "/min at +" +
                            format_idec(
                                game.peak_rainbow_amount,
                                game.notation
                            ) +
                            rainbow_unit +
                            " rainbow " +
                            spice_text[0]
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
                                " rainbow " +
                                spice_text[0] +
                                "/min at " +
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
                                " rainbow " +
                                spice_text[0] +
                                "/min at " +
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
                    " rainbow " +
                    spice_text[0] +
                    "/min"
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
                " rainbow " +
                spice_text[0] +
                "/min"

            efficiency_str +=
                "<br>Peak: +" +
                format_dec(0, game.notation) +
                rainbow_unit +
                " rainbow " +
                spice_text[0] +
                "/min"

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
                    " rainbow " +
                    spice_text[0]
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
            if (game.galactic_bought[14]) {
                amount = amount.mul(Decimal.pow(2, game.ascend ** 0.5 * 20000))
            } else {
                if (game.ascend >= 5120) {
                    amount = amount.mul(
                        Decimal.pow(
                            2,
                            5 * (2 * game.ascend - 7740) ** 0.5 + 262
                        )
                    )
                } else {
                    amount = amount.mul(Decimal.pow(2, game.ascend / 10))
                }
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

        if (game.ascend_challenge === 0)
            amount = amount.pow(1 + game.realm_effects[2] / 100)

        let str =
            "+" +
            format_dec(0, game.notation) +
            rainbow_unit +
            " rainbow " +
            spice_text[0] +
            "/sec"
        if (game.color_boosts >= 10) {
            str =
                "+" +
                format_idec(
                    amount
                        .div(10)
                        .mul(game.realtime_production ? game.gamespeed : 1),
                    game.notation
                ) +
                rainbow_unit +
                " rainbow " +
                spice_text[0] +
                "/sec"
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
                        u.desc = "Unlocks automation for red " + spice_text[0]
                        break
                    case 1:
                        u.desc =
                            "Unlocks automation for yellow " + spice_text[0]
                        break
                    case 2:
                        u.desc = "Unlocks automation for green " + spice_text[0]
                        break
                    case 3:
                        u.desc = "Unlocks automation for blue " + spice_text[0]
                        break
                    case 4:
                    default:
                        u.desc = "Unlocks automation for pink " + spice_text[0]
                        break
                }
                break
            case 1:
                if (game.prestige >= 1)
                    if (game.ascend_bought[1]) {
                        if (game.galactic_bought[10]) {
                            if (game.prestige >= 4e15) {
                                u.desc =
                                    "Times Prestiged stat boosts all " +
                                    spice_text[0] +
                                    " production<br>(Currently: " +
                                    format_idec(
                                        Decimal.pow(
                                            10,
                                            (game.prestige / 4e15) ** 0.5 *
                                                1.2e18 *
                                                phi
                                        ),
                                        game.notation
                                    ) +
                                    "x)"
                            } else {
                                u.desc =
                                    "Times Prestiged stat boosts all " +
                                    spice_text[0] +
                                    " production<br>(Currently: " +
                                    format_idec(
                                        Decimal.pow(
                                            10,
                                            game.prestige * 300 * phi
                                        ),
                                        game.notation
                                    ) +
                                    "x)"
                            }
                        } else {
                            if (game.prestige >= 1000000) {
                                u.desc =
                                    "Times Prestiged stat boosts all " +
                                    spice_text[0] +
                                    " production<br>(Currently: " +
                                    format_idec(
                                        Decimal.pow(
                                            1e25,
                                            10 *
                                                (game.prestige - 914447) **
                                                    0.25 +
                                                829.5
                                        ),
                                        game.notation
                                    ) +
                                    "x)"
                            } else {
                                u.desc =
                                    "Times Prestiged stat boosts all " +
                                    spice_text[0] +
                                    " production<br>(Currently: " +
                                    format_idec(
                                        Decimal.pow(
                                            1e25,
                                            game.prestige **
                                                (0.5 +
                                                    40 / (game.prestige + 80))
                                        ),
                                        game.notation
                                    ) +
                                    "x)"
                            }
                        }
                    } else {
                        u.desc =
                            "Times Prestiged stat boosts all " +
                            spice_text[0] +
                            " production<br>(Currently: " +
                            format_num(
                                2.5 * game.prestige * (game.prestige + 1),
                                game.notation
                            ) +
                            "x)"
                    }
                else
                    u.desc =
                        "Times Prestiged stat boosts all " +
                        spice_text[0] +
                        " production<br>(Currently: " +
                        format_num(1, game.notation) +
                        "x)"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Times Prestiged stat boosts all " +
                        spice_text[0] +
                        " production<br>(Disabled)"
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
                    "All " +
                    spice_text[0] +
                    " production is boosted based on unspent rainbow " +
                    spice_text[0] +
                    "<br>(Currently: " +
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
                        "All " +
                        spice_text[0] +
                        " production is boosted based on unspent rainbow " +
                        spice_text[0] +
                        "<br>(Disabled)"
                break
            case 8:
                u.desc =
                    "All " +
                    spice_text[0] +
                    "s boost the previous color based on that " +
                    spice_text[0] +
                    "'s total amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "All " +
                        spice_text[0] +
                        "s boost the previous color based on that " +
                        spice_text[0] +
                        "'s total amount<br>(Disabled)"
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
                u.desc =
                    "Red " +
                    spice_text[0] +
                    " boosts every other color by its total amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Red " +
                        spice_text[0] +
                        " boosts every other color by its total amount<br>(Disabled)"
                break
            case 14:
                u.desc =
                    "Crystallized " +
                    spice_text[0] +
                    " boosts pink " +
                    spice_text[0] +
                    " by its total amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystallized " +
                        spice_text[0] +
                        " boosts pink " +
                        spice_text[0] +
                        " by its total amount<br>(Disabled)"
                break
            case 16:
                u.desc =
                    "Crystallized " +
                    spice_text[0] +
                    " also boosts other colors by its total amount"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystallized " +
                        spice_text[0] +
                        " also boosts other colors by its total amount<br>(Disabled)"
                break
            case 17:
                u.desc =
                    "Crystallized " +
                    spice_text[0] +
                    " production is boosted based on your color boosts<br>(Currently: " +
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
                        "Crystallized " +
                        spice_text[0] +
                        " production is boosted based on your color boosts<br>(Disabled)"
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
                    "Crystal infusions also boost crystallized " +
                    spice_text[0] +
                    " production 1.08x"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystal infusions also boost crystallized " +
                        spice_text[0] +
                        " production 1.08x<br>(Disabled)"
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
                    else {
                        let free_infusions =
                            2 * game.prestige_bought[u.id] ** 2 -
                            18 * game.prestige_bought[u.id] +
                            156
                        if (
                            game.galactic_bought[2] &&
                            game.prestige_bought[20] >= 261
                        )
                            free_infusions =
                                (free_infusions - 130676) *
                                    (game.prestige_bought[20] - 259) +
                                130676
                        u.desc =
                            "You get " +
                            format_small(free_infusions) +
                            " free crystal infusions"
                    }
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
                    "Crystallized " +
                    spice_text[0] +
                    " production is boosted by unspent rainbow " +
                    spice_text[0] +
                    "<br>(Currently: " +
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
                        "Crystallized " +
                        spice_text[0] +
                        " production is boosted by unspent rainbow " +
                        spice_text[0] +
                        "<br>(Disabled)"
                break
            case 23:
                u.desc =
                    "Crystallized " +
                    spice_text[0] +
                    " furnace multipliers are raised to the 1.25 power"
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    u.desc =
                        "Crystallized " +
                        spice_text[0] +
                        " furnace multipliers are raised to the 1.25 power<br>(Disabled)"
                break
        }

        let button = prestige_map.get(u)
        document.getElementById("pr_desc" + u.id).innerHTML = u.desc
        document.getElementById("pr_cost" + u.id).innerHTML =
            "-" +
            format_idec(u.price, game.notation) +
            rainbow_unit +
            " rainbow " +
            spice_text[0]

        if (key.shift) {
            document.getElementById("pr_cost" + u.id).style.display = "none"
            document.getElementById("pr_desc" + u.id).innerHTML =
                '<span class="big">' + format_num(u.id + 1, 0) + "</span>"
        } else {
            document.getElementById("pr_cost" + u.id).style.display = "block"
        }

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

            if (game.collapse_challenge === 11 && game.expand === 0) {
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
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        synergy_str =
            "<br><br>Crystallized " +
            spice_text[0] +
            " synergies:<br>Pink " +
            spice_text[0] +
            " production " +
            format_idec(
                Decimal.max(
                    game.total_crystal_spice.pow(3).add(1).pow(antispice_power),
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
                "<br><br>Crystallized " +
                spice_text[0] +
                " synergies:<br>Pink " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        }
    }
    if (
        game.prestige_bought[16] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[16] === 0
        ) {
            synergy_str +=
                "<br>Red, yellow, green & blue " +
                spice_text[0] +
                " production " +
                format_dec(1, game.notation) +
                "x"
        } else {
            synergy_str +=
                "<br>Red, yellow, green & blue " +
                spice_text[0] +
                " production " +
                format_idec(
                    Decimal.max(
                        game.total_crystal_spice
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

    document.getElementById("crystal_spice_up").innerHTML =
        "+" +
        format_idec(
            game.crystal_spice_gen[0]
                .floor()
                .mul(game.total_crystal_spice_boost[0])
                .mul(game.realtime_production ? game.gamespeed : 1)
                .mul(3),
            game.notation
        ) +
        spice_unit +
        " crystallized " +
        spice_text[0] +
        "/sec" +
        synergy_str +
        limit_str
    if (
        game.crystal_spice_bought[0] >= 5n ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        document.getElementById("crystal_spice_up").innerHTML =
            "+" +
            format_idec(
                game.crystal_spice_gen[0]
                    .floor()
                    .mul(game.total_crystal_spice_boost[0])
                    .mul(game.realtime_production ? game.gamespeed : 1)
                    .mul(3),
                game.notation
            ) +
            spice_unit +
            " crystallized " +
            spice_text[0] +
            "/sec" +
            synergy_str +
            limit_str +
            "<br><br>For every five crystallized " +
            spice_text[0] +
            " generators bought, that generator's boost is multiplied by 2"

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
                        " crystallized " +
                        spice_text[0] +
                        " " +
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
                                .mul(
                                    game.realtime_production
                                        ? game.gamespeed
                                        : 1
                                )
                                .mul(3),
                            game.notation
                        ) +
                        " crystallized " +
                        spice_text[0] +
                        " " +
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
                        " crystallized " +
                        spice_text[0] +
                        " " +
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
                                    .mul(
                                        game.realtime_production
                                            ? game.gamespeed
                                            : 1
                                    )
                                    .mul(3),
                                game.notation
                            ) +
                            spice_unit +
                            " crystallized " +
                            spice_text[0] +
                            "/sec"
                        if (
                            game.prestige_bought[24] >= 1 &&
                            game.ascend_challenge !== 2
                        ) {
                            info_str +=
                                ",<br>and producing " +
                                format_idec(
                                    game.crystal_spice_gen[gen.id]
                                        .floor()
                                        .pow(2)
                                        .mul(
                                            game.realtime_production
                                                ? game.gamespeed
                                                : 1
                                        ),
                                    game.notation
                                ) +
                                " pink " +
                                spice_text[0] +
                                " galaxies/sec"
                        } else if (
                            game.ascend >= 1 ||
                            game.collapse >= 1 ||
                            game.expand >= 1
                        ) {
                            info_str +=
                                ",<br>and producing " +
                                format_dec(0, game.notation) +
                                " pink " +
                                spice_text[0] +
                                " galaxies/sec"
                        }
                    } else {
                        info_str +=
                            format_idec(
                                game.crystal_spice_gen[gen.id]
                                    .floor()
                                    .mul(game.total_crystal_spice_boost[gen.id])
                                    .mul(
                                        game.realtime_production
                                            ? game.gamespeed
                                            : 1
                                    )
                                    .mul(3),
                                game.notation
                            ) +
                            " crystallized " +
                            spice_text[0] +
                            " " +
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
                    "Your crystallized " +
                    spice_text[0] +
                    " " +
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
                    " rainbow " +
                    spice_text[0] +
                    ""
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
                    " rainbow " +
                    spice_text[0] +
                    ""
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

    if (
        game.crystal_spice_gen[2].cmp(5) >= 0 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
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
            " crystallized " +
            spice_text[0] +
            " strengtheners,<br>boosting all crystallized " +
            spice_text[0] +
            " generators " +
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
            " rainbow " +
            spice_text[0]
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
    if (game.prestige_bought[20] >= 13) {
        free_infusions =
            2 * game.prestige_bought[20] ** 2 -
            22 * game.prestige_bought[20] +
            176
        if (game.galactic_bought[2] && game.prestige_bought[20] >= 262)
            free_infusions =
                (free_infusions - 130676) * (game.prestige_bought[20] - 260) +
                130676
    }
    if (free_infusions > 0)
        s_str += " (+" + format_small(free_infusions) + " free)"
    if (game.ascend_complete[2] && game.ascend_bought[24]) {
        if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
            s_str +=
                ",<br>boosting all normal " +
                spice_text[0] +
                " generators " +
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
                ",<br>boosting all normal " +
                spice_text[0] +
                " generators " +
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
            ",<br>boosting all normal " +
            spice_text[0] +
            " generators " +
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
            ",<br>boosting all normal " +
            spice_text[0] +
            " generators " +
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
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        if (
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 12 ||
            game.prestige_bought[19] === 0
        ) {
            s_str +=
                ",<br>and boosting all crystallized " +
                spice_text[0] +
                " generators " +
                format_dec(1, game.notation) +
                "x"
        } else {
            s_str +=
                ",<br>and boosting all crystallized " +
                spice_text[0] +
                " generators " +
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
        " crystallized " +
        spice_text[0]
    if (game.ascend_challenge === 1 || game.collapse_challenge === 7)
        document.getElementById("crystal_cost_i").innerHTML =
            "-Infinity " + spice_unit + " crystallized " + spice_text[0]
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
        game.collapse >= 1 ||
        game.expand >= 1
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
