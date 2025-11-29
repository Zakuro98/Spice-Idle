//updating whether tabs are available
function tabs_update() {
    if (
        game.color_boosts >= 10 ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        if (game.tab === 1)
            document.getElementById("prestige").className = "tab selected"
        else document.getElementById("prestige").className = "tab unlocked"
        document.getElementById("prestige").innerHTML = "PRESTIGE"
        document.getElementById("prestige").removeAttribute("aria-disabled")
    } else {
        document.getElementById("prestige").className = "tab locked"
        document.getElementById("prestige").innerHTML = "LOCKED"
        document.getElementById("prestige").setAttribute("aria-disabled", "true")
    }

    if (game.prestige_bought[25]) {
        if (game.tab === 2)
            document.getElementById("ascension").className = "tab selected"
        else document.getElementById("ascension").className = "tab unlocked"
        document.getElementById("ascension").innerHTML = "ASCENSION"
        document.getElementById("ascension").removeAttribute("aria-disabled")
    } else {
        document.getElementById("ascension").className = "tab locked"
        document.getElementById("ascension").innerHTML = "LOCKED"
        document.getElementById("ascension").setAttribute("aria-disabled", "true")
    }

    if (game.ascend_complete[5] || game.collapse >= 1 || game.expand >= 1) {
        if (game.tab === 3)
            document.getElementById("collapse").className = "tab selected"
        else document.getElementById("collapse").className = "tab unlocked"
        document.getElementById("collapse").innerHTML = "COLLAPSE"
        document.getElementById("collapse").removeAttribute("aria-disabled")
    } else {
        document.getElementById("collapse").className = "tab locked"
        document.getElementById("collapse").innerHTML = "LOCKED"
        document.getElementById("collapse").setAttribute("aria-disabled", "true")
    }

    if (game.antispice_bought[8] || game.expand >= 1) {
        if (game.tab === 4)
            document.getElementById("expansion").className = "tab selected"
        else document.getElementById("expansion").className = "tab unlocked"
        document.getElementById("expansion").innerHTML = "EXPANSION"
        document.getElementById("expansion").removeAttribute("aria-disabled")
    } else {
        document.getElementById("expansion").className = "tab locked"
        document.getElementById("expansion").innerHTML = "LOCKED"
        document.getElementById("expansion").setAttribute("aria-disabled", "true")
    }

    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    if (mobile) {
        document.getElementById("prestige_upgrades").innerHTML = "UPGRADES"
        document.getElementById("crystallized_spice").innerHTML =
            "CRYSTAL&nbsp;" + spice_text[2]
        document.getElementById("crystal_upgrades").innerHTML = "C.UPGRADES"
        document.getElementById("ascension_upgrades").innerHTML = "UPGRADES"
        document.getElementById("past_prestiges").innerHTML = "PRESTIGES"
    } else {
        document.getElementById("prestige_upgrades").innerHTML =
            "PRESTIGE&nbsp;UPGRADES"
        document.getElementById("crystallized_spice").innerHTML =
            "CRYSTALLIZED&nbsp;" + spice_text[2]
        document.getElementById("crystal_upgrades").innerHTML =
            "CRYSTAL&nbsp;UPGRADES"
        document.getElementById("ascension_upgrades").innerHTML =
            "ASCENSION&nbsp;UPGRADES"
        document.getElementById("past_prestiges").innerHTML =
            "PAST&nbsp;PRESTIGES"
    }

    if (game.collapse_challenge === 11 && game.expand === 0) {
        document.getElementById("ascension").style.display = "none"
    } else {
        document.getElementById("ascension").style.display = "block"
    }
}

//graphics updates for statistics page
function stats_update() {
    let spice_unit = " g"
    let rainbow_unit = " μg"
    let arcane_unit = " mg"
    let dark_unit = " kg"
    if (game.notation === 14) {
        spice_unit = ""
        rainbow_unit = ""
        arcane_unit = ""
        dark_unit = ""
    }

    let stats_str =
        "You have " +
        format_idec(game.red_spice, game.notation) +
        spice_unit +
        " red " +
        spice_text[0] +
        "."

    if (game.color_boosts === 1)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            spice_unit +
            " red " +
            spice_text[0] +
            ",<br>and " +
            format_idec(game.yellow_spice, game.notation) +
            spice_unit +
            " yellow " +
            spice_text[0] +
            "."
    else if (game.color_boosts === 2)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            spice_unit +
            " red " +
            spice_text[0] +
            ",<br>" +
            format_idec(game.yellow_spice, game.notation) +
            spice_unit +
            " yellow " +
            spice_text[0] +
            ",<br>and " +
            format_idec(game.green_spice, game.notation) +
            spice_unit +
            " green " +
            spice_text[0] +
            "."
    else if (game.color_boosts === 3)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            spice_unit +
            " red " +
            spice_text[0] +
            ",<br>" +
            format_idec(game.yellow_spice, game.notation) +
            spice_unit +
            " yellow " +
            spice_text[0] +
            ",<br>" +
            format_idec(game.green_spice, game.notation) +
            spice_unit +
            " green " +
            spice_text[0] +
            ",<br>and " +
            format_idec(game.blue_spice, game.notation) +
            spice_unit +
            " blue " +
            spice_text[0] +
            "."
    else if (game.color_boosts >= 4)
        stats_str =
            "You have " +
            format_idec(game.red_spice, game.notation) +
            spice_unit +
            " red " +
            spice_text[0] +
            ",<br>" +
            format_idec(game.yellow_spice, game.notation) +
            spice_unit +
            " yellow " +
            spice_text[0] +
            ",<br>" +
            format_idec(game.green_spice, game.notation) +
            spice_unit +
            " green " +
            spice_text[0] +
            ",<br>" +
            format_idec(game.blue_spice, game.notation) +
            spice_unit +
            " blue " +
            spice_text[0] +
            ",<br>and " +
            format_idec(game.pink_spice, game.notation) +
            spice_unit +
            " pink " +
            spice_text[0] +
            "."

    stats_str +=
        "<br><br>You have accumulated a total of " +
        format_idec(game.total_spice, game.notation) +
        spice_unit +
        " " +
        spice_text[0] +
        "."

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

    if (
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
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
            " rainbow " +
            spice_text[0] +
            "."

        if (game.prestige_bought[12] >= 1)
            stats_str +=
                "<br>You have " +
                format_idec(game.crystal_spice, game.notation) +
                spice_unit +
                " crystallized " +
                spice_text[0] +
                "."

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

    if (game.ascend >= 1 || game.collapse >= 1 || game.expand >= 1) {
        if (game.ascend === 1)
            stats_str +=
                "<br><br><br>You have Ascended " + format_small(1) + " time."
        else
            stats_str +=
                "<br><br><br>You have Ascended " +
                format_small(game.ascend) +
                " times."

        if (game.collapse_challenge !== 11 || game.expand >= 1) {
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
                    " arcane " +
                    spice_text[0] +
                    "."

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

    if (game.collapse >= 1 || game.expand >= 1) {
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
            " atomic " +
            spice_text[0] +
            "."
        stats_str +=
            "<br>You have created a total of " +
            format_inum(game.total_unstable_spice, game.notation) +
            " unstable " +
            spice_text[0] +
            "."

        stats_str +=
            "<br>You have accumulated a total of " +
            format_idec(game.collapse_spice, game.notation) +
            spice_unit +
            " " +
            spice_text[0] +
            " in this Collapse."

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

    if (game.expand >= 1) {
        if (game.expand === 1)
            stats_str +=
                "<br><br><br>You have Expanded " + format_small(1) + " time."
        else
            stats_str +=
                "<br><br><br>You have Expanded " +
                format_small(game.expand) +
                " times."

        if (game.realms_visited.length === 1)
            stats_str += "<br>You have visited " + format_small(1) + " realm."
        else
            stats_str +=
                "<br>You have visited " +
                format_small(game.realms_visited.length) +
                " realms."

        if (game.galactic_shards.cmp(1) === 0)
            stats_str +=
                "<br>You have " +
                format_inum(game.galactic_shards, game.notation) +
                " galactic shard."
        else
            stats_str +=
                "<br>You have " +
                format_inum(game.galactic_shards, game.notation) +
                " galactic shards."

        stats_str +=
            "<br>You have " +
            format_idec(game.dark_spice, game.notation) +
            dark_unit +
            " dark " +
            spice_text[0] +
            "."

        stats_str +=
            "<br>You have accumulated a total of " +
            format_idec(game.expand_spice, game.notation) +
            spice_unit +
            " " +
            spice_text[0] +
            " in this realm."

        if (game.gamespeed !== 1) {
            if (game.collapse_challenge === 9)
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(
                        game.expand_time_played,
                        game.notation,
                        game.gamespeed,
                        true
                    ) +
                    " in this realm (game time)."
            else
                stats_str +=
                    "<br><br>You have spent " +
                    format_time_long(
                        game.expand_time_played,
                        game.notation,
                        game.gamespeed
                    ) +
                    " in this realm (game time)."

            stats_str +=
                "<br>You have spent " +
                format_time_long(game.real_time_played[4], game.notation) +
                " in this realm (real time)."
        } else
            stats_str +=
                "<br><br>You have spent " +
                format_time_long(game.expand_time_played, game.notation) +
                " in this realm."
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
        else if (game.gamespeed === 1 && game.expand >= 1)
            stats_str +=
                "<br><br><br>You have played for a total of " +
                format_time_long(
                    game.total_time_played,
                    game.notation,
                    game.gamespeed
                ) +
                " (game time).<br>The game is currently running at normal speed.<br><br>You have played for a total of " +
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

    if (game.research_complete[25] >= 1 || game.expand >= 1) {
        document.getElementById("statistics_time").style.display = "block"
    } else {
        document.getElementById("statistics_time").style.display = "none"
    }

    if (
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        document.getElementById("statistics_tabs").style.display = "flex"
    else document.getElementById("statistics_tabs").style.display = "none"

    stats_str = "Last 10 Prestiges:"
    let entries = 0
    let average = new Decimal(0)
    let average2 = 0
    let average3 = 0
    let average4 = 0

    for (let i = 0; i < 10; i++) {
        if (game.prestige_time_history[i] === -1) {
            stats_str += "<br>#" + (i + 1) + " (no data)"
        } else {
            entries++
            let time = game.prestige_time_history[i]
            if (
                game.statistics_time === 1 &&
                game.prestige_real_time_history[i] !== -1
            )
                time = game.prestige_real_time_history[i]
            average = average.add(game.prestige_amount_history[i].div(time))
            average2 += game.prestige_stat_history[i] / time
            average3 += game.prestige_time_history[i]
            average4 += game.prestige_real_time_history[i]

            stats_str +=
                "<br>#" +
                (i + 1) +
                " took " +
                format_time(time, game.notation, true)
            if (game.statistics_time === 1) stats_str += " real time"
            if (game.statistics_unit[0] === 0) {
                stats_str +=
                    " and gave " +
                    format_idec(
                        game.prestige_amount_history[i],
                        game.notation
                    ) +
                    rainbow_unit +
                    " rainbow " +
                    spice_text[0] +
                    "."
                if (
                    game.prestige_amount_history[i].div(time).mul(60).cmp(1) >=
                    0
                )
                    stats_str +=
                        " +" +
                        format_idec(
                            game.prestige_amount_history[i].div(time).mul(60),
                            game.notation
                        ) +
                        rainbow_unit +
                        " rainbow " +
                        spice_text[0] +
                        "/min"
                else
                    stats_str +=
                        " +" +
                        format_idec(
                            game.prestige_amount_history[i].div(time).mul(3600),
                            game.notation
                        ) +
                        rainbow_unit +
                        " rainbow " +
                        spice_text[0] +
                        "/hour"
            } else {
                if (game.prestige_stat_history[i] === 1)
                    stats_str +=
                        " and gave " +
                        format_small(game.prestige_stat_history[i]) +
                        " Prestige."
                else
                    stats_str +=
                        " and gave " +
                        format_small(game.prestige_stat_history[i]) +
                        " Prestiges."
                if ((game.prestige_stat_history[i] / time) * 60 >= 1) {
                    if ((game.prestige_stat_history[i] / time) * 60 >= 1000000)
                        stats_str +=
                            " +" +
                            format_small(
                                Math.round(
                                    (game.prestige_stat_history[i] / time) * 60
                                )
                            ) +
                            " Prestiges/min"
                    else
                        stats_str +=
                            " +" +
                            format_dec(
                                (game.prestige_stat_history[i] / time) * 60,
                                game.notation
                            ) +
                            " Prestiges/min"
                } else
                    stats_str +=
                        " +" +
                        format_dec(
                            (game.prestige_stat_history[i] / time) * 3600,
                            game.notation
                        ) +
                        " Prestiges/hour"
            }
        }
    }

    if (entries > 0) {
        average = average.div(entries)
        average2 /= entries
        average3 /= entries
        average4 /= entries

        if (game.statistics_unit[0] === 0) {
            if (average.mul(60).cmp(1) >= 0)
                stats_str +=
                    "<br><br>Average rainbow " +
                    spice_text[0] +
                    " gain: +" +
                    format_idec(average.mul(60), game.notation) +
                    rainbow_unit +
                    " rainbow " +
                    spice_text[0] +
                    "/min"
            else
                stats_str +=
                    "<br><br>Average rainbow " +
                    spice_text[0] +
                    " gain: +" +
                    format_idec(average.mul(3600), game.notation) +
                    rainbow_unit +
                    " rainbow " +
                    spice_text[0] +
                    "/hour"
        } else {
            if (average2 * 60 >= 1) {
                if (average2 * 60 >= 1000000)
                    stats_str +=
                        "<br><br>Average Prestige rate: +" +
                        format_small(Math.round(average2 * 60)) +
                        " Prestiges/min"
                else
                    stats_str +=
                        "<br><br>Average Prestige rate: +" +
                        format_dec(average2 * 60, game.notation) +
                        " Prestiges/min"
            } else
                stats_str +=
                    "<br><br>Average Prestige rate: +" +
                    format_dec(average2 * 3600, game.notation) +
                    " Prestiges/hour"
            if (game.best_prestige_rate >= 1) {
                if (game.best_prestige_rate >= 1000000)
                    stats_str +=
                        "<br>Best Prestige rate: +" +
                        format_small(Math.round(game.best_prestige_rate)) +
                        " Prestiges/min"
                else
                    stats_str +=
                        "<br>Best Prestige rate: +" +
                        format_dec(game.best_prestige_rate, game.notation) +
                        " Prestiges/min"
            } else
                stats_str +=
                    "<br>Best Prestige rate: +" +
                    format_dec(game.best_prestige_rate * 60, game.notation) +
                    " Prestiges/hour"
        }

        if (game.statistics_time === 0)
            stats_str +=
                "<br>Average time: " +
                format_time_long(average3, game.notation, game.gamespeed, true)
        else
            stats_str +=
                "<br>Average time: " +
                format_time_long(average4, game.notation, 1, true) +
                " real time"
    } else {
        if (game.statistics_unit[0] === 0)
            stats_str +=
                "<br><br>Average rainbow " + spice_text[0] + " gain: undefined"
        else {
            stats_str += "<br><br>Average Prestige gain: undefined"
            if (game.best_prestige_rate >= 1) {
                if (game.best_prestige_rate >= 1000000)
                    stats_str +=
                        "<br>Best Prestige rate: +" +
                        format_small(Math.round(game.best_prestige_rate)) +
                        " Prestiges/min"
                else
                    stats_str +=
                        "<br>Best Prestige rate: +" +
                        format_dec(game.best_prestige_rate, game.notation) +
                        " Prestiges/min"
            } else
                stats_str +=
                    "<br>Best Prestige rate: +" +
                    format_dec(game.best_prestige_rate * 60, game.notation) +
                    " Prestiges/hour"
        }

        stats_str += "<br>Average time: undefined"
    }

    document.getElementById("prestige_statistics_text").innerHTML = stats_str

    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    if (game.ascend >= 1 || game.collapse >= 1 || game.expand >= 1) {
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
        document.getElementById("past_ascensions").removeAttribute("aria-disabled")
    } else {
        document.getElementById("past_ascensions").innerHTML = "LOCKED"
        document.getElementById("past_ascensions").className = "subtab locked"
        document.getElementById("past_ascensions").setAttribute("aria-disabled", "true")
    }

    stats_str = "Last 10 Ascensions:"
    entries = 0
    average = new Decimal(0)
    average2 = 0
    average3 = 0
    average4 = 0

    for (let i = 0; i < 10; i++) {
        if (game.ascend_time_history[i] === -1) {
            stats_str += "<br>#" + (i + 1) + " (no data)"
        } else {
            entries++
            let time = game.ascend_time_history[i]
            if (
                game.statistics_time === 1 &&
                game.ascend_real_time_history[i] !== -1
            )
                time = game.ascend_real_time_history[i]
            average = average.add(game.ascend_amount_history[i].div(time))
            average2 += game.ascend_stat_history[i] / time
            average3 += game.ascend_time_history[i]
            average4 += game.ascend_real_time_history[i]

            stats_str += "<br>#" + (i + 1)
            if (game.ascend_challenge_history[i] !== -1)
                stats_str +=
                    " was in Challenge " +
                    game.ascend_challenge_history[i] +
                    ","
            stats_str += " took " + format_time(time, game.notation, true)
            if (game.statistics_time === 1) stats_str += " real time"
            if (game.statistics_unit[1] === 0) {
                stats_str +=
                    " and gave " +
                    format_inum(game.ascend_amount_history[i], game.notation) +
                    " ᚫ."
                if (game.ascend_amount_history[i].mul(60).div(time).cmp(1) >= 0)
                    stats_str +=
                        " +" +
                        format_idec(
                            game.ascend_amount_history[i].mul(60).div(time),
                            game.notation
                        ) +
                        " ᚫ/min"
                else
                    stats_str +=
                        " +" +
                        format_idec(
                            game.ascend_amount_history[i].mul(3600).div(time),
                            game.notation
                        ) +
                        " ᚫ/hour"
            } else {
                if (game.ascend_stat_history[i] === 1)
                    stats_str +=
                        " and gave " +
                        format_small(game.ascend_stat_history[i]) +
                        " Ascension."
                else
                    stats_str +=
                        " and gave " +
                        format_small(game.ascend_stat_history[i]) +
                        " Ascensions."
                if ((game.ascend_stat_history[i] * 60) / time >= 1) {
                    if ((game.ascend_stat_history[i] * 60) / time >= 1000000)
                        stats_str +=
                            " +" +
                            format_small(
                                Math.round(
                                    (game.ascend_stat_history[i] * 60) / time
                                )
                            ) +
                            " Ascensions/min"
                    else
                        stats_str +=
                            " +" +
                            format_dec(
                                (game.ascend_stat_history[i] * 60) / time,
                                game.notation
                            ) +
                            " Ascensions/min"
                } else
                    stats_str +=
                        " +" +
                        format_dec(
                            (game.ascend_stat_history[i] * 3600) / time,
                            game.notation
                        ) +
                        " Ascensions/hour"
            }
        }
    }

    if (entries > 0) {
        average = average.div(entries)
        average2 /= entries
        average3 /= entries
        average4 /= entries

        if (game.statistics_unit[1] === 0) {
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
            if (average2 * 60 >= 1) {
                if (average2 * 60 >= 1000000)
                    stats_str +=
                        "<br><br>Average Ascension rate: +" +
                        format_small(Math.round(average2 * 60)) +
                        " Ascensions/min"
                else
                    stats_str +=
                        "<br><br>Average Ascension rate: +" +
                        format_dec(average2 * 60, game.notation) +
                        " Ascensions/min"
            } else
                stats_str +=
                    "<br><br>Average Ascension rate: +" +
                    format_dec(average2 * 3600, game.notation) +
                    " Ascensions/hour"
            if (game.best_ascend_rate >= 1) {
                if (game.best_ascend_rate >= 1000000)
                    stats_str +=
                        "<br>Best Ascension rate: +" +
                        format_small(Math.round(game.best_ascend_rate)) +
                        " Ascensions/min"
                else
                    stats_str +=
                        "<br>Best Ascension rate: +" +
                        format_dec(game.best_ascend_rate, game.notation) +
                        " Ascensions/min"
            } else
                stats_str +=
                    "<br>Best Ascension rate: +" +
                    format_dec(game.best_ascend_rate * 60, game.notation) +
                    " Ascensions/hour"
        }

        if (game.statistics_time === 0)
            stats_str +=
                "<br>Average time: " +
                format_time_long(average3, game.notation, game.gamespeed, true)
        else
            stats_str +=
                "<br>Average time: " +
                format_time_long(average4, game.notation, 1, true) +
                " real time"
    } else {
        if (game.statistics_unit[1] === 0)
            stats_str += "<br><br>Average Ansuz rune gain: undefined"
        else {
            stats_str += "<br><br>Average Ascension gain: undefined"
            if (game.best_ascend_rate >= 1) {
                if (game.best_ascend_rate >= 1000000)
                    stats_str +=
                        "<br>Best Ascension rate: +" +
                        format_small(Math.round(game.best_ascend_rate)) +
                        " Ascensions/min"
                else
                    stats_str +=
                        "<br>Best Ascension rate: +" +
                        format_dec(game.best_ascend_rate, game.notation) +
                        " Ascensions/min"
            } else
                stats_str +=
                    "<br>Best Ascension rate: +" +
                    format_dec(game.best_ascend_rate * 60, game.notation) +
                    " Ascensions/hour"
        }

        stats_str += "<br>Average time: undefined"
    }

    document.getElementById("ascension_statistics_text").innerHTML = stats_str

    if (game.collapse >= 1 || game.expand >= 1) {
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
        document.getElementById("past_collapses").removeAttribute("aria-disabled")
    } else {
        document.getElementById("past_collapses").innerHTML = "LOCKED"
        document.getElementById("past_collapses").className = "subtab locked"
        document.getElementById("past_collapses").setAttribute("aria-disabled", "true")
    }

    stats_str = "Last 10 Collapses:"
    entries = 0
    average = new Decimal(0)
    average2 = 0
    average3 = 0
    average4 = 0

    for (let i = 0; i < 10; i++) {
        if (game.collapse_time_history[i] === -1) {
            stats_str += "<br>#" + (i + 1) + " (no data)"
        } else {
            entries++
            let time = game.collapse_time_history[i]
            if (
                game.statistics_time === 1 &&
                game.collapse_real_time_history[i] !== -1
            )
                time = game.collapse_real_time_history[i]
            average = average.add(game.collapse_amount_history[i].div(time))
            average2 += game.collapse_stat_history[i] / time
            average3 += game.collapse_time_history[i]
            average4 += game.collapse_real_time_history[i]
            stats_str += "<br>#" + (i + 1)
            if (game.collapse_challenge_history[i] !== -1)
                stats_str +=
                    " was in Challenge " +
                    game.collapse_challenge_history[i] +
                    ","
            stats_str += " took " + format_time(time, game.notation, true)
            if (game.statistics_time === 1) stats_str += " real time"
            if (game.statistics_unit[2] === 0) {
                stats_str +=
                    " and gave " +
                    format_inum(
                        game.collapse_amount_history[i],
                        game.notation
                    ) +
                    " atomic " +
                    spice_text[0] +
                    "."
                if (game.collapse_amount_history[i].mul(60 / time).cmp(1) >= 0)
                    stats_str +=
                        " +" +
                        format_idec(
                            game.collapse_amount_history[i].mul(60 / time),
                            game.notation
                        ) +
                        " atomic " +
                        spice_text[0] +
                        "/min"
                else
                    stats_str +=
                        " +" +
                        format_idec(
                            game.collapse_amount_history[i].mul(3600 / time),
                            game.notation
                        ) +
                        " atomic " +
                        spice_text[0] +
                        "/hour"
            } else {
                if (game.collapse_stat_history[i] === 1)
                    stats_str +=
                        " and gave " +
                        format_small(game.collapse_stat_history[i]) +
                        " Collapse."
                else
                    stats_str +=
                        " and gave " +
                        format_small(game.collapse_stat_history[i]) +
                        " Collapses."
                if ((game.collapse_stat_history[i] * 60) / time >= 1) {
                    if ((game.collapse_stat_history[i] * 60) / time >= 1000000)
                        stats_str +=
                            " +" +
                            format_small(
                                Math.round(
                                    (game.collapse_stat_history[i] * 60) / time
                                )
                            ) +
                            " Collapses/min"
                    else
                        stats_str +=
                            " +" +
                            format_dec(
                                (game.collapse_stat_history[i] * 60) / time,
                                game.notation
                            ) +
                            " Collapses/min"
                } else
                    stats_str +=
                        " +" +
                        format_dec(
                            (game.collapse_stat_history[i] * 3600) / time,
                            game.notation
                        ) +
                        " Collapses/hour"
            }
        }
    }

    if (entries > 0) {
        average = average.div(entries)
        average2 /= entries
        average3 /= entries
        average4 /= entries

        if (game.statistics_unit[2] === 0) {
            if (average.mul(60).cmp(1) >= 0)
                stats_str +=
                    "<br><br>Average atomic " +
                    spice_text[0] +
                    " gain: +" +
                    format_idec(average.mul(60), game.notation) +
                    " atomic " +
                    spice_text[0] +
                    "/min"
            else
                stats_str +=
                    "<br><br>Average atomic " +
                    spice_text[0] +
                    " gain: +" +
                    format_idec(average.mul(3600), game.notation) +
                    " atomic " +
                    spice_text[0] +
                    "/hour"
        } else {
            if (average2 * 60 >= 1) {
                if (average2 * 60 >= 1000000)
                    stats_str +=
                        "<br><br>Average Collapse rate: +" +
                        format_small(Math.round(average2 * 60)) +
                        " Collapses/min"
                else
                    stats_str +=
                        "<br><br>Average Collapse rate: +" +
                        format_dec(average2 * 60, game.notation) +
                        " Collapses/min"
            } else
                stats_str +=
                    "<br><br>Average Collapse rate: +" +
                    format_dec(average2 * 3600, game.notation) +
                    " Collapses/hour"
            if (game.best_collapse_rate >= 1) {
                if (game.best_collapse_rate >= 1000000)
                    stats_str +=
                        "<br>Best Collapse rate: +" +
                        format_small(Math.round(game.best_collapse_rate)) +
                        " Collapses/min"
                else
                    stats_str +=
                        "<br>Best Collapse rate: +" +
                        format_dec(game.best_collapse_rate, game.notation) +
                        " Collapses/min"
            } else
                stats_str +=
                    "<br>Best Collapse rate: +" +
                    format_dec(game.best_collapse_rate * 60, game.notation) +
                    " Collapses/hour"
        }

        if (game.statistics_time === 0)
            stats_str +=
                "<br>Average time: " +
                format_time_long(average3, game.notation, game.gamespeed, true)
        else
            stats_str +=
                "<br>Average time: " +
                format_time_long(average4, game.notation, 1, true) +
                " real time"
    } else {
        if (game.statistics_unit[2] === 0)
            stats_str +=
                "<br><br>Average atomic " + spice_text[0] + " gain: undefined"
        else {
            stats_str += "<br><br>Average Collapse rate: undefined"
            if (game.best_collapse_rate >= 1) {
                if (game.best_collapse_rate >= 1000000)
                    stats_str +=
                        "<br>Best Collapse rate: +" +
                        format_small(Math.round(game.best_collapse_rate)) +
                        " Collapses/min"
                else
                    stats_str +=
                        "<br>Best Collapse rate: +" +
                        format_dec(game.best_collapse_rate, game.notation) +
                        " Collapses/min"
            } else
                stats_str +=
                    "<br>Best Collapse rate: +" +
                    format_dec(game.best_collapse_rate * 60, game.notation) +
                    " Collapses/hour"
        }

        stats_str += "<br>Average time: undefined"
    }

    document.getElementById("collapse_statistics_text").innerHTML = stats_str

    if (game.expand >= 1) {
        document.getElementById("past_expansions").innerHTML =
            "PAST&nbsp;EXPANSIONS"
        if (mobile)
            document.getElementById("past_expansions").innerHTML = "EXPANSIONS"
        if (game.subtab[2] === 4)
            document.getElementById("past_expansions").className =
                "subtab selected"
        else
            document.getElementById("past_expansions").className =
                "subtab unlocked"
        document.getElementById("past_expansions").removeAttribute("aria-disabled")
    } else {
        document.getElementById("past_expansions").innerHTML = "LOCKED"
        document.getElementById("past_expansions").className = "subtab locked"
        document.getElementById("past_expansions").setAttribute("aria-disabled", "true")
    }

    stats_str = "Last 10 Expansions:"
    entries = 0
    average = new Decimal(0)
    average2 = 0
    average3 = 0
    average4 = 0

    for (let i = 0; i < 10; i++) {
        if (game.expand_time_history[i] === -1) {
            stats_str += "<br>#" + (i + 1) + " (no data)"
        } else {
            entries++
            let time = game.expand_time_history[i]
            if (
                game.statistics_time === 1 &&
                game.expand_real_time_history[i] !== -1
            )
                time = game.expand_real_time_history[i]
            average = average.add(game.expand_amount_history[i].div(time))
            average2 += game.expand_stat_history[i] / time
            average3 += game.expand_time_history[i]
            average4 += game.expand_real_time_history[i]
            stats_str += "<br>#" + (i + 1)
            stats_str += " took " + format_time(time, game.notation, true)
            if (game.statistics_time === 1) stats_str += " real time"
            if (game.statistics_unit[3] === 0) {
                if (game.expand_amount_history[i].cmp(1) === 0)
                    stats_str +=
                        " and gave " +
                        format_inum(
                            game.expand_amount_history[i],
                            game.notation
                        ) +
                        " galactic shard."
                else
                    stats_str +=
                        " and gave " +
                        format_inum(
                            game.expand_amount_history[i],
                            game.notation
                        ) +
                        " galactic shards."
                if (game.expand_amount_history[i].mul(60 / time).cmp(1) >= 0)
                    stats_str +=
                        " +" +
                        format_idec(
                            game.expand_amount_history[i].mul(60 / time),
                            game.notation
                        ) +
                        " galactic shards/min"
                else
                    stats_str +=
                        " +" +
                        format_idec(
                            game.expand_amount_history[i].mul(3600 / time),
                            game.notation
                        ) +
                        " galactic shards/hour"
            } else {
                if (game.expand_stat_history[i] === 1)
                    stats_str +=
                        " and gave " +
                        format_small(game.expand_stat_history[i]) +
                        " Expansion."
                else
                    stats_str +=
                        " and gave " +
                        format_small(game.expand_stat_history[i]) +
                        " Expansions."
                if ((game.expand_stat_history[i] * 60) / time >= 1) {
                    if ((game.expand_stat_history[i] * 60) / time >= 1000000)
                        stats_str +=
                            " +" +
                            format_small(
                                Math.round(
                                    (game.expand_stat_history[i] * 60) / time
                                )
                            ) +
                            " Expansions/min"
                    else
                        stats_str +=
                            " +" +
                            format_dec(
                                (game.expand_stat_history[i] * 60) / time,
                                game.notation
                            ) +
                            " Expansions/min"
                } else
                    stats_str +=
                        " +" +
                        format_dec(
                            (game.expand_stat_history[i] * 3600) / time,
                            game.notation
                        ) +
                        " Expansions/hour"
            }
        }
    }

    if (entries > 0) {
        average = average.div(entries)
        average2 /= entries
        average3 /= entries
        average4 /= entries

        if (game.statistics_unit[3] === 0) {
            if (average.mul(60).cmp(1) >= 0)
                stats_str +=
                    "<br><br>Average galactic shard gain: +" +
                    format_idec(average.mul(60), game.notation) +
                    " galactic shards/min"
            else
                stats_str +=
                    "<br><br>Average galactic shard gain: +" +
                    format_idec(average.mul(3600), game.notation) +
                    " galactic shards/hour"
        } else {
            if (average2 * 60 >= 1) {
                if (average2 * 60 >= 1000000)
                    stats_str +=
                        "<br><br>Average Expansion rate: +" +
                        format_small(Math.round(average2 * 60)) +
                        " Expansions/min"
                else
                    stats_str +=
                        "<br><br>Average Expansion rate: +" +
                        format_dec(average2 * 60, game.notation) +
                        " Expansions/min"
            } else
                stats_str +=
                    "<br><br>Average Expansion rate: +" +
                    format_dec(average2 * 3600, game.notation) +
                    " Expansions/hour"
            if (game.best_expand_rate >= 1) {
                if (game.best_expand_rate >= 1000000)
                    stats_str +=
                        "<br>Best Expansion rate: +" +
                        format_small(Math.round(game.best_expand_rate)) +
                        " Expansions/min"
                else
                    stats_str +=
                        "<br>Best Expansions rate: +" +
                        format_dec(game.best_expand_rate, game.notation) +
                        " Expansions/min"
            } else
                stats_str +=
                    "<br>Best Expansions rate: +" +
                    format_dec(game.best_expand_rate * 60, game.notation) +
                    " Expansions/hour"
        }

        if (game.statistics_time === 0)
            stats_str +=
                "<br>Average time: " +
                format_time_long(average3, game.notation, game.gamespeed, true)
        else
            stats_str +=
                "<br>Average time: " +
                format_time_long(average4, game.notation, 1, true) +
                " real time"
    } else {
        if (game.statistics_unit[3] === 0)
            stats_str +=
                "<br><br>Average galactic shard gain: undefined<br>Average time: undefined"
        else
            stats_str +=
                "<br><br>Average Expansion gain: undefined<br>Average time: undefined"
    }

    document.getElementById("expansion_statistics_text").innerHTML = stats_str
}

//graphics updates for compendium page
function compendium_update() {
    for (const e of compendium.entries) {
        if (e.unlock !== undefined) {
            if (entry_unlocked[e.unlock]) {
                compendium_map.get(e).style.display = "block"
            } else {
                compendium_map.get(e).style.display = "none"
            }
        }
    }
}

//graphics updates for settings page
function settings_update() {
    if (game.expand >= 1 && !game.new_generation) {
        document.getElementById("switch_block").style.display = "flex"
    } else {
        document.getElementById("switch_block").style.display = "none"
    }

    let str = "Hotkeys:<br>Up: Next tab<br>Down: Previous tab"

    if (game.color_boosts > 0 || game.prestige_bought[12])
        str += "<br>Right: Next subtab<br>Left: Previous subtab"

    str +=
        "<br>1-6: Buy until X of generator<br>Shift+1-6: Buy 1 of generator<br>S: Buy strengthener"

    if (
        game.color_boosts >= 1 ||
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    ) {
        str += "<br>M: Max all"
        str += "<br>B: Color shift/boost"
    }

    if (
        game.prestige >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        str += "<br>P: Prestige"

    if (
        game.prestige_bought[12] >= 1 ||
        game.ascend >= 1 ||
        game.collapse >= 1 ||
        game.expand >= 1
    )
        str += "<br>I: Buy crystal infusion"

    if (game.ascend >= 1 || game.collapse >= 1 || game.expand >= 1)
        str += "<br>A: Ascend"

    if (game.distribute_unlocked) str += "<br>D: Distribute ALL runes"

    if (game.half_distribute_unlocked)
        str += "<br>Shift+D: Distribute HALF runes"

    if (game.ascend_bought[16] || game.collapse >= 1 || game.expand >= 1)
        str += "<br>X: Exit challenge"

    if (game.ascend_complete[0] || game.collapse >= 1 || game.expand >= 1)
        str += "<br>N: Buy arcane enchantment"

    if (game.collapse >= 1 || game.expand >= 1) {
        str += "<br>C: Collapse"
        str += "<br>Y: Activate Collider"
    }

    if (game.collapse >= 5 || game.expand >= 1) str += "<br>R: Toggle research"

    if (game.expand >= 1) {
        str += "<br>E: Expand"
        str += "<br>K: Buy dark construct"
        str += "<br>V: Buy dark conversion"
    }

    document.getElementById("hotkeys_list").innerHTML = str
}
