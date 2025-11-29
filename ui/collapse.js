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

    if (game.galactic_bought[13]) {
        if (game.expand >= 300)
            collapse_amount = collapse_amount.mul(
                Decimal.pow(10, 1500 * phi ** 2 * (game.expand / 300) ** 0.5)
            )
        else
            collapse_amount = collapse_amount.mul(
                Decimal.pow(10, 5 * phi ** 2 * game.expand)
            )
    }

    if (game.collapse_challenge === 0)
        collapse_amount = collapse_amount.pow(1 + game.realm_effects[2] / 100)

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
            " atomic " +
            spice_text[0]
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
                    collapse_amount.div(game.real_time_played[3]).mul(60),
                    game.notation
                ) +
                " atomic " +
                spice_text[0] +
                "/min"

            if (game.research_complete[17] >= 1) {
                switch (game.autoco_mode) {
                    case 0:
                        efficiency_str +=
                            "<br>Peak: +" +
                            format_idec(
                                game.peak_atomic_gain.mul(60),
                                game.notation
                            ) +
                            " atomic " +
                            spice_text[0] +
                            "/min at +" +
                            format_idec(
                                game.peak_atomic_amount,
                                game.notation
                            ) +
                            " atomic " +
                            spice_text[0]
                        break
                    case 1:
                        if (game.peak_atomic_time < 1)
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_atomic_gain.mul(60),
                                    game.notation
                                ) +
                                " atomic " +
                                spice_text[0] +
                                "/min at " +
                                game.peak_atomic_time.toFixed(2) +
                                "s"
                        else
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_atomic_gain.mul(60),
                                    game.notation
                                ) +
                                " atomic " +
                                spice_text[0] +
                                "/min at " +
                                format_dec(
                                    game.peak_atomic_time,
                                    game.notation
                                ) +
                                "s"
                        break
                    case 2:
                        if (game.unstable_spice.cmp(0.5) >= 0) {
                            efficiency_str +=
                                "<br>Waiting for unstable " +
                                spice_text[0] +
                                " to completely decay"
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
                                        " atomic " +
                                        spice_text[0] +
                                        "/min at " +
                                        decay_peak_time.toFixed(2) +
                                        "s after max decayed " +
                                        spice_text[0]
                                else
                                    efficiency_str +=
                                        "<br>Peak: +" +
                                        format_idec(
                                            game.peak_atomic_gain.mul(60),
                                            game.notation
                                        ) +
                                        " atomic " +
                                        spice_text[0] +
                                        "/min at " +
                                        format_dec(
                                            decay_peak_time,
                                            game.notation
                                        ) +
                                        "s after max decayed " +
                                        spice_text[0]
                            }
                        }
                        break
                }
            } else {
                efficiency_str +=
                    "<br>Peak: +" +
                    format_idec(game.peak_atomic_gain.mul(60), game.notation) +
                    " atomic " +
                    spice_text[0] +
                    "/min"
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
                " atomic " +
                spice_text[0] +
                " required"
            document.getElementById("collapse_up").style.display = "block"
            document.getElementById("collapse_up").innerHTML =
                "+" +
                format_inum(collapse_amount.floor(), game.notation) +
                " atomic " +
                spice_text[0]
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
                " atomic " +
                spice_text[0] +
                "/min"

            efficiency_str +=
                "<br>Peak: +" +
                format_dec(0, game.notation) +
                " atomic " +
                spice_text[0] +
                "/min"

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
        "Atomic " +
        spice_text[0] +
        " efficiency: " +
        format_num(Math.round(game.atomic_efficiency * 100), 0) +
        "%<br>Expected yield: <span class='unstable_spice'>+" +
        format_inum(
            game.atomic_spice.pow(game.atomic_efficiency).floor(),
            game.notation
        ) +
        " unstable " +
        spice_text[0] +
        "</span>"

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
        if (game.research_complete[19] >= 1 || game.expand >= 1) {
            document.getElementById("collider_portion").style.display = "flex"
            document.getElementById("collider_resource").innerHTML =
                "Activating the " +
                spice_text[1] +
                " Collider will consume some atomic " +
                spice_text[0] +
                " and create unstable " +
                spice_text[0]

            document.getElementById("collider_info").innerHTML =
                "Atomic " +
                spice_text[0] +
                " input: <span class='atomic_spice'>" +
                format_inum(
                    game.atomic_spice.mul(game.atomic_portion),
                    game.notation
                ) +
                " atomic " +
                spice_text[0] +
                "</span><br>Atomic " +
                spice_text[0] +
                " efficiency: " +
                (game.dark_efficiency > 0
                    ? format_dec(
                          (game.atomic_efficiency + game.dark_efficiency) * 100,
                          0
                      )
                    : format_num(Math.round(game.atomic_efficiency * 100), 0)) +
                "%<br>Expected yield: <span class='unstable_spice'>+" +
                format_inum(
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency + game.dark_efficiency)
                        .floor(),
                    game.notation
                ) +
                " unstable " +
                spice_text[0] +
                "</span>"

            if (
                game.atomic_spice
                    .mul(game.atomic_portion)
                    .pow(game.atomic_efficiency + game.dark_efficiency)
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
                "Activating the " +
                spice_text[1] +
                " Collider will consume all atomic " +
                spice_text[0] +
                " and create unstable " +
                spice_text[0]
        }
    } else if (game.collider_tab === 1) {
        document.getElementById("collider_portion").style.display = "flex"
        document.getElementById("collider_resource").innerHTML =
            "Activating the " +
            spice_text[1] +
            " Collider will consume some atomic " +
            spice_text[0] +
            " and create basic anti" +
            spice_text[0] +
            "<br>Basic anti" +
            spice_text[0] +
            " gains are calculated based on total atomic " +
            spice_text[0] +
            " used"

        let amount = game.atomic_spice
            .mul(game.atomic_portion)
            .add(game.spent_atomic_spice[0])
            .pow((game.atomic_efficiency + game.dark_efficiency) / 76)
        if (amount.cmp(Decimal.pow(10, 170)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 170))
                .pow(0.6)
                .mul(Decimal.pow(10, 170))
        if (amount.cmp(Decimal.pow(10, 515)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 515) ** 0.67 * 515)
        if (amount.cmp(Decimal.pow(10, 1000)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 1000))
                .pow(0.5)
                .mul(Decimal.pow(10, 1000))
        let yield_str =
            "Expected yield: <span class='pure_antispice'>+" +
            format_inum(amount.sub(game.antispice[0]).floor(), game.notation) +
            " basic anti" +
            spice_text[0] +
            "</span>"
        if (amount.sub(game.antispice[0]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='pure_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " basic anti" +
                spice_text[0] +
                "</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic " +
            spice_text[0] +
            " input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic " +
            spice_text[0] +
            "</span><br>Atomic " +
            spice_text[0] +
            " efficiency: " +
            (game.dark_efficiency > 0
                ? format_dec(
                      (game.atomic_efficiency + game.dark_efficiency) * 100,
                      0
                  )
                : format_num(Math.round(game.atomic_efficiency * 100), 0)) +
            "%<br>" +
            yield_str +
            "<br><br>Total atomic " +
            spice_text[0] +
            " used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[0], game.notation) +
            " atomic " +
            spice_text[0] +
            "</span>"

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
            "Activating the " +
            spice_text[1] +
            " Collider will consume some atomic " +
            spice_text[0] +
            " and create red anti" +
            spice_text[0] +
            "<br>Red anti" +
            spice_text[0] +
            " gains are calculated based on total atomic " +
            spice_text[0] +
            " used and total red " +
            spice_text[0]

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
            .pow((game.atomic_efficiency + game.dark_efficiency) / 228)
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
        if (amount.cmp(Decimal.pow(10, 1000)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 1000))
                .pow(2)
                .mul(Decimal.pow(10, 1000))
        let yield_str =
            "Expected yield: <span class='red_antispice'>+" +
            format_inum(amount.sub(game.antispice[1]).floor(), game.notation) +
            " red anti" +
            spice_text[0] +
            "</span>"
        if (amount.sub(game.antispice[1]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='red_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " red anti" +
                spice_text[0] +
                "</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic " +
            spice_text[0] +
            " input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic " +
            spice_text[0] +
            "</span><br>Atomic " +
            spice_text[0] +
            " efficiency: " +
            (game.dark_efficiency > 0
                ? format_dec(
                      (game.atomic_efficiency + game.dark_efficiency) * 100,
                      0
                  )
                : format_num(Math.round(game.atomic_efficiency * 100), 0)) +
            "%<br>Red " +
            spice_text[0] +
            " input: <span class='red_spice'>" +
            format_inum(game.antitotal_spice[1], game.notation) +
            spice_unit +
            " red " +
            spice_text[0] +
            "</span><br>" +
            yield_str +
            "<br><br>Total atomic " +
            spice_text[0] +
            " used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[1], game.notation) +
            " atomic " +
            spice_text[0] +
            "</span>"

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
            "Activating the " +
            spice_text[1] +
            " Collider will consume some atomic " +
            spice_text[0] +
            " and create yellow anti" +
            spice_text[0] +
            "<br>Yellow anti" +
            spice_text[0] +
            " gains are calculated based on total atomic " +
            spice_text[0] +
            " used and total yellow " +
            spice_text[0]

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
            .pow((game.atomic_efficiency + game.dark_efficiency) / 304)
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
            " yellow anti" +
            spice_text[0] +
            "</span>"
        if (amount.sub(game.antispice[2]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='yellow_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " yellow anti" +
                spice_text[0] +
                "</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic " +
            spice_text[0] +
            " input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic " +
            spice_text[0] +
            "</span><br>Atomic " +
            spice_text[0] +
            " efficiency: " +
            (game.dark_efficiency > 0
                ? format_dec(
                      (game.atomic_efficiency + game.dark_efficiency) * 100,
                      0
                  )
                : format_num(Math.round(game.atomic_efficiency * 100), 0)) +
            "%<br>Yellow " +
            spice_text[0] +
            " input: <span class='yellow_spice'>" +
            format_inum(game.antitotal_spice[2], game.notation) +
            spice_unit +
            " yellow " +
            spice_text[0] +
            "</span><br>" +
            yield_str +
            "<br><br>Total atomic " +
            spice_text[0] +
            " used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[2], game.notation) +
            " atomic " +
            spice_text[0] +
            "</span>"

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
            "Activating the " +
            spice_text[1] +
            " Collider will consume some atomic " +
            spice_text[0] +
            " and create green anti" +
            spice_text[0] +
            "<br>Green anti" +
            spice_text[0] +
            " gains are calculated based on total atomic " +
            spice_text[0] +
            " used and total green " +
            spice_text[0]

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
            .pow((game.atomic_efficiency + game.dark_efficiency) / 380)
            .div(108000)

        let amount = atomic_amount.mul(green_amount)
        if (amount.cmp(Decimal.pow(10, 56)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 56))
                .pow(0.55)
                .mul(Decimal.pow(10, 56))
        if (amount.cmp(Decimal.pow(10, 225)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 225) ** 0.5 * 225)
        if (amount.cmp(Decimal.pow(10, 700)) >= 0)
            amount = amount
                .div(Decimal.pow(10, 700))
                .pow(0.5)
                .mul(Decimal.pow(10, 700))
        let yield_str =
            "Expected yield: <span class='green_antispice'>+" +
            format_inum(amount.sub(game.antispice[3]).floor(), game.notation) +
            " green anti" +
            spice_text[0] +
            "</span>"
        if (amount.sub(game.antispice[3]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='green_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " green anti" +
                spice_text[0] +
                "</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic " +
            spice_text[0] +
            " input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic " +
            spice_text[0] +
            "</span><br>Atomic " +
            spice_text[0] +
            " efficiency: " +
            (game.dark_efficiency > 0
                ? format_dec(
                      (game.atomic_efficiency + game.dark_efficiency) * 100,
                      0
                  )
                : format_num(Math.round(game.atomic_efficiency * 100), 0)) +
            "%<br>Green " +
            spice_text[0] +
            " input: <span class='green_spice'>" +
            format_inum(game.antitotal_spice[3], game.notation) +
            spice_unit +
            " green " +
            spice_text[0] +
            "</span><br>" +
            yield_str +
            "<br><br>Total atomic " +
            spice_text[0] +
            " used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[3], game.notation) +
            " atomic " +
            spice_text[0] +
            "</span>"

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
            "Activating the " +
            spice_text[1] +
            " Collider will consume some atomic " +
            spice_text[0] +
            " and create blue anti" +
            spice_text[0] +
            "<br>Blue anti" +
            spice_text[0] +
            " gains are calculated based on total atomic " +
            spice_text[0] +
            " used and total blue " +
            spice_text[0]

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
            .pow((game.atomic_efficiency + game.dark_efficiency) / 494)
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
            " blue anti" +
            spice_text[0] +
            "</span>"
        if (amount.sub(game.antispice[4]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='blue_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " blue anti" +
                spice_text[0] +
                "</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic " +
            spice_text[0] +
            " input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic " +
            spice_text[0] +
            "</span><br>Atomic " +
            spice_text[0] +
            " efficiency: " +
            (game.dark_efficiency > 0
                ? format_dec(
                      (game.atomic_efficiency + game.dark_efficiency) * 100,
                      0
                  )
                : format_num(Math.round(game.atomic_efficiency * 100), 0)) +
            "%<br>Blue " +
            spice_text[0] +
            " input: <span class='blue_spice'>" +
            format_inum(game.antitotal_spice[4], game.notation) +
            spice_unit +
            " blue " +
            spice_text[0] +
            "</span><br>" +
            yield_str +
            "<br><br>Total atomic " +
            spice_text[0] +
            " used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[4], game.notation) +
            " atomic " +
            spice_text[0] +
            "</span>"

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
            "Activating the " +
            spice_text[1] +
            " Collider will consume some atomic " +
            spice_text[0] +
            " and create pink anti" +
            spice_text[0] +
            "<br>Pink anti" +
            spice_text[0] +
            " gains are calculated based on total atomic " +
            spice_text[0] +
            " used and total pink " +
            spice_text[0]

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
            .pow((game.atomic_efficiency + game.dark_efficiency) / 608)
            .div(8.098e34)

        let amount = atomic_amount.mul(pink_amount)
        if (amount.cmp(Decimal.pow(10, 88)) >= 0)
            amount = Decimal.pow(10, (amount.log(10) / 88) ** 0.5 * 88)
        let yield_str =
            "Expected yield: <span class='pink_antispice'>+" +
            format_inum(amount.sub(game.antispice[5]).floor(), game.notation) +
            " pink anti" +
            spice_text[0] +
            "</span>"
        if (amount.sub(game.antispice[5]).floor().cmp(0) === -1)
            yield_str =
                "Expected yield: <span class='pink_antispice'>+" +
                format_inum(new Decimal(0), game.notation) +
                " pink anti" +
                spice_text[0] +
                "</span>"

        document.getElementById("collider_info").innerHTML =
            "Atomic " +
            spice_text[0] +
            " input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic " +
            spice_text[0] +
            "</span><br>Atomic " +
            spice_text[0] +
            " efficiency: " +
            (game.dark_efficiency > 0
                ? format_dec(
                      (game.atomic_efficiency + game.dark_efficiency) * 100,
                      0
                  )
                : format_num(Math.round(game.atomic_efficiency * 100), 0)) +
            "%<br>Pink " +
            spice_text[0] +
            " input: <span class='pink_spice'>" +
            format_inum(game.antitotal_spice[5], game.notation) +
            spice_unit +
            " pink " +
            spice_text[0] +
            "</span><br>" +
            yield_str +
            "<br><br>Total atomic " +
            spice_text[0] +
            " used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[5], game.notation) +
            " atomic " +
            spice_text[0] +
            "</span>"

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
            "Activating the " +
            spice_text[1] +
            " Collider will consume some atomic " +
            spice_text[0] +
            " and create rainbow anti" +
            spice_text[0] +
            "<br>Rainbow anti" +
            spice_text[0] +
            " gains are calculated based on total atomic " +
            spice_text[0] +
            " used and total rainbow " +
            spice_text[0]

        let rainbow_amount =
            (game.antitotal_spice[6].log(10) - 28550000) / 5400000
        if (rainbow_amount > 0.5)
            rainbow_amount = ((rainbow_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
        else rainbow_amount = 0.5
        if (rainbow_amount > 24) {
            if (game.galactic_bought[7])
                rainbow_amount = (rainbow_amount - 24) ** 0.54 + 24
            else rainbow_amount = 24
        }

        let atomic_amount =
            (game.spent_atomic_spice[6]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .log(10) -
                32768) /
            1984
        if (atomic_amount > 0.5)
            atomic_amount = ((atomic_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
        else atomic_amount = 0.5
        if (atomic_amount > 24) {
            if (game.galactic_bought[7])
                atomic_amount = (atomic_amount - 24) ** 0.54 + 24
            else atomic_amount = 24
        }

        let amount =
            Math.floor(atomic_amount + rainbow_amount) -
            game.total_rainbow_antispice
        let yield_str =
            "Expected yield: <span class='rainbow_antispice'>+" +
            format_num(amount, game.notation) +
            " rainbow anti" +
            spice_text[0] +
            "</span> (" +
            format_dec(((atomic_amount + rainbow_amount) % 1) * 100) +
            "% to next)"
        if (atomic_amount + rainbow_amount >= 48 && !game.galactic_bought[7])
            yield_str =
                "Expected yield: <span class='rainbow_antispice'>+" +
                format_num(amount, game.notation) +
                " rainbow anti" +
                spice_text[0] +
                "</span> (Maxed)"

        document.getElementById("collider_info").innerHTML =
            "Atomic " +
            spice_text[0] +
            " input: <span class='atomic_spice'>" +
            format_inum(
                game.atomic_spice.mul(game.atomic_portion),
                game.notation
            ) +
            " atomic " +
            spice_text[0] +
            "</span><br>Rainbow " +
            spice_text[0] +
            " input: <span class='rainbow_spice'>" +
            format_inum(game.antitotal_spice[6], game.notation) +
            rainbow_unit +
            " rainbow " +
            spice_text[0] +
            "</span><br>" +
            yield_str +
            "<br><br>Total atomic " +
            spice_text[0] +
            " used: <span class='atomic_spice'>" +
            format_inum(game.spent_atomic_spice[6], game.notation) +
            " atomic " +
            spice_text[0] +
            "</span>"

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
        document.getElementById("collider_timing").style.display = "flex"
    } else {
        document.getElementById("collider_auto").style.display = "none"
        document.getElementById("collider_timing").style.display = "none"
    }

    document.getElementById("unstable_spice_num").innerHTML = format_inum(
        game.unstable_spice.round(),
        game.notation
    )
    if (game.gamespeed !== 1) {
        if (
            game.unstable_spice.cmp(0.5) < 0 ||
            (game.unstable_spice.mul(2).log(2) * game.halflife) /
                game.gamespeed <
                0.01
        ) {
            document.getElementById("unstable_decay").innerHTML =
                "Your unstable " +
                spice_text[0] +
                " is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation, 1, true)
        } else {
            document.getElementById("unstable_decay").innerHTML =
                "Your unstable " +
                spice_text[0] +
                " is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation, 1, true) +
                ",<br>and will be completely decayed in " +
                format_time_long(
                    (game.unstable_spice.mul(2).log(2) * game.halflife) /
                        game.gamespeed,
                    game.notation
                ) +
                " real time"
        }
    } else {
        if (
            game.unstable_spice.cmp(0.5) < 0 ||
            game.unstable_spice.mul(2).log(2) * game.halflife < 0.01
        ) {
            document.getElementById("unstable_decay").innerHTML =
                "Your unstable " +
                spice_text[0] +
                " is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation, 1, true)
        } else {
            document.getElementById("unstable_decay").innerHTML =
                "Your unstable " +
                spice_text[0] +
                " is decaying away with a half-life of " +
                format_time_long(game.halflife, game.notation, 1, true) +
                ",<br>and will be completely decayed in " +
                format_time_long(
                    game.unstable_spice.mul(2).log(2) * game.halflife,
                    game.notation
                )
        }
    }

    document.getElementById("decayed_spice_num").innerHTML = format_inum(
        game.decayed_spice,
        game.notation
    )
    document.getElementById("decay_boost").innerHTML =
        "Unstable " +
        spice_text[0] +
        " decay is boosting all normal " +
        spice_text[0] +
        " production " +
        format_idec(game.unstable_boost, game.notation) +
        "x"
    if (game.ascend_challenge !== 0) {
        document.getElementById("decay_boost").innerHTML =
            "Unstable " +
            spice_text[0] +
            " decay is boosting all normal " +
            spice_text[0] +
            " production " +
            format_idec(game.unstable_boost, game.notation) +
            "x<br><br>Your unstable " +
            spice_text[0] +
            " boosts have been reduced due to being in an Ascension challenge"
        if (game.research_complete[10] >= 1)
            document.getElementById("decay_boost").innerHTML =
                "Unstable " +
                spice_text[0] +
                " decay is boosting all normal " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x,<br>and boosting arcane " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost.pow(0.000012), game.notation) +
                "x<br><br>Your unstable " +
                spice_text[0] +
                " boosts have been reduced due to being in an Ascension challenge"
        else if (game.research_complete[2] >= 1)
            document.getElementById("decay_boost").innerHTML =
                "Unstable " +
                spice_text[0] +
                " decay is boosting all normal " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x<br><br>Your unstable " +
                spice_text[0] +
                " boosts have been reduced due to being in an Ascension challenge"
    } else {
        if (game.collapse_complete[1] >= 1)
            document.getElementById("decay_boost").innerHTML =
                "Unstable " +
                spice_text[0] +
                " decay is boosting all normal " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x,<br>and boosting arcane " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost.pow(0.000012), game.notation) +
                "x,<br>and has produced " +
                format_inum(game.free_deity, game.notation) +
                " arcane " +
                spice_text[0] +
                " deities"
        else if (game.research_complete[10] >= 1)
            document.getElementById("decay_boost").innerHTML =
                "Unstable " +
                spice_text[0] +
                " decay is boosting all normal " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x,<br>and boosting arcane " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost.pow(0.000012), game.notation) +
                "x"
        else if (game.research_complete[2] >= 1)
            document.getElementById("decay_boost").innerHTML =
                "Unstable " +
                spice_text[0] +
                " decay is boosting all normal " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and boosting crystallized " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost.pow(0.015), game.notation) +
                "x"
        if (game.collapse_challenge === 8)
            document.getElementById("decay_boost").innerHTML =
                "Unstable " +
                spice_text[0] +
                " decay has created " +
                format_inum(game.free_deity, game.notation) +
                " sixth generators of all types"
        if (game.collapse_challenge === 12)
            document.getElementById("decay_boost").innerHTML =
                "Unstable " +
                spice_text[0] +
                " decay is boosting all normal " +
                spice_text[0] +
                " production " +
                format_idec(game.unstable_boost, game.notation) +
                "x,<br>and has produced " +
                format_inum(game.free_deity, game.notation) +
                " arcane " +
                spice_text[0] +
                " deities"
    }

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
            if (game.galactic_bought[6]) {
                document.getElementById("collapse_spice_delta").style.display =
                    "flex"
                document.getElementById("collapse_goal").style.display = "flex"
                document.getElementById("collapse_goal_text").innerHTML =
                    "Current Auto-Collapse Goal: +" +
                    format_inum(
                        game.autoco_goal[0].mul(game.autoco_goal2).ceil(),
                        game.notation
                    ) +
                    " atomic " +
                    spice_text[0]
            } else {
                document.getElementById("collapse_spice_delta").style.display =
                    "none"
                document.getElementById("collapse_goal").style.display = "none"
            }
        } else if (game.autoco_mode === 1) {
            document.getElementById("collapse_spice").style.display = "none"
            document.getElementById("collapse_time").style.display = "flex"
            document.getElementById("collapse_decay").style.display = "none"
            document.getElementById("collapse_spice_delta").style.display =
                "none"
            document.getElementById("collapse_goal").style.display = "none"
        } else if (game.autoco_mode === 2) {
            document.getElementById("collapse_spice").style.display = "none"
            document.getElementById("collapse_time").style.display = "none"
            document.getElementById("collapse_decay").style.display = "flex"
            document.getElementById("collapse_spice_delta").style.display =
                "none"
            document.getElementById("collapse_goal").style.display = "none"
        }

        document.getElementById("collapse_tabs").style.display = "flex"
        document.getElementById("research_unlock").style.display = "none"

        document.getElementById("spice_collider").innerHTML =
            spice_text[2] + "&nbsp;COLLIDER"
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
                spice_text[2] + "&nbsp;COLLIDER"
            if (mobile)
                document.getElementById("spice_collider").innerHTML = "COLLIDER"
        } else if (game.expand >= 1) {
            document.getElementById("collapse_tabs").style.display = "flex"
            document.getElementById("research_unlock").style.display = "none"

            document.getElementById("spice_collider").innerHTML =
                spice_text[2] + "&nbsp;COLLIDER"
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

    if (game.research_complete[20] >= 1 || game.expand >= 1) {
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
        document.getElementById("collapse_challenges").removeAttribute("aria-disabled")
    } else {
        document.getElementById("collapse_challenges").innerHTML = "LOCKED"
        document.getElementById("collapse_challenges").className =
            "subtab locked"
        document.getElementById("collapse_challenges").setAttribute("aria-disabled", "true")
    }

    if (game.research_complete[21] >= 1 || game.expand >= 1) {
        document.getElementById("antispice").innerHTML = "ANTI" + spice_text[2]
        if (game.subtab[4] === 3)
            document.getElementById("antispice").className = "subtab selected"
        else document.getElementById("antispice").className = "subtab unlocked"
        document.getElementById("antispice").removeAttribute("aria-disabled")

        if (game.research_complete[21]) {
            document.getElementById("collider_tabs").style.display = "flex"

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
        }
    } else {
        document.getElementById("antispice").innerHTML = "LOCKED"
        document.getElementById("antispice").className = "subtab locked"
        document.getElementById("antispice").setAttribute("aria-disabled", "true")

        document.getElementById("collider_tabs").style.display = "none"
    }

    if (game.collapse_challenge !== 0) {
        document.getElementById("exit_collapse_challenge").style.display =
            "block"
    } else {
        document.getElementById("exit_collapse_challenge").style.display =
            "none"
    }

    if (game.galactic_bought[3]) {
        if (game.galactic_bought[13]) {
            if (total_completions === 1) {
                document.getElementById("collapse_challenge_info").innerHTML =
                    "Entering a Collapse Challenge will reset your current Collapse" +
                    "<br>You must Collapse for the required amount of atomic " +
                    spice_text[0] +
                    " to complete the Challenge" +
                    "<br><br>Collapse automation and pre-Expansion atomic " +
                    spice_text[0] +
                    " multipliers are disabled in Collapse Challenges," +
                    "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
                    "<br><br>You have a total of " +
                    format_small(1) +
                    " Collapse challenge completion."
            } else {
                document.getElementById("collapse_challenge_info").innerHTML =
                    "Entering a Collapse Challenge will reset your current Collapse" +
                    "<br>You must Collapse for the required amount of atomic " +
                    spice_text[0] +
                    " to complete the Challenge" +
                    "<br><br>Collapse automation and pre-Expansion atomic " +
                    spice_text[0] +
                    " multipliers are disabled in Collapse Challenges," +
                    "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
                    "<br><br>You have a total of " +
                    format_small(total_completions) +
                    " Collapse challenge completions."
            }
        } else {
            if (total_completions === 1) {
                document.getElementById("collapse_challenge_info").innerHTML =
                    "Entering a Collapse Challenge will reset your current Collapse" +
                    "<br>You must Collapse for the required amount of atomic " +
                    spice_text[0] +
                    " to complete the Challenge" +
                    "<br><br>Collapse automation and atomic " +
                    spice_text[0] +
                    " multipliers are disabled in Collapse Challenges," +
                    "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
                    "<br><br>You have a total of " +
                    format_small(1) +
                    " Collapse challenge completion."
            } else {
                document.getElementById("collapse_challenge_info").innerHTML =
                    "Entering a Collapse Challenge will reset your current Collapse" +
                    "<br>You must Collapse for the required amount of atomic " +
                    spice_text[0] +
                    " to complete the Challenge" +
                    "<br><br>Collapse automation and atomic " +
                    spice_text[0] +
                    " multipliers are disabled in Collapse Challenges," +
                    "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
                    "<br><br>You have a total of " +
                    format_small(total_completions) +
                    " Collapse challenge completions."
            }
        }
    } else {
        if (total_completions >= 30) {
            document.getElementById("collapse_challenge_info").innerHTML =
                "Entering a Collapse Challenge will reset your current Collapse" +
                "<br>You must Collapse for the required amount of atomic " +
                spice_text[0] +
                " to complete the Challenge" +
                "<br><br>Collapse automation and atomic " +
                spice_text[0] +
                " multipliers are disabled in Collapse Challenges," +
                "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
                "<br><br>You have a total of " +
                format_small(total_completions) +
                " Collapse challenge completions."
        } else if (total_completions > 1) {
            document.getElementById("collapse_challenge_info").innerHTML =
                "Entering a Collapse Challenge will reset your current Collapse" +
                "<br>You must Collapse for the required amount of atomic " +
                spice_text[0] +
                " to complete the Challenge" +
                "<br><br>Collapse automation and atomic " +
                spice_text[0] +
                " multipliers are disabled in Collapse Challenges," +
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
                "<br>You must Collapse for the required amount of atomic " +
                spice_text[0] +
                " to complete the Challenge" +
                "<br><br>Collapse automation and atomic " +
                spice_text[0] +
                " multipliers are disabled in Collapse Challenges," +
                "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
                "<br><br>You have a total of " +
                format_small(1) +
                " Collapse challenge completion." +
                "<br>Reach " +
                format_small(30) +
                " total Collapse challenge completions to unlock Research #31."
        } else if (total_completions === 0 && game.expand >= 1) {
            document.getElementById("collapse_challenge_info").innerHTML =
                "Entering a Collapse Challenge will reset your current Collapse" +
                "<br>You must Collapse for the required amount of atomic " +
                spice_text[0] +
                " to complete the Challenge" +
                "<br><br>Collapse automation and atomic " +
                spice_text[0] +
                " multipliers are disabled in Collapse Challenges," +
                "<br>and Collapse Challenge rewards do not apply in the Challenge they're from" +
                "<br><br>You have a total of " +
                format_small(0) +
                " Collapse challenge completions." +
                "<br>Reach " +
                format_small(30) +
                " total Collapse challenge completions to unlock Research #31."
        } else {
            document.getElementById("collapse_challenge_info").innerHTML =
                "Entering a Collapse Challenge will reset your current Collapse" +
                "<br>You must Collapse for the required amount of atomic " +
                spice_text[0] +
                " to complete the Challenge" +
                "<br><br>Collapse automation and atomic " +
                spice_text[0] +
                " multipliers are disabled in Collapse Challenges," +
                "<br>and Collapse Challenge rewards do not apply in the Challenge they're from"
        }
    }

    if (game.expand >= 1 && game.research_complete[20] === 0) {
        document.getElementById("collapse_challenge_unlock").style.display =
            "block"
    } else {
        document.getElementById("collapse_challenge_unlock").style.display =
            "none"
    }

    if (game.galactic_bought[15]) {
        document.getElementById("collapse_challenge_auto").style.display =
            "flex"
        if (game.autocc_challenge === 0) {
            document.getElementById("challenge_auto_sweep").style.display =
                "block"
            document.getElementById("challenge_auto_sweep").innerHTML =
                format_time(
                    game.autocc_cooldown - game.autocc_timer,
                    game.notation
                ) + " until next sweep"
        } else {
            document.getElementById("challenge_auto_sweep").style.display =
                "none"
        }
    } else {
        document.getElementById("collapse_challenge_auto").style.display =
            "none"
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
                if (game.galactic_bought[3]) {
                    if (game.collapse_complete[c.id] === 0) {
                        c.desc +=
                            "<br>Reward: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(2.5 * reward_scaling, game.notation) +
                            "% stronger"
                    } else if (game.collapse_complete[c.id] < 12) {
                        c.desc +=
                            "<br>Currently: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(
                                game.collapse_complete[c.id] *
                                    2.5 *
                                    reward_scaling,
                                game.notation
                            ) +
                            "% stronger<br>Next: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(
                                (game.collapse_complete[c.id] * 2.5 + 2.5) *
                                    reward_scaling,
                                game.notation
                            ) +
                            "% stronger"
                    } else {
                        let prev =
                            format_dec(
                                (game.collapse_complete[c.id] * 1.5 + 12) *
                                    reward_scaling,
                                game.notation
                            ) + "%"
                        if (
                            (game.collapse_complete[c.id] * 1.5 + 12) *
                                reward_scaling >=
                            100
                        )
                            prev =
                                format_dec(
                                    1 +
                                        (game.collapse_complete[c.id] * 0.015 +
                                            0.12) *
                                            reward_scaling,
                                    game.notation
                                ) + "x"
                        if (game.galactic_bought[17]) {
                            prev =
                                format_dec(
                                    game.collapse_complete[c.id] *
                                        0.85 *
                                        reward_scaling,
                                    game.notation
                                ) + "%"
                            if (
                                game.collapse_complete[c.id] *
                                    0.85 *
                                    reward_scaling >=
                                100
                            )
                                prev =
                                    format_dec(
                                        1 +
                                            game.collapse_complete[c.id] *
                                                0.085 *
                                                reward_scaling,
                                        game.notation
                                    ) + "x"
                        }

                        let next =
                            format_dec(
                                (game.collapse_complete[c.id] * 1.5 + 13.5) *
                                    reward_scaling,
                                game.notation
                            ) + "%"
                        if (
                            (game.collapse_complete[c.id] * 1.5 + 13.5) *
                                reward_scaling >=
                            100
                        )
                            next =
                                format_dec(
                                    1 +
                                        (game.collapse_complete[c.id] * 0.015 +
                                            0.135) *
                                            reward_scaling,
                                    game.notation
                                ) + "x"
                        if (game.galactic_bought[17]) {
                            next =
                                format_dec(
                                    (game.collapse_complete[c.id] * 0.85 +
                                        0.85) *
                                        reward_scaling,
                                    game.notation
                                ) + "%"
                            if (
                                (game.collapse_complete[c.id] * 0.85 + 0.85) *
                                    reward_scaling >=
                                100
                            )
                                next =
                                    format_dec(
                                        1 +
                                            (game.collapse_complete[c.id] *
                                                0.085 +
                                                0.085) *
                                                reward_scaling,
                                        game.notation
                                    ) + "x"
                        }

                        c.desc +=
                            "<br>Currently: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            prev +
                            " stronger<br>Next: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            next +
                            " stronger"
                    }
                } else {
                    if (game.collapse_complete[c.id] === 0) {
                        c.desc +=
                            "<br>Reward: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(2.5 * reward_scaling, game.notation) +
                            "% stronger<br>Next research unlock in " +
                            format_small(1) +
                            " completion"
                    } else if (game.collapse_complete[c.id] === 1) {
                        c.desc +=
                            "<br>Currently: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(2.5 * reward_scaling, game.notation) +
                            "% stronger<br>Next: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(5 * reward_scaling, game.notation) +
                            "% stronger<br>Next research unlock in " +
                            format_small(1) +
                            " completion"
                    } else if (game.collapse_complete[c.id] === 2) {
                        c.desc +=
                            "<br>Currently: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(5 * reward_scaling, game.notation) +
                            "% stronger<br>Next: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(7.5 * reward_scaling, game.notation) +
                            "% stronger<br>Next research unlock in " +
                            format_small(1) +
                            " completion"
                    } else if (game.collapse_complete[c.id] < 12) {
                        c.desc +=
                            "<br>Currently: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(
                                game.collapse_complete[c.id] *
                                    2.5 *
                                    reward_scaling,
                                game.notation
                            ) +
                            "% stronger<br>Next: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            format_dec(
                                (game.collapse_complete[c.id] * 2.5 + 2.5) *
                                    reward_scaling,
                                game.notation
                            ) +
                            "% stronger"
                    } else {
                        let prev =
                            format_dec(
                                (game.collapse_complete[c.id] * 1.5 + 12) *
                                    reward_scaling,
                                game.notation
                            ) + "%"
                        if (
                            (game.collapse_complete[c.id] * 1.5 + 12) *
                                reward_scaling >=
                            100
                        )
                            prev =
                                format_dec(
                                    1 +
                                        (game.collapse_complete[c.id] * 0.015 +
                                            0.12) *
                                            reward_scaling,
                                    game.notation
                                ) + "x"

                        let next =
                            format_dec(
                                (game.collapse_complete[c.id] * 1.5 + 13.5) *
                                    reward_scaling,
                                game.notation
                            ) + "%"
                        if (
                            (game.collapse_complete[c.id] * 1.5 + 13.5) *
                                reward_scaling >=
                            100
                        )
                            next =
                                format_dec(
                                    1 +
                                        (game.collapse_complete[c.id] * 0.015 +
                                            0.135) *
                                            reward_scaling,
                                    game.notation
                                ) + "x"

                        c.desc +=
                            "<br>Currently: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            prev +
                            " stronger<br>Next: Normal " +
                            spice_text[0] +
                            " multipliers are " +
                            next +
                            " stronger"
                    }
                }
                break
            case 1:
                c.desc =
                    "Unstable " +
                    spice_text[0] +
                    " decay gives no boost, it instead produces sixth generators"
                if (game.galactic_bought[3]) {
                    if (game.collapse_complete[c.id] === 0) {
                        c.desc +=
                            "<br>Reward: Unstable " +
                            spice_text[0] +
                            " decay now also produces arcane " +
                            spice_text[0] +
                            " deities"
                    } else {
                        if (game.galactic_bought[16]) {
                            let divisor =
                                198 /
                                    (1 +
                                        Math.exp(
                                            Decimal.max(
                                                1,
                                                game.total_unstable_spice
                                            ).log(10) / -200000
                                        )) -
                                98
                            c.desc +=
                                "<br>Currently: Unstable " +
                                spice_text[0] +
                                " decay has produced " +
                                format_inum(
                                    game.unstable_boost
                                        .pow(
                                            ((1 +
                                                game.collapse_complete[c.id]) *
                                                reward_scaling) /
                                                (60000 * divisor)
                                        )
                                        .floor()
                                        .sub(1),
                                    game.notation
                                ) +
                                " arcane " +
                                spice_text[0] +
                                " deities<br>Next: Unstable " +
                                spice_text[0] +
                                " decay will produce " +
                                format_inum(
                                    game.unstable_boost
                                        .pow(
                                            ((2 +
                                                game.collapse_complete[c.id]) *
                                                reward_scaling) /
                                                (60000 * divisor)
                                        )
                                        .floor()
                                        .sub(1),
                                    game.notation
                                ) +
                                " arcane " +
                                spice_text[0] +
                                " deities"
                        } else {
                            c.desc +=
                                "<br>Currently: Unstable " +
                                spice_text[0] +
                                " decay has produced " +
                                format_inum(
                                    game.unstable_boost
                                        .pow(
                                            ((1 +
                                                game.collapse_complete[c.id]) *
                                                reward_scaling) /
                                                60000
                                        )
                                        .floor()
                                        .sub(1),
                                    game.notation
                                ) +
                                " arcane " +
                                spice_text[0] +
                                " deities<br>Next: Unstable " +
                                spice_text[0] +
                                " decay will produce " +
                                format_inum(
                                    game.unstable_boost
                                        .pow(
                                            ((2 +
                                                game.collapse_complete[c.id]) *
                                                reward_scaling) /
                                                60000
                                        )
                                        .floor()
                                        .sub(1),
                                    game.notation
                                ) +
                                " arcane " +
                                spice_text[0] +
                                " deities"
                        }
                    }
                } else {
                    if (game.collapse_complete[c.id] === 0) {
                        c.desc +=
                            "<br>Reward: Unstable " +
                            spice_text[0] +
                            " decay now also produces arcane " +
                            spice_text[0] +
                            " deities<br>Next research unlock in " +
                            format_small(1) +
                            " completion"
                    } else if (game.collapse_complete[c.id] === 1) {
                        c.desc +=
                            "<br>Currently: Unstable " +
                            spice_text[0] +
                            " decay has produced " +
                            format_inum(
                                game.unstable_boost
                                    .pow((2 * reward_scaling) / 60000)
                                    .floor()
                                    .sub(1),
                                game.notation
                            ) +
                            " arcane " +
                            spice_text[0] +
                            " deities<br>Next: Unstable " +
                            spice_text[0] +
                            " decay will produce " +
                            format_inum(
                                game.unstable_boost
                                    .pow((3 * reward_scaling) / 60000)
                                    .floor()
                                    .sub(1),
                                game.notation
                            ) +
                            " arcane " +
                            spice_text[0] +
                            " deities<br>Next research unlock in " +
                            format_small(2) +
                            " completions"
                    } else if (game.collapse_complete[c.id] === 2) {
                        c.desc +=
                            "<br>Currently: Unstable " +
                            spice_text[0] +
                            " decay has produced " +
                            format_inum(
                                game.unstable_boost
                                    .pow((3 * reward_scaling) / 60000)
                                    .floor()
                                    .sub(1),
                                game.notation
                            ) +
                            " arcane " +
                            spice_text[0] +
                            " deities<br>Next: Unstable " +
                            spice_text[0] +
                            " decay will produce " +
                            format_inum(
                                game.unstable_boost
                                    .pow((4 * reward_scaling) / 60000)
                                    .floor()
                                    .sub(1),
                                game.notation
                            ) +
                            " arcane " +
                            spice_text[0] +
                            " deities<br>Next research unlock in " +
                            format_small(1) +
                            " completion"
                    } else if (game.collapse_complete[c.id] === 3) {
                        c.desc +=
                            "<br>Currently: Unstable " +
                            spice_text[0] +
                            " decay has produced " +
                            format_inum(
                                game.unstable_boost
                                    .pow((4 * reward_scaling) / 60000)
                                    .floor()
                                    .sub(1),
                                game.notation
                            ) +
                            " arcane " +
                            spice_text[0] +
                            " deities<br>Next: Unstable " +
                            spice_text[0] +
                            " decay will produce " +
                            format_inum(
                                game.unstable_boost
                                    .pow((5 * reward_scaling) / 60000)
                                    .floor()
                                    .sub(1),
                                game.notation
                            ) +
                            " arcane " +
                            spice_text[0] +
                            " deities<br>Next research unlock in " +
                            format_small(2) +
                            " completions"
                    } else if (game.collapse_complete[c.id] === 4) {
                        c.desc +=
                            "<br>Currently: Unstable " +
                            spice_text[0] +
                            " decay has produced " +
                            format_inum(
                                game.unstable_boost
                                    .pow((5 * reward_scaling) / 60000)
                                    .floor()
                                    .sub(1),
                                game.notation
                            ) +
                            " arcane " +
                            spice_text[0] +
                            " deities<br>Next: Unstable " +
                            spice_text[0] +
                            " decay will produce " +
                            format_inum(
                                game.unstable_boost
                                    .pow((6 * reward_scaling) / 60000)
                                    .floor()
                                    .sub(1),
                                game.notation
                            ) +
                            " arcane " +
                            spice_text[0] +
                            " deities<br>Next research unlock in " +
                            format_small(1) +
                            " completion"
                    } else {
                        c.desc +=
                            "<br>Currently: Unstable " +
                            spice_text[0] +
                            " decay has produced " +
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
                            " arcane " +
                            spice_text[0] +
                            " deities<br>Next: Unstable " +
                            spice_text[0] +
                            " decay will produce " +
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
                            " arcane " +
                            spice_text[0] +
                            " deities"
                    }
                }
                break
            case 2:
                c.desc =
                    "The game runs " +
                    format_small(100000) +
                    "x slower, reach the goal in 500 microseconds or less"
                if (game.galactic_bought[3]) {
                    if (game.collapse_complete[c.id] === 0) {
                        c.desc +=
                            "<br>Reward: The game runs " +
                            format_num(2 ** reward_scaling9, game.notation) +
                            "x faster"
                    } else if (game.collapse_complete[c.id] < 7) {
                        c.desc +=
                            "<br>Currently: The game runs " +
                            format_num(
                                (2 ** game.collapse_complete[c.id]) **
                                    reward_scaling9,
                                game.notation
                            ) +
                            "x faster<br>Next: The game runs " +
                            format_num(
                                (2 ** (game.collapse_complete[c.id] + 1)) **
                                    reward_scaling9,
                                game.notation
                            ) +
                            "x faster"
                    } else {
                        c.desc +=
                            "<br>Currently: The game runs " +
                            format_num(
                                (32 *
                                    factorial(
                                        game.collapse_complete[c.id] - 4
                                    )) **
                                    reward_scaling9,
                                game.notation
                            ) +
                            "x faster<br>Next: The game runs " +
                            format_num(
                                (32 *
                                    factorial(
                                        game.collapse_complete[c.id] - 3
                                    )) **
                                    reward_scaling9,
                                game.notation
                            ) +
                            "x faster"
                    }
                } else {
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
                                    factorial(
                                        game.collapse_complete[c.id] - 4
                                    )) **
                                    reward_scaling9,
                                game.notation
                            ) +
                            "x faster<br>Next: The game runs " +
                            format_num(
                                (32 *
                                    factorial(
                                        game.collapse_complete[c.id] - 3
                                    )) **
                                    reward_scaling9,
                                game.notation
                            ) +
                            "x faster"
                    }
                }
                break
            case 3:
                c.desc =
                    "Color augment scaling is much stronger, and color augments begin at " +
                    format_small(4) +
                    " color boosts<br>Ascension upgrade prices are also reduced"
                if (game.galactic_bought[3]) {
                    if (game.collapse_complete[c.id] === 0) {
                        c.desc +=
                            "<br>Reward: Color augments begin at " +
                            format_small(Math.round(4194304 * reward_scaling)) +
                            " color boosts"
                    } else {
                        c.desc +=
                            "<br>Currently: Color augments begin at " +
                            format_small(
                                Math.round(
                                    (2097152 +
                                        2097152 *
                                            game.collapse_complete[c.id]) *
                                        reward_scaling
                                )
                            ) +
                            " color boosts<br>Next: Color augments begin at " +
                            format_small(
                                Math.round(
                                    (4194304 +
                                        2097152 *
                                            game.collapse_complete[c.id]) *
                                        reward_scaling
                                )
                            ) +
                            " color boosts"
                    }
                } else {
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
                                        2097152 *
                                            game.collapse_complete[c.id]) *
                                        reward_scaling
                                )
                            ) +
                            " color boosts<br>Next: Color augments begin at " +
                            format_small(
                                Math.round(
                                    (4194304 +
                                        2097152 *
                                            game.collapse_complete[c.id]) *
                                        reward_scaling
                                )
                            ) +
                            " color boosts<br>Next research unlock in " +
                            format_small(5 - game.collapse_complete[c.id]) +
                            " completions"
                    } else if (game.collapse_complete[c.id] === 4) {
                        c.desc +=
                            "<br>Currently: Color augments begin at " +
                            format_small(
                                Math.round(10485760 * reward_scaling)
                            ) +
                            " color boosts<br>Next: Color augments begin at " +
                            format_small(
                                Math.round(12582912 * reward_scaling)
                            ) +
                            " color boosts<br>Next research unlock in " +
                            format_small(1) +
                            " completion"
                    } else if (game.collapse_complete[c.id] <= 7) {
                        c.desc +=
                            "<br>Currently: Color augments begin at " +
                            format_small(
                                Math.round(
                                    (2097152 +
                                        2097152 *
                                            game.collapse_complete[c.id]) *
                                        reward_scaling
                                )
                            ) +
                            " color boosts<br>Next: Color augments begin at " +
                            format_small(
                                Math.round(
                                    (4194304 +
                                        2097152 *
                                            game.collapse_complete[c.id]) *
                                        reward_scaling
                                )
                            ) +
                            " color boosts<br>Next research unlock in " +
                            format_small(9 - game.collapse_complete[c.id]) +
                            " completions"
                    } else if (game.collapse_complete[c.id] === 8) {
                        c.desc +=
                            "<br>Currently: Color augments begin at " +
                            format_small(
                                Math.round(18874368 * reward_scaling)
                            ) +
                            " color boosts<br>Next: Color augments begin at " +
                            format_small(
                                Math.round(20971520 * reward_scaling)
                            ) +
                            " color boosts<br>Next research unlock in " +
                            format_small(1) +
                            " completion"
                    } else {
                        c.desc +=
                            "<br>Currently: Color augments begin at " +
                            format_small(
                                Math.round(
                                    (2097152 +
                                        2097152 *
                                            game.collapse_complete[c.id]) *
                                        reward_scaling
                                )
                            ) +
                            " color boosts<br>Next: Color augments begin at " +
                            format_small(
                                Math.round(
                                    (4194304 +
                                        2097152 *
                                            game.collapse_complete[c.id]) *
                                        reward_scaling
                                )
                            ) +
                            " color boosts"
                    }
                }
                break
            case 4:
                c.desc =
                    "Ascension is disabled, but Challenge 6 is not required to Collapse"
                if (game.galactic_bought[3]) {
                    if (game.collapse_complete[c.id] === 0) {
                        c.desc +=
                            "<br>Reward: You gain " +
                            format_num(1, game.notation) +
                            "% of your pending Ansuz runes every second"
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
                            "x more Ansuz runes (based on arcane enchantments)"
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
                } else {
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
                }
                break
            case 5:
                c.desc =
                    "Same as Challenge 6, but all research boosts are disabled, and red, yellow, green, & blue " +
                    spice_text[0] +
                    " production is disabled"
                if (game.galactic_bought[3]) {
                    if (game.collapse_complete[c.id] === 0) {
                        c.desc +=
                            "<br>Reward: You gain data " +
                            format_dec(2 * reward_scaling, game.notation) +
                            "x faster while researching"
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
                } else {
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
                            format_dec(
                                (2 * reward_scaling) ** 3,
                                game.notation
                            ) +
                            "x faster while researching<br>Next: You gain data " +
                            format_dec(
                                (2 * reward_scaling) ** 4,
                                game.notation
                            ) +
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
                            format_dec(
                                (2 * reward_scaling) ** 7,
                                game.notation
                            ) +
                            "x faster while researching<br>Next: You gain data " +
                            format_dec(
                                (2 * reward_scaling) ** 8,
                                game.notation
                            ) +
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
                }
                break
        }

        let panel = challenge_map.get(c)
        let button = panel.querySelector(".co_challenge_button")
        let info = panel.querySelector(".co_challenge_text")

        if (game.research_complete[c.unlock] >= 1) {
            panel.style.display = "flex"

            if (game.collapse_challenge === c.id + 7) {
                if (
                    collapse_amount.cmp(get_collapse_goal(c.id, 0)) >= 0 &&
                    (game.ascend_complete[5] || game.collapse_challenge === 11)
                ) {
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
                    " atomic " +
                    spice_text[0] +
                    "</span><br>Completions: " +
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
                    " atomic " +
                    spice_text[0] +
                    "</span><br>Completions: " +
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
                    if (game.galactic_bought[5] && r.req2 !== undefined) {
                        if (game.research_complete[r.req2] >= 1) {
                            button.style.display = "block"
                        } else {
                            button.style.display = "none"
                        }
                    } else {
                        if (game.research_complete[r.req] >= 1) {
                            button.style.display = "block"
                        } else {
                            button.style.display = "none"
                        }
                    }
                } else {
                    if (game.galactic_bought[3]) {
                        if (game.research_complete[r.req2] >= 1) {
                            button.style.display = "block"
                        } else {
                            button.style.display = "none"
                        }
                    } else {
                        if (r.req > -700) {
                            if (total_completions >= -r.req) {
                                button.style.display = "block"
                            } else {
                                button.style.display = "none"
                            }
                        } else {
                            let challenge = Math.floor(r.req / -100) - 7
                            let completion = -r.req % 100

                            if (
                                game.collapse_complete[challenge] >= completion
                            ) {
                                button.style.display = "block"
                            } else {
                                button.style.display = "none"
                            }
                        }
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
                    "The half-life of unstable " +
                    spice_text[0] +
                    " becomes " +
                    format_dec(33 * antispice_halflife) +
                    "% shorter<br>Current unstable " +
                    spice_text[0] +
                    " half-life: " +
                    format_time_long(game.halflife, game.notation, 1, true)
                if (game.collapse_challenge === 12)
                    r.desc =
                        "The half-life of unstable " +
                        spice_text[0] +
                        " becomes " +
                        format_dec(33 * antispice_halflife) +
                        "% shorter<br>Disabled in Challenge 12"
                break
            case 2:
                r.desc =
                    "Unstable " +
                    spice_text[0] +
                    " decay now also boosts crystallized " +
                    spice_text[0] +
                    " production"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unstable " +
                        spice_text[0] +
                        " decay now also boosts crystallized " +
                        spice_text[0] +
                        " production<br>Disabled in Challenge 12"
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
                    "Atomic " +
                    spice_text[0] +
                    " gains are additionally boosted by total rune power produced<br>Current boost: " +
                    format_idec(rune_atomic, game.notation) +
                    "x"
                if (game.collapse_challenge !== 0) {
                    r.desc =
                        "Atomic " +
                        spice_text[0] +
                        " gains are additionally boosted by total rune power produced<br>Disabled in Collapse Challenges"
                }
                break
            case 7:
                let antispice_efficiency = 1
                if (game.antispice_bought[0]) antispice_efficiency = 1.15
                if (game.research_complete[7] < 4)
                    r.desc =
                        "Atomic " +
                        spice_text[0] +
                        " conversion is " +
                        format_dec(10 * antispice_efficiency, game.notation) +
                        "% more efficient<br>Current atomic " +
                        spice_text[0] +
                        " efficiency: " +
                        (game.dark_efficiency > 0
                            ? format_dec(
                                  (game.atomic_efficiency +
                                      game.dark_efficiency) *
                                      100,
                                  0
                              )
                            : format_num(
                                  Math.round(game.atomic_efficiency * 100),
                                  0
                              )) +
                        "%"
                else
                    r.desc =
                        "Atomic " +
                        spice_text[0] +
                        " conversion is " +
                        format_dec(5 * antispice_efficiency, game.notation) +
                        "% more efficient<br>Current atomic " +
                        spice_text[0] +
                        " efficiency: " +
                        (game.dark_efficiency > 0
                            ? format_dec(
                                  (game.atomic_efficiency +
                                      game.dark_efficiency) *
                                      100,
                                  0
                              )
                            : format_num(
                                  Math.round(game.atomic_efficiency * 100),
                                  0
                              )) +
                        "%"
                break
            case 10:
                r.desc =
                    "Unstable " +
                    spice_text[0] +
                    " decay now also boosts arcane " +
                    spice_text[0] +
                    " production"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unstable " +
                        spice_text[0] +
                        " decay now also boosts arcane " +
                        spice_text[0] +
                        " production<br>Disabled in Challenge 12"
                break
            case 12:
                if (game.collapse <= 612)
                    r.desc =
                        "Ansuz rune gains from Ascension are boosted by Times Collapsed statistic<br>Current boost: " +
                        format_idec(
                            Decimal.pow(7.27e27, (game.collapse / 5) ** 0.5),
                            game.notation
                        ) +
                        "x"
                else
                    r.desc =
                        "Ansuz rune gains from Ascension are boosted by Times Collapsed statistic<br>Current boost: " +
                        format_idec(
                            Decimal.pow(
                                7.27e27,
                                (2 * game.collapse - 1013.3) ** 0.25 + 7.2535
                            ),
                            game.notation
                        ) +
                        "x"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Ansuz rune gains from Ascension are boosted by Times Collapsed statistic<br>Disabled in Challenge 12"
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
                    "Unstable " +
                    spice_text[0] +
                    " boosts are 20% stronger when unstable " +
                    spice_text[0] +
                    " is completely decayed"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unstable " +
                        spice_text[0] +
                        " boosts are 20% stronger when unstable " +
                        spice_text[0] +
                        " is completely decayed<br>Disabled in Challenge 12"
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
                            "Unspent atomic " +
                            spice_text[0] +
                            " makes the unstable " +
                            spice_text[0] +
                            " decay boost stronger<br>The boost is currently " +
                            format_dec(amount, game.notation) +
                            "x stronger"
                    } else {
                        r.desc =
                            "Unspent atomic " +
                            spice_text[0] +
                            " makes the unstable " +
                            spice_text[0] +
                            " decay boost stronger<br>The boost is currently " +
                            format_dec(amount, game.notation) +
                            "% stronger"
                    }
                } else
                    r.desc =
                        "Unspent atomic " +
                        spice_text[0] +
                        " makes the unstable " +
                        spice_text[0] +
                        " decay boost stronger<br>The boost is currently " +
                        format_dec(0, game.notation) +
                        "% stronger"

                if (game.collapse_challenge === 12)
                    r.desc =
                        "Unspent atomic " +
                        spice_text[0] +
                        " makes the unstable " +
                        spice_text[0] +
                        " decay boost stronger<br>Disabled in Challenge 12"
                break
            case 24:
                r.desc =
                    "You gain " +
                    format_small(46656) +
                    "x more atomic " +
                    spice_text[0] +
                    " for every Collapse challenge completion<br>Current boost: " +
                    format_idec(
                        Decimal.pow(46656, total_completions),
                        game.notation
                    ) +
                    "x"
                if (game.collapse_challenge !== 0) {
                    r.desc =
                        "You gain " +
                        format_small(46656) +
                        "x more atomic " +
                        spice_text[0] +
                        " for every Collapse challenge completion<br>Disabled in Collapse Challenges"
                }
                break
            case 27:
                r.desc =
                    "You get " +
                    format_small(100) +
                    " free arcane enchantments for every Collapse (up to " +
                    format_small(50) +
                    "% of your bought arcane enchantments)"
                if (game.collapse >= 50000) {
                    r.desc =
                        "You get about " +
                        format_small(
                            Math.floor(
                                -10000 *
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
                        format_small(10) +
                        " free arcane enchantments for every Collapse (up to " +
                        format_small(50) +
                        "% of your bought arcane enchantments)"
                }
                if (game.collapse_challenge === 12) {
                    r.desc += "<br>Disabled in Challenge 12"
                } else if (game.collapse_challenge === 7) {
                    r.desc += "<br>No effect in Challenge 7"
                } else {
                    let collapse_free = BigInt(game.collapse) * 100n
                    if (game.collapse >= 100000)
                        collapse_free = BigInt(
                            Math.floor(
                                5000000 *
                                    ((game.collapse - 87500) / 50000) ** 0.5 +
                                    7500000
                            )
                        )
                    if (game.collapse >= 1337500)
                        collapse_free = BigInt(game.collapse) * 10n + 19125000n
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
                    "You gain 50% more rainbow " +
                    spice_text[0] +
                    " after color augments begin"
                if (game.collapse_challenge === 12)
                    r.desc =
                        "You gain 50% more rainbow " +
                        spice_text[0] +
                        " after color augments begin<br>Disabled in Challenge 12"
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

    if (game.galactic_bought[8]) {
        document.getElementById("research_automation_block").style.display =
            "block"
        document.getElementById("research_upgrade_auto").style.display =
            "inline"
    } else {
        document.getElementById("research_automation_block").style.display =
            "none"
        document.getElementById("research_upgrade_auto").style.display = "none"
    }

    if (game.expand >= 1) {
        if (game.collapse >= 1) {
            document.getElementById("research_available").style.display = "flex"
            document.getElementById("research_available_text").innerHTML =
                "Select a research:"
        } else {
            document.getElementById("research_available").style.display = "none"
            document.getElementById("research_available_text").innerHTML =
                "Collapse to unlock research"
        }
    }

    if (game.research_view === 0) {
        document.getElementById("research_main_block").style.display = "none"
    } else {
        document.getElementById("research_main_block").style.display = "block"

        let r = game.research_view - 1

        let reward_scaling = 1
        if (game.antispice_bought[1]) reward_scaling = 1.05
        let rate = (2 * reward_scaling) ** game.collapse_complete[5]
        if (game.data_boosts >= 1)
            rate =
                2 *
                1.5 ** (game.data_boosts - 1) *
                (2 * reward_scaling) ** game.collapse_complete[5]
        if (game.galactic_bought[4]) rate *= 3 ** game.dark_conversion
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
            " atomic " +
            spice_text[0]
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

        if (game.expand >= 1)
            document.getElementById("research_upgrade_max").style.display =
                "inline"
        else
            document.getElementById("research_upgrade_max").style.display =
                "none"
    }
}

//graphics updates for antispice and antispice perks
function antispice_update() {
    if (
        game.collapse_challenge !== 0 ||
        (game.expand >= 1 && game.research_complete[21] === 0)
    ) {
        document.getElementById("antispice_reduction").style.display = "block"
        if (game.expand >= 1 && game.research_complete[21] === 0) {
            document.getElementById("antispice_reduction").innerHTML =
                "No anti" + spice_text[0] + "s unlocked yet"
        } else {
            document.getElementById("antispice_reduction").innerHTML =
                "Your anti" +
                spice_text[0] +
                " boosts have been reduced due to being in a Collapse challenge"
        }
    } else {
        document.getElementById("antispice_reduction").style.display = "none"
    }

    if (game.research_complete[21] >= 1) {
        document.getElementById("pure_antispice_block").style.display = "block"

        document.getElementById("pure_antispice_num").innerHTML = format_inum(
            game.antispice[0],
            game.notation
        )
        if (game.antispice[0].cmp(0) === 0)
            document.getElementById("pure_antispice_boost").innerHTML =
                "Your basic anti" +
                spice_text[0] +
                " is boosting arcane " +
                spice_text[0] +
                " production " +
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
                if (
                    get_antispice_amount("pure").log(10) ** (2 / 3) * 2.25 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("pure").log(10) ** (2 / 3) *
                                0.0225 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("pure_antispice_boost").innerHTML =
                    "Your basic anti" +
                    spice_text[0] +
                    " is boosting arcane " +
                    spice_text[0] +
                    " production " +
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
                if (
                    get_antispice_amount("pure").log(10) ** (2 / 3) * 4.5 >=
                    100
                )
                    stronger =
                        format_dec(
                            get_antispice_amount("pure").log(10) ** (2 / 3) *
                                0.045 +
                                1,
                            game.notation
                        ) + "x stronger"
                document.getElementById("pure_antispice_boost").innerHTML =
                    "Your basic anti" +
                    spice_text[0] +
                    " is boosting arcane " +
                    spice_text[0] +
                    " production " +
                    format_inum(
                        get_antispice_amount("pure", true).pow(15000).add(1),
                        game.notation
                    ) +
                    "x,<br>and making first generators " +
                    stronger
            }
        }
    } else {
        document.getElementById("pure_antispice_block").style.display = "none"
    }

    if (game.research_complete[23] >= 1) {
        document.getElementById("red_antispice_block").style.display = "block"

        document.getElementById("red_antispice_num").innerHTML = format_inum(
            game.antispice[1],
            game.notation
        )
        if (game.antispice[1].cmp(0) === 0)
            document.getElementById("red_antispice_boost").innerHTML =
                "Your red anti" +
                spice_text[0] +
                " is boosting red " +
                spice_text[0] +
                " production " +
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
                    "Your red anti" +
                    spice_text[0] +
                    " is boosting red " +
                    spice_text[0] +
                    " production " +
                    format_inum(
                        get_antispice_amount("red", true).pow(1.25e9).add(1),
                        game.notation
                    ) +
                    "x,<br>improving synergy between " +
                    spice_text[0] +
                    "s by " +
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
                    "Your red anti" +
                    spice_text[0] +
                    " is boosting red " +
                    spice_text[0] +
                    " production " +
                    format_inum(
                        get_antispice_amount("red", true).pow(2.5e9).add(1),
                        game.notation
                    ) +
                    "x,<br>improving synergy between " +
                    spice_text[0] +
                    "s by " +
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
                "Your yellow anti" +
                spice_text[0] +
                " is boosting yellow " +
                spice_text[0] +
                " production " +
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
                    "Your yellow anti" +
                    spice_text[0] +
                    " is boosting yellow " +
                    spice_text[0] +
                    " production " +
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
                    "Your yellow anti" +
                    spice_text[0] +
                    " is boosting yellow " +
                    spice_text[0] +
                    " production " +
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
                "Your green anti" +
                spice_text[0] +
                " is boosting green " +
                spice_text[0] +
                " production " +
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
                    "Your green anti" +
                    spice_text[0] +
                    " is boosting green " +
                    spice_text[0] +
                    " production " +
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
                    "Your green anti" +
                    spice_text[0] +
                    " is boosting green " +
                    spice_text[0] +
                    " production " +
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
                "Your blue anti" +
                spice_text[0] +
                " is boosting blue " +
                spice_text[0] +
                " production " +
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
                    "Your blue anti" +
                    spice_text[0] +
                    " is boosting blue " +
                    spice_text[0] +
                    " production " +
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
                    "Your blue anti" +
                    spice_text[0] +
                    " is boosting blue " +
                    spice_text[0] +
                    " production " +
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
                "Your pink anti" +
                spice_text[0] +
                " is boosting pink " +
                spice_text[0] +
                " production " +
                format_inum(new Decimal(1), game.notation) +
                "x,<br>boosting crystallized " +
                spice_text[0] +
                " production " +
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
                    "Your pink anti" +
                    spice_text[0] +
                    " is boosting pink " +
                    spice_text[0] +
                    " production " +
                    format_inum(
                        Decimal.pow(get_antispice_amount("pink", true), 1e9)
                            .mul(Decimal.pow(10, 6e10))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>boosting crystallized " +
                    spice_text[0] +
                    " production " +
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
                    "Your pink anti" +
                    spice_text[0] +
                    " is boosting pink " +
                    spice_text[0] +
                    " production " +
                    format_inum(
                        Decimal.pow(get_antispice_amount("pink", true), 2e9)
                            .mul(Decimal.pow(10, 1.2e11))
                            .add(1),
                        game.notation
                    ) +
                    "x,<br>boosting crystallized " +
                    spice_text[0] +
                    " production " +
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
            " rainbow anti" +
            spice_text[0]
        if (game.antispice_bought[9]) {
            if (game.antispice[6] >= 25) {
                let exponent = (game.antispice[6] / 25) ** 0.5 * 25
                if (exponent > 20 ** 0.5 * 25)
                    exponent =
                        (exponent / (20 ** 0.5 * 25)) ** 0.5 * 20 ** 0.5 * 25
                document.getElementById("total_rainbow_antispice").innerHTML =
                    "Your rainbow anti" +
                    spice_text[0] +
                    " is boosting dark " +
                    spice_text[0] +
                    " replicator production " +
                    format_idec(Decimal.pow(phi, exponent), game.notation) +
                    "x,<br>and you have a total of " +
                    format_num(game.total_rainbow_antispice, game.notation) +
                    " rainbow anti" +
                    spice_text[0]
            } else
                document.getElementById("total_rainbow_antispice").innerHTML =
                    "Your rainbow anti" +
                    spice_text[0] +
                    " is boosting dark " +
                    spice_text[0] +
                    " replicator production " +
                    format_idec(
                        Decimal.pow(phi, game.antispice[6]),
                        game.notation
                    ) +
                    "x,<br>and you have a total of " +
                    format_num(game.total_rainbow_antispice, game.notation) +
                    " rainbow anti" +
                    spice_text[0]
        }

        let total_bought = 0
        for (let i = 0; i < 8; i++) {
            if (game.antispice_bought[i]) total_bought++
        }

        if (total_bought >= 1 && !game.antispice_bought[8]) {
            document.getElementById("refund_perks").style.display = "block"
        } else {
            document.getElementById("refund_perks").style.display = "none"
        }

        if (game.galactic_bought[12]) {
            document.getElementById("antispice_auto_toggle").style.display =
                "block"
        } else {
            document.getElementById("antispice_auto_toggle").style.display =
                "none"
        }

        for (const p of antispice_perk.perks) {
            let button = antispice_map.get(p)
            document.getElementById("ap_desc" + p.id).innerHTML = p.desc

            let price = p.price
            if (p.price === 0) {
                if (game.antispice_bought[p.id]) {
                    price = game.antispice_order[p.id]
                } else {
                    price = total_bought + 1
                }
            }

            document.getElementById("ap_cost" + p.id).innerHTML =
                "-" +
                format_num(price, game.notation) +
                " rainbow anti" +
                spice_text[0]

            if (p.id === 8) {
                if (total_bought === 8) {
                    button.style.display = "block"
                } else {
                    button.style.display = "none"
                }

                if (game.antispice_bought[p.id]) {
                    if (game.galactic_bought[7]) {
                        button.className =
                            "antispice_perk ap_bought ap_special2"
                    } else {
                        button.className = "antispice_perk ap_bought ap_special"
                    }
                } else {
                    if (game.antispice[6] >= price) {
                        button.className =
                            "antispice_perk ap_unlocked ap_special"
                    } else {
                        button.className = "antispice_perk ap_locked ap_special"
                    }
                }
            } else if (p.id === 9) {
                if (game.antispice_bought[8] && game.galactic_bought[7]) {
                    button.style.display = "block"
                } else {
                    button.style.display = "none"
                }

                if (game.antispice_bought[p.id]) {
                    button.className = "antispice_perk ap_bought ap_special3"
                } else {
                    if (game.antispice[6] >= price) {
                        button.className =
                            "antispice_perk ap_unlocked ap_special3"
                    } else {
                        button.className =
                            "antispice_perk ap_locked ap_special3"
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
        }
    } else {
        document.getElementById("rainbow_antispice_block").style.display =
            "none"
    }
}
