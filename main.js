let tick_time = Date.now()
let delta_time = undefined

//game operations run every tick
function tick() {
    let reward_scaling = 1
    if (game.antispice_bought[1]) reward_scaling = 1.05
    if (game.collapse_challenge === 9) {
        game.gamespeed = 1 / 99999
    } else {
        game.gamespeed = (2 * reward_scaling) ** game.collapse_complete[2]

        if (game.antispice_bought[7]) game.gamespeed = game.gamespeed ** 1.5
    }

    game.total_time_played += 1 / delta_time
    game.prestige_time_played += 1 / delta_time
    game.ascend_time_played += 1 / delta_time
    game.collapse_time_played += 1 / delta_time

    game.ascend_challenge_timer += 1 / (delta_time * game.gamespeed)

    for (let i = 0; i < 4; i++) {
        game.real_time_played[i] += 1 / (delta_time * game.gamespeed)
    }

    if (
        game.collapse_time_played > 999 / 1000000 &&
        game.collapse_challenge === 9
    ) {
        alert(
            "You have been in Challenge 9 for longer than 999 microseconds, so you will now exit."
        )
        exit_collapse_challenge()
    }

    document.documentElement.style.setProperty(
        "--rainbow_spice",
        "hsl(" + ((game.real_time_played[0] * 36) % 360) + ",100%,50%)"
    )
    document.documentElement.style.setProperty(
        "--rainbow_spice2",
        "hsl(" + ((game.real_time_played[0] * 36) % 360) + ",100%,65%)"
    )

    document.documentElement.style.setProperty(
        "--ascension",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",100%,50%)"
    )
    document.documentElement.style.setProperty(
        "--ascension2",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",100%,60%)"
    )
    document.documentElement.style.setProperty(
        "--ascension3",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",80%,10%)"
    )
    document.documentElement.style.setProperty(
        "--ascension4",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",80%,20%)"
    )
    document.documentElement.style.setProperty(
        "--ascension5",
        "hsl(" +
            (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
            ",90%,30%)"
    )

    document.documentElement.style.setProperty(
        "--arcane_spice",
        "hsl(" +
            (5 * Math.sin(game.real_time_played[0] / 5) + 273) +
            "," +
            (15 * Math.sin(game.real_time_played[0]) + 85) +
            "%," +
            (5 * Math.sin(game.real_time_played[0]) + 55) +
            "%)"
    )
    document.documentElement.style.setProperty(
        "--arcane_spice2",
        "hsl(" +
            (5 * Math.sin(game.real_time_played[0] / 5) + 273) +
            "," +
            (9 * Math.sin(game.real_time_played[0]) + 91) +
            "%," +
            (7 * Math.sin(game.real_time_played[0]) + 48) +
            "%)"
    )

    document.documentElement.style.setProperty(
        "--collapse",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 102) + ",100%,40%)"
    )
    document.documentElement.style.setProperty(
        "--collapse2",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 102) + ",100%,50%)"
    )
    document.documentElement.style.setProperty(
        "--collapse3",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 92) + ",100%,60%)"
    )
    document.documentElement.style.setProperty(
        "--collapse4",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 102) + ",80%,10%)"
    )
    document.documentElement.style.setProperty(
        "--collapse5",
        "hsl(" + (30 * Math.sin(game.real_time_played[0]) + 92) + ",80%,20%)"
    )

    document.documentElement.style.setProperty(
        "--collapse6",
        25 * Math.sin(game.real_time_played[0]) - 25 + "deg"
    )
    document.documentElement.style.setProperty(
        "--collapse7",
        -10 * Math.sin(game.real_time_played[0]) + 110 + "%"
    )
    document.documentElement.style.setProperty(
        "--collapse8",
        10 * Math.sin(game.real_time_played[0]) + 90 + "%"
    )

    document.documentElement.style.setProperty(
        "--unstable_spice",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 16) +
            ",100%,40%)"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice2",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 16) +
            ",100%,50%)"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice3",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 26) +
            ",100%,60%)"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice7",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 26) +
            ",100%,16%)"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice8",
        "hsl(" +
            (18 * Math.sin(game.real_time_played[0] * 3) + 26) +
            ",100%,10%)"
    )

    document.documentElement.style.setProperty(
        "--unstable_spice4",
        16 * Math.sin(game.real_time_played[0] * 3) + 16 + "deg"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice5",
        50 * Math.sin(game.real_time_played[0] * 3) + 150 + "%"
    )
    document.documentElement.style.setProperty(
        "--unstable_spice6",
        -10 * Math.sin(game.real_time_played[0] * 3) + 90 + "%"
    )

    document.documentElement.style.setProperty(
        "--decayed_spice",
        "hsl(300," + (6 * Math.sin(game.real_time_played[0]) + 16) + "%,50%)"
    )
    document.documentElement.style.setProperty(
        "--decayed_spice2",
        "hsl(300," + (6 * Math.sin(game.real_time_played[0]) + 16) + "%,40%)"
    )

    document.documentElement.style.setProperty(
        "--rainbow_antispice",
        "hsl(" + ((game.real_time_played[0] * 36 + 180) % 360) + ",90%,60%)"
    )
    document.documentElement.style.setProperty(
        "--rainbow_antispice2",
        "hsl(" + ((game.real_time_played[0] * 36 + 180) % 360) + ",90%,40%)"
    )
    document.documentElement.style.setProperty(
        "--rainbow_antispice3",
        "hsl(" + ((game.real_time_played[0] * 36 + 180) % 360) + ",90%,12%)"
    )
    document.documentElement.style.setProperty(
        "--rainbow_antispice4",
        "hsl(" + ((game.real_time_played[0] * 36 + 180) % 360) + ",90%,16%)"
    )
    document.documentElement.style.setProperty(
        "--rainbow_antispice5",
        "hsl(" + ((game.real_time_played[0] * 36 + 180) % 360) + ",90%,8%)"
    )
    document.documentElement.style.setProperty(
        "--rainbow_antispice6",
        "hsl(" + ((game.real_time_played[0] * 36 + 180) % 360) + ",90%,4%)"
    )
    document.documentElement.style.setProperty(
        "--rainbow_antispice7",
        "hsl(" + ((game.real_time_played[0] * 36 + 180) % 360) + ",90%,24%)"
    )

    document.documentElement.style.setProperty(
        "--rainbow_antispice8",
        ((game.real_time_played[0] * 36 + 180) % 360) + "deg"
    )
    document.documentElement.style.setProperty(
        "--rainbow_antispice9",
        -60 *
            Math.cos(
                (((game.real_time_played[0] * 36 + 280) % 360) * Math.PI) / 180
            ) +
            160 +
            "%"
    )
    document.documentElement.style.setProperty(
        "--rainbow_antispice10",
        10 *
            Math.cos(
                (((game.real_time_played[0] * 36 + 280) % 360) * Math.PI) / 180
            ) +
            90 +
            "%"
    )

    if (game.high_visibility) {
        document.documentElement.style.setProperty(
            "--rainbow_spice2",
            "hsl(" + ((game.real_time_played[0] * 36) % 360) + ",100%,75%)"
        )
        document.documentElement.style.setProperty(
            "--ascension",
            "hsl(" +
                (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
                ",100%,65%)"
        )
        document.documentElement.style.setProperty(
            "--ascension2",
            "hsl(" +
                (25 * Math.sin(game.real_time_played[0] / 2) + 208) +
                ",100%,75%)"
        )
        document.documentElement.style.setProperty(
            "--arcane_spice",
            "hsl(" +
                (5 * Math.sin(game.real_time_played[0] / 5) + 273) +
                "," +
                (15 * Math.sin(game.real_time_played[0]) + 85) +
                "%,75%)"
        )
        document.documentElement.style.setProperty(
            "--collapse3",
            "hsl(" +
                (30 * Math.sin(game.real_time_played[0]) + 92) +
                ",100%,75%)"
        )
        document.documentElement.style.setProperty(
            "--unstable_spice3",
            "hsl(" +
                (18 * Math.sin(game.real_time_played[0] * 3) + 26) +
                ",100%,75%)"
        )
        document.documentElement.style.setProperty(
            "--decayed_spice",
            "hsl(300," +
                (8 * Math.sin(game.real_time_played[0]) + 32) +
                "%,75%)"
        )
    }

    if (game.autocb_toggle && game.prestige_bought[7] >= 1) color_boost()

    if (game.autoin_toggle && game.prestige_bought[13] >= 1) max_infusion()

    if (game.autosp_toggle[0] && game.prestige_bought[0] >= 1) max_all("red")
    if (game.autosp_toggle[1] && game.prestige_bought[0] >= 2) max_all("yellow")
    if (game.autosp_toggle[2] && game.prestige_bought[0] >= 3) max_all("green")
    if (game.autosp_toggle[3] && game.prestige_bought[0] >= 4) max_all("blue")
    if (game.autosp_toggle[4] && game.prestige_bought[0] >= 5) max_all("pink")

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

    if (game.color_boosts <= 4) {
        game.global_spice_boost = new Decimal(
            2 +
                0.2 * game.prestige_bought[2] +
                2 * (game.ascend_bought[2] + game.ascend_bought[14])
        ).pow(game.color_boosts * antispice_boosts)

        if (game.prestige_bought[18] >= 1) {
            game.global_spice_boost = new Decimal(
                6 + 2 * (game.ascend_bought[2] + game.ascend_bought[14])
            ).pow(game.color_boosts * antispice_boosts)
        }

        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
            game.collapse_challenge === 12
        ) {
            game.global_spice_boost = Decimal.pow(
                2,
                game.color_boosts * antispice_boosts
            )
        }
    } else {
        game.global_spice_boost = new Decimal(
            2 +
                0.2 * game.prestige_bought[2] +
                2 * (game.ascend_bought[2] + game.ascend_bought[14])
        ).pow((game.color_boosts * 2 - 4) * antispice_boosts)

        if (game.prestige_bought[18] >= 1) {
            game.global_spice_boost = new Decimal(
                6 + 2 * (game.ascend_bought[2] + game.ascend_bought[14])
            ).pow((game.color_boosts * 2 - 4) * antispice_boosts)
        }

        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
            game.collapse_challenge === 12
        ) {
            game.global_spice_boost = Decimal.pow(
                2,
                (game.color_boosts * 2 - 4) * antispice_boosts
            )
        }
    }

    if (
        game.prestige_bought[1] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7 &&
        game.collapse_challenge !== 12
    ) {
        if (game.ascend_bought[1]) {
            if (game.prestige >= 1000000) {
                game.global_spice_boost = game.global_spice_boost.mul(
                    Decimal.pow(
                        10 ** 25,
                        10 * (game.prestige - 914447) ** 0.25 + 829.5
                    )
                )
            } else {
                game.global_spice_boost = game.global_spice_boost.mul(
                    Decimal.pow(
                        10 ** 25,
                        game.prestige ** (0.5 + 40 / (game.prestige + 80))
                    )
                )
            }
        } else if (game.prestige >= 1) {
            game.global_spice_boost = game.global_spice_boost.mul(
                2.5 * game.prestige * (game.prestige + 1)
            )
        }
    }

    if (
        game.prestige_bought[6] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7 &&
        game.collapse_challenge !== 12
    )
        game.global_spice_boost = game.global_spice_boost.mul(
            game.rainbow_spice.div(256).pow(5).add(1)
        )

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

    if (
        game.ascend_complete[2] &&
        game.ascend_bought[24] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7 &&
        game.collapse_challenge !== 12
    ) {
        game.global_spice_boost = game.global_spice_boost.mul(
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
            )
        )
    } else if (
        game.ascend_bought[7] &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7 &&
        game.collapse_challenge !== 12
    ) {
        game.global_spice_boost = game.global_spice_boost.mul(
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
            )
        )
    } else {
        game.global_spice_boost = game.global_spice_boost.mul(
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
            )
        )
    }

    game.unstable_spice = game.unstable_spice.mul(
        0.5 ** (1 / (delta_time * game.halflife))
    )
    game.decayed_spice = Decimal.max(
        game.total_unstable_spice.sub(game.unstable_spice.round()),
        0
    )

    let decayed_amount = game.decayed_spice
    if (decayed_amount.cmp(Decimal.pow(10, 400)) >= 0) {
        decayed_amount = decayed_amount
            .div(Decimal.pow(10, 400))
            .pow(1 / 3)
            .mul(Decimal.pow(10, 400))

        if (decayed_amount.cmp(Decimal.pow(10, 3800 / 3)) >= 0) {
            decayed_amount = decayed_amount
                .div(Decimal.pow(10, 3800 / 3))
                .pow(1 / 3)
                .mul(Decimal.pow(10, 3800 / 3))
        }

        if (decayed_amount.cmp(Decimal.pow(10, 3600)) >= 0) {
            decayed_amount = decayed_amount
                .div(Decimal.pow(10, 3600))
                .pow(1 / 3)
                .mul(Decimal.pow(10, 3600))
        }
    }

    if (game.decayed_spice.cmp(1) >= 0) {
        game.unstable_boost = decayed_amount
            .add(1)
            .pow(
                Decimal.pow(
                    16777216,
                    game.decayed_spice.div(game.total_unstable_spice)
                )
            )
    } else {
        game.unstable_boost = new Decimal(1)
    }

    if (game.research_complete[14] >= 1 && game.collapse_challenge !== 12) {
        if (game.unstable_spice.round().cmp(1) === -1) {
            game.unstable_boost = game.unstable_boost.pow(1.5)
        }
    }

    if (game.research_complete[17] >= 1 && game.collapse_challenge !== 12) {
        if (game.atomic_spice.cmp(1) >= 0) {
            let amount = game.atomic_spice.log(10) * 0.0006666

            if (amount > 1) {
                amount = (amount - 1) / 3 + 2
                if (amount > 3) amount = 4 - 1 / (amount - 2)
                game.unstable_boost = game.unstable_boost.pow(amount)
            } else {
                game.unstable_boost = game.unstable_boost.pow(amount + 1)
            }
        }
    }

    if (game.ascend_challenge === 6) {
        game.unstable_boost = new Decimal(1)
    }

    if (game.collapse_challenge === 8) {
        game.unstable_boost = new Decimal(1)
        game.free_deity = game.decayed_spice
            .pow(game.decayed_spice.div(game.total_unstable_spice).div(10))
            .pow(game.atomic_spice.log(10) * 0.0003333 + 1)
            .floor()
    } else if (game.collapse_complete[1] >= 1) {
        game.free_deity = Decimal.max(
            game.unstable_boost
                .pow(((1 + game.collapse_complete[1]) * reward_scaling) / 60000)
                .floor()
                .sub(1),
            0
        )
    } else {
        game.free_deity = new Decimal(0)
    }

    game.global_spice_boost = game.global_spice_boost.mul(game.unstable_boost)

    for (let i = 0; i < 6; i++) {
        if (
            game.ascend_challenge === 1 ||
            game.ascend_challenge === 6 ||
            game.collapse_challenge === 7 ||
            game.collapse_challenge === 12
        ) {
            game.total_red_spice_boost[i] = game.red_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    game.red_strengthener +
                        game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener
                ).pow(antispice_boosts)
            )
            game.total_yellow_spice_boost[i] = game.yellow_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener
                ).pow(antispice_boosts)
            )
            game.total_green_spice_boost[i] = game.green_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener
                ).pow(antispice_boosts)
            )
            game.total_blue_spice_boost[i] = game.blue_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    game.blue_strengthener + game.pink_strengthener
                ).pow(antispice_boosts)
            )
            game.total_pink_spice_boost[i] = game.pink_spice_boost[i].mul(
                Decimal.pow(2, game.pink_strengthener).pow(antispice_boosts)
            )
        } else {
            game.total_red_spice_boost[i] = game.red_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    (game.red_strengthener +
                        game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener) *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_yellow_spice_boost[i] = game.yellow_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    (game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener) *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_green_spice_boost[i] = game.green_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    (game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener) *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_blue_spice_boost[i] = game.blue_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    (game.blue_strengthener + game.pink_strengthener) *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_pink_spice_boost[i] = game.pink_spice_boost[i].mul(
                Decimal.pow(
                    2 +
                        0.2 * game.prestige_bought[2] +
                        2 * (game.ascend_bought[2] + game.ascend_bought[14]),
                    game.pink_strengthener *
                        (1 + game.ascend_bought[11]) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )

            if (game.prestige_bought[18] >= 1) {
                game.total_red_spice_boost[i] = game.red_spice_boost[i].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        (game.red_strengthener +
                            game.yellow_strengthener +
                            game.green_strengthener +
                            game.blue_strengthener +
                            game.pink_strengthener) *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
                game.total_yellow_spice_boost[i] = game.yellow_spice_boost[
                    i
                ].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        (game.yellow_strengthener +
                            game.green_strengthener +
                            game.blue_strengthener +
                            game.pink_strengthener) *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
                game.total_green_spice_boost[i] = game.green_spice_boost[i].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        (game.green_strengthener +
                            game.blue_strengthener +
                            game.pink_strengthener) *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
                game.total_blue_spice_boost[i] = game.blue_spice_boost[i].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        (game.blue_strengthener + game.pink_strengthener) *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
                game.total_pink_spice_boost[i] = game.pink_spice_boost[i].mul(
                    Decimal.pow(
                        6 +
                            2 *
                                (game.ascend_bought[2] +
                                    game.ascend_bought[14]),
                        game.pink_strengthener *
                            (1 + game.ascend_bought[11]) *
                            (1 +
                                2 *
                                    game.ascend_complete[2] *
                                    game.ascend_bought[24])
                    ).pow(antispice_boosts)
                )
            }
        }

        game.total_red_spice_boost[i] = game.total_red_spice_boost[i].mul(
            game.global_spice_boost
        )

        if (
            game.prestige_bought[5] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
            game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    1 + 0.2 * game.prestige_bought[5],
                    game.red_strengthener
                ).mul(game.global_spice_boost)
            )
            game.total_green_spice_boost[i] = game.total_green_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    1 + 0.2 * game.prestige_bought[5],
                    game.yellow_strengthener
                ).mul(game.global_spice_boost)
            )
            game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].mul(
                Decimal.pow(
                    1 + 0.2 * game.prestige_bought[5],
                    game.green_strengthener
                ).mul(game.global_spice_boost)
            )
            game.total_pink_spice_boost[i] = game.total_pink_spice_boost[i]
                .mul(
                    Decimal.pow(
                        1 + 0.2 * game.prestige_bought[5],
                        game.blue_strengthener
                    )
                )
                .mul(game.global_spice_boost)
        } else {
            game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[
                i
            ].mul(
                Decimal.pow(1.05, game.red_strengthener).mul(
                    game.global_spice_boost
                )
            )
            game.total_green_spice_boost[i] = game.total_green_spice_boost[
                i
            ].mul(
                Decimal.pow(1.05, game.yellow_strengthener).mul(
                    game.global_spice_boost
                )
            )
            game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].mul(
                Decimal.pow(1.05, game.green_strengthener).mul(
                    game.global_spice_boost
                )
            )
            game.total_pink_spice_boost[i] = game.total_pink_spice_boost[i]
                .mul(Decimal.pow(1.05, game.blue_strengthener))
                .mul(game.global_spice_boost)
        }

        game.total_crystal_spice_boost[i] = game.crystal_spice_boost[i].mul(
            Decimal.pow(4, game.crystal_strengthener).pow(antispice_boosts)
        )

        if (
            game.prestige_bought[8] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
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
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0075

                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(
                    game.highest_yellow_spice
                        .pow(0.075)
                        .add(1)
                        .pow(antispice_power)
                )
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        game.highest_green_spice
                            .pow(0.075)
                            .add(1)
                            .pow(antispice_power)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(
                    game.highest_blue_spice
                        .pow(0.075)
                        .add(1)
                        .pow(antispice_power)
                )
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(
                    game.highest_pink_spice
                        .pow(0.075)
                        .add(1)
                        .pow(antispice_power)
                )
            } else {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(game.highest_yellow_spice.pow(0.075).add(1))
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        game.highest_green_spice.pow(0.075).add(1)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(game.highest_blue_spice.pow(0.075).add(1))
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(game.highest_pink_spice.pow(0.075).add(1))
            }
        }

        if (
            game.prestige_bought[11] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
            let effective_red_spice = game.highest_red_spice
            if (game.highest_red_spice.cmp(Decimal.pow(10, 10 ** 12)) >= 0)
                effective_red_spice = Decimal.pow(
                    10,
                    10 ** 12 *
                        (game.highest_red_spice.log(10) / 10 ** 12) ** 0.5
                )

            if (game.ascend_bought[0]) {
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
                    let antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.015
                    if (game.collapse_challenge !== 0)
                        antispice_power =
                            1 + antispice_amount.log(10) ** (2 / 3) * 0.0075

                    game.total_yellow_spice_boost[i] =
                        game.total_yellow_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.0075)
                                .add(1)
                                .pow(antispice_power)
                        )
                    game.total_green_spice_boost[i] =
                        game.total_green_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.0075)
                                .add(1)
                                .pow(antispice_power)
                        )
                    game.total_blue_spice_boost[i] =
                        game.total_blue_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.0075)
                                .add(1)
                                .pow(antispice_power)
                        )
                    game.total_pink_spice_boost[i] =
                        game.total_pink_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.0075)
                                .add(1)
                                .pow(antispice_power)
                        )
                } else {
                    game.total_yellow_spice_boost[i] =
                        game.total_yellow_spice_boost[i].mul(
                            effective_red_spice.pow(0.0075).add(1)
                        )
                    game.total_green_spice_boost[i] =
                        game.total_green_spice_boost[i].mul(
                            effective_red_spice.pow(0.0075).add(1)
                        )
                    game.total_blue_spice_boost[i] =
                        game.total_blue_spice_boost[i].mul(
                            effective_red_spice.pow(0.0075).add(1)
                        )
                    game.total_pink_spice_boost[i] =
                        game.total_pink_spice_boost[i].mul(
                            effective_red_spice.pow(0.0075).add(1)
                        )
                }
            } else {
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        effective_red_spice.pow(0.005).add(1)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(effective_red_spice.pow(0.005).add(1))
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(effective_red_spice.pow(0.005).add(1))
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(effective_red_spice.pow(0.005).add(1))
            }
        }

        if (
            game.prestige_bought[14] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
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
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0075

                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(
                    game.highest_crystal_spice
                        .pow(3)
                        .add(1)
                        .pow(antispice_power)
                )
            } else {
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(game.highest_crystal_spice.pow(3).add(1))
            }
        }

        if (
            game.prestige_bought[16] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
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
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0075

                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(
                    game.highest_crystal_spice
                        .pow(12)
                        .add(1)
                        .pow(antispice_power)
                )
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        game.highest_crystal_spice
                            .pow(12)
                            .add(1)
                            .pow(antispice_power)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(
                    game.highest_crystal_spice
                        .pow(12)
                        .add(1)
                        .pow(antispice_power)
                )
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(
                    game.highest_crystal_spice
                        .pow(12)
                        .add(1)
                        .pow(antispice_power)
                )
            } else {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(game.highest_crystal_spice.pow(12).add(1))
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        game.highest_crystal_spice.pow(12).add(1)
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(game.highest_crystal_spice.pow(12).add(1))
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(game.highest_crystal_spice.pow(12).add(1))
            }
        }

        if (
            game.prestige_bought[17] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(Decimal.pow(1.0135, game.color_boosts))
        }

        if (
            game.prestige_bought[19] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
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
                )
            )
        }

        if (
            game.prestige_bought[21] >= 1 &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
                game.rainbow_spice
                    .div(Decimal.pow(2, 292.5))
                    .pow(4 / 3)
                    .add(1)
            )
        }

        game.total_red_spice_boost[i] = game.total_red_spice_boost[i].mul(
            game.rune_boost[0]
        )
        game.total_yellow_spice_boost[i] = game.total_yellow_spice_boost[i].mul(
            game.rune_boost[1]
        )
        game.total_green_spice_boost[i] = game.total_green_spice_boost[i].mul(
            game.rune_boost[1]
        )
        game.total_blue_spice_boost[i] = game.total_blue_spice_boost[i].mul(
            game.rune_boost[1]
        )
        game.total_pink_spice_boost[i] = game.total_pink_spice_boost[i].mul(
            game.rune_boost[2]
        )

        if (
            game.ascend_bought[13] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
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
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0075

                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_pink_spice
                            .pow(0.00008)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_pink_spice.pow(0.00008).add(1)
                    )
            }
        }

        if (game.ascend_challenge !== 5 && game.collapse_challenge !== 7)
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    4,
                    (
                        game.arcane_enchantment + game.free_enchantment
                    ).toString() *
                        100 *
                        antispice_infusions
                )
            )

        if (
            game.ascend_bought[18] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
            let effective_red_spice = game.highest_red_spice
            if (game.highest_red_spice.cmp(Decimal.pow(10, 10 ** 12)) >= 0)
                effective_red_spice = Decimal.pow(
                    10,
                    10 ** 12 *
                        (game.highest_red_spice.log(10) / 10 ** 12) ** 0.5
                )

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
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0075

                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_red_spice
                            .pow(0.00004)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_red_spice.pow(0.00004).add(1)
                    )
            }
        }

        if (game.arcane_strengthener >= 1)
            game.total_arcane_spice_boost[i] = game.arcane_spice_boost[i].mul(
                Decimal.pow(
                    3,
                    (game.arcane_strengthener *
                        (game.arcane_strengthener + 1)) /
                        2 +
                        1
                ).pow(antispice_boosts)
            )
        else game.total_arcane_spice_boost[i] = game.arcane_spice_boost[i]

        if (
            game.ascend_bought[19] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
            if (game.ansuz >= 2.5 * 10 ** 11) {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(
                            game.ansuz / (2.5 * 10 ** 11),
                            2 + 5 * Math.log10(game.ansuz / (2.5 * 10 ** 11))
                        )
                            .mul(4999)
                            .add(1)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(game.ansuz / (2.5 * 10 ** 11), 2)
                            .mul(4999)
                            .add(1)
                    )
            }
        }

        if (
            game.ascend_bought[22] &&
            game.ascend_challenge !== 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
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
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0075

                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        game.highest_arcane_spice
                            .pow(10)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        game.highest_arcane_spice.pow(10).add(1)
                    )
            }
        }

        if (game.ascend_challenge === 2) {
            game.total_crystal_spice_boost[i] = new Decimal(0)
            game.total_arcane_spice_boost[i] = new Decimal(0)
        }

        if (
            game.ascend_bought[29] &&
            game.ascend_challenge !== 5 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
            game.total_arcane_spice_boost[i] = game.total_arcane_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    4 / 3,
                    (
                        game.arcane_enchantment + game.free_enchantment
                    ).toString() * antispice_infusions
                )
            )
        }

        if (
            game.ascend_bought[30] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
            let effective_red_spice = game.highest_red_spice
            if (game.highest_red_spice.cmp(Decimal.pow(10, 10 ** 12)) >= 0)
                effective_red_spice = Decimal.pow(
                    10,
                    10 ** 12 *
                        (game.highest_red_spice.log(10) / 10 ** 12) ** 0.5
                )

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
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0075

                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        effective_red_spice
                            .pow(0.00000025)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        effective_red_spice.pow(0.00000025).add(1)
                    )
            }
        }

        if (
            game.ascend_bought[31] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 7 &&
            game.collapse_challenge !== 12
        ) {
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
                let antispice_power =
                    1 + antispice_amount.log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0075

                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        game.highest_arcane_spice
                            .pow(0.0175)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        game.highest_arcane_spice.pow(0.0175).add(1)
                    )
            }
        }

        if (game.research_complete[2] >= 1 && game.collapse_challenge !== 12) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(game.unstable_boost.pow(0.009))
        }

        if (game.research_complete[9] >= 1 && game.collapse_challenge !== 12) {
            game.total_arcane_spice_boost[i] = game.total_arcane_spice_boost[
                i
            ].mul(game.unstable_boost.pow(0.000012))
        }

        if (game.antispice[0].cmp(1) >= 0) {
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
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 26250).add(1)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 52500).add(1)
                    )
            }
        }

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
            if (game.collapse_challenge !== 0) {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 2.625 * 10 ** 9).add(1))
            } else {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 5.25 * 10 ** 9).add(1))
            }
        }

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
            if (game.collapse_challenge !== 0) {
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 3.375 * 10 ** 9).add(1)
                    )
            } else {
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 6.75 * 10 ** 9).add(1)
                    )
            }
        }

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
            if (game.collapse_challenge !== 0) {
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 4.5 * 10 ** 9).add(1))
            } else {
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 9 * 10 ** 9).add(1))
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
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 6 * 10 ** 9).add(1))
            } else {
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 1.2 * 10 ** 10).add(1))
            }
        }

        if (game.antispice[5].cmp(1) >= 0) {
            let antispice_amount = game.antispice[5]
            if (antispice_amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                antispice_amount = antispice_amount
                    .div(Decimal.pow(10, 7.5))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 7.5))
            if (game.collapse_challenge !== 0) {
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 9 * 10 ** 9).add(1))
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 4.5 * 10 ** 8).add(1)
                    )
            } else {
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(Decimal.pow(antispice_amount, 1.8 * 10 ** 10).add(1))
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        Decimal.pow(antispice_amount, 9 * 10 ** 8).add(1)
                    )
            }
        }

        if (game.collapse_complete[0] >= 1 && game.collapse_challenge !== 7) {
            if (game.collapse_complete[0] >= 12) {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].pow(
                    1 +
                        (0.12 + game.collapse_complete[0] * 0.015) *
                            reward_scaling
                )
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].pow(
                        1 +
                            (0.12 + game.collapse_complete[0] * 0.015) *
                                reward_scaling
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].pow(
                    1 +
                        (0.12 + game.collapse_complete[0] * 0.015) *
                            reward_scaling
                )
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].pow(
                    1 +
                        (0.12 + game.collapse_complete[0] * 0.015) *
                            reward_scaling
                )
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].pow(
                    1 +
                        (0.12 + game.collapse_complete[0] * 0.015) *
                            reward_scaling
                )
            } else {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].pow(1 + game.collapse_complete[0] * 0.025 * reward_scaling)
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].pow(
                        1 + game.collapse_complete[0] * 0.025 * reward_scaling
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].pow(1 + game.collapse_complete[0] * 0.025 * reward_scaling)
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].pow(1 + game.collapse_complete[0] * 0.025 * reward_scaling)
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].pow(1 + game.collapse_complete[0] * 0.025 * reward_scaling)
            }
        }

        if (game.ascend_challenge === 5 || game.collapse_challenge === 7) {
            if (game.ascend_challenge_timer >= 1) {
                game.total_red_spice_boost[i] = new Decimal(0)
                game.total_yellow_spice_boost[i] = new Decimal(0)
                game.total_green_spice_boost[i] = new Decimal(0)
                game.total_blue_spice_boost[i] = new Decimal(0)
                game.total_pink_spice_boost[i] = new Decimal(0)
                game.total_crystal_spice_boost[i] = new Decimal(0)
            } else if (game.ascend_challenge_timer >= 0.5) {
                let debuff = (2 - game.ascend_challenge_timer * 2) ** 0.01

                game.total_red_spice_boost[i] =
                    game.total_red_spice_boost[i].pow(debuff)
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].pow(debuff)
                game.total_green_spice_boost[i] =
                    game.total_green_spice_boost[i].pow(debuff)
                game.total_blue_spice_boost[i] =
                    game.total_blue_spice_boost[i].pow(debuff)
                game.total_pink_spice_boost[i] =
                    game.total_pink_spice_boost[i].pow(debuff)
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].pow(debuff)
            }
        }
    }

    if (
        game.prestige_bought[23] >= 1 &&
        game.ascend_challenge !== 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7 &&
        game.collapse_challenge !== 12
    ) {
        if (game.ascend_complete[1] && game.ascend_bought[20]) {
            game.total_crystal_spice_boost[0] =
                game.total_crystal_spice_boost[0].pow(1.375)
            game.total_crystal_spice_boost[1] =
                game.total_crystal_spice_boost[1].pow(1.3)
            game.total_crystal_spice_boost[2] =
                game.total_crystal_spice_boost[2].pow(1.225)
            game.total_crystal_spice_boost[3] =
                game.total_crystal_spice_boost[3].pow(1.15)
            game.total_crystal_spice_boost[4] =
                game.total_crystal_spice_boost[4].pow(1.075)
        } else {
            game.total_crystal_spice_boost[0] =
                game.total_crystal_spice_boost[0].pow(1.25)
            if (game.ascend_bought[4]) {
                game.total_crystal_spice_boost[1] =
                    game.total_crystal_spice_boost[1].pow(1.2)
                game.total_crystal_spice_boost[2] =
                    game.total_crystal_spice_boost[2].pow(1.15)
                game.total_crystal_spice_boost[3] =
                    game.total_crystal_spice_boost[3].pow(1.1)
                game.total_crystal_spice_boost[4] =
                    game.total_crystal_spice_boost[4].pow(1.05)
            }
        }
    }

    if (
        game.ascend_complete[3] &&
        game.ascend_bought[27] &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 7 &&
        game.collapse_challenge !== 12
    ) {
        for (let i = 0; i < 3; i++) {
            game.total_red_spice_boost[i + 3] = game.total_red_spice_boost[
                i + 3
            ].pow(1.125 + i * 0.125)
            game.total_yellow_spice_boost[i + 3] =
                game.total_yellow_spice_boost[i + 3].pow(1.125 + i * 0.125)
            game.total_green_spice_boost[i + 3] = game.total_green_spice_boost[
                i + 3
            ].pow(1.125 + i * 0.125)
            game.total_blue_spice_boost[i + 3] = game.total_blue_spice_boost[
                i + 3
            ].pow(1.125 + i * 0.125)
            game.total_pink_spice_boost[i + 3] = game.total_pink_spice_boost[
                i + 3
            ].pow(1.125 + i * 0.125)
            game.total_crystal_spice_boost[i + 3] =
                game.total_crystal_spice_boost[i + 3].pow(1.125 + i * 0.125)
            game.total_arcane_spice_boost[i + 3] =
                game.total_arcane_spice_boost[i + 3].pow(1.125 + i * 0.125)
        }
    }

    for (let i = 0; i < 6; i++) {
        let antispice_amount = game.antispice[i]

        switch (i) {
            case 0:
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
                break
            case 1:
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
                break
            case 2:
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
                break
            case 3:
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
                break
            case 4:
                if (antispice_amount.cmp(new Decimal(20000)) >= 0)
                    antispice_amount = antispice_amount
                        .div(new Decimal(20000))
                        .pow(0.5)
                        .mul(new Decimal(20000))
                if (
                    antispice_amount.cmp(
                        Decimal.pow(10, 11).mul(2 * 5 ** 0.5)
                    ) >= 0
                )
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                break
            case 5:
                if (antispice_amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 7.5))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 7.5))
                break
        }

        if (game.collapse_challenge !== 0) {
            if (game.antispice[i].cmp(1) >= 0) {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.0225)
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0225
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.0225)
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.0225)
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.0225)
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0225
                    )
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.0225
                    )
            }
        } else {
            if (game.antispice[i].cmp(1) >= 0) {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.045)
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.045
                    )
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.045)
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.045)
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].pow(1 + antispice_amount.log(10) ** (2 / 3) * 0.045)
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.045
                    )
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].pow(
                        1 + antispice_amount.log(10) ** (2 / 3) * 0.045
                    )
            }
        }

        if (game.antispice_bought[6]) {
            game.total_red_spice_boost[i] =
                game.total_red_spice_boost[i].pow(1.012)
            game.total_yellow_spice_boost[i] =
                game.total_yellow_spice_boost[i].pow(1.012)
            game.total_green_spice_boost[i] =
                game.total_green_spice_boost[i].pow(1.012)
            game.total_blue_spice_boost[i] =
                game.total_blue_spice_boost[i].pow(1.012)
            game.total_pink_spice_boost[i] =
                game.total_pink_spice_boost[i].pow(1.012)
            game.total_crystal_spice_boost[i] =
                game.total_crystal_spice_boost[i].pow(1.012)
            game.total_arcane_spice_boost[i] =
                game.total_arcane_spice_boost[i].pow(1.012)
        }

        game.total_red_spice_boost[i] = Decimal.max(
            game.total_red_spice_boost[i],
            0
        )
        game.total_yellow_spice_boost[i] = Decimal.max(
            game.total_yellow_spice_boost[i],
            0
        )
        game.total_green_spice_boost[i] = Decimal.max(
            game.total_green_spice_boost[i],
            0
        )
        game.total_blue_spice_boost[i] = Decimal.max(
            game.total_blue_spice_boost[i],
            0
        )
        game.total_pink_spice_boost[i] = Decimal.max(
            game.total_pink_spice_boost[i],
            0
        )
        game.total_crystal_spice_boost[i] = Decimal.max(
            game.total_crystal_spice_boost[i],
            0
        )
        game.total_arcane_spice_boost[i] = Decimal.max(
            game.total_arcane_spice_boost[i],
            0
        )

        if (game.collapse_challenge === 12) {
            game.total_red_spice_boost[i] = new Decimal(0)
            game.total_yellow_spice_boost[i] = new Decimal(0)
            game.total_green_spice_boost[i] = new Decimal(0)
            game.total_blue_spice_boost[i] = new Decimal(0)
        }
    }

    if (
        game.total_red_spice_boost[0]
            .mul(game.total_red_spice_boost[1])
            .mul(game.total_red_spice_boost[2])
            .mul(game.total_red_spice_boost[3])
            .mul(game.total_red_spice_boost[4])
            .mul(game.total_red_spice_boost[5])
            .mul(game.red_spice_gen[5])
            .cmp(game.realm_limit) >= 0 &&
        !game.limit_active
    ) {
        game.limit_active = true

        for (let i = 0; i < 6; i++) {
            game.red_limit[i] = game.total_red_spice_boost[i]
            game.yellow_limit[i] = game.total_yellow_spice_boost[i]
            game.green_limit[i] = game.total_green_spice_boost[i]
            game.blue_limit[i] = game.total_blue_spice_boost[i]
            game.pink_limit[i] = game.total_pink_spice_boost[i]
            game.crystal_limit[i] = game.total_crystal_spice_boost[i]
            game.arcane_limit[i] = game.total_arcane_spice_boost[i]
        }
    }

    if (game.limit_active) {
        for (let i = 0; i < 6; i++) {
            if (game.total_red_spice_boost[i].cmp(game.red_limit[i]) >= 0) {
                game.total_red_spice_boost[i] = Decimal.pow(
                    10,
                    (game.total_red_spice_boost[i].log(10) /
                        game.red_limit[i].log(10)) **
                        0.5 *
                        game.red_limit[i].log(10)
                )
            }
            if (
                game.total_yellow_spice_boost[i].cmp(game.yellow_limit[i]) >= 0
            ) {
                game.total_yellow_spice_boost[i] = Decimal.pow(
                    10,
                    (game.total_yellow_spice_boost[i].log(10) /
                        game.yellow_limit[i].log(10)) **
                        0.5 *
                        game.yellow_limit[i].log(10)
                )
            }
            if (game.total_green_spice_boost[i].cmp(game.green_limit[i]) >= 0) {
                game.total_green_spice_boost[i] = Decimal.pow(
                    10,
                    (game.total_green_spice_boost[i].log(10) /
                        game.green_limit[i].log(10)) **
                        0.5 *
                        game.green_limit[i].log(10)
                )
            }
            if (game.total_blue_spice_boost[i].cmp(game.blue_limit[i]) >= 0) {
                game.total_blue_spice_boost[i] = Decimal.pow(
                    10,
                    (game.total_blue_spice_boost[i].log(10) /
                        game.blue_limit[i].log(10)) **
                        0.5 *
                        game.blue_limit[i].log(10)
                )
            }
            if (game.total_pink_spice_boost[i].cmp(game.pink_limit[i]) >= 0) {
                game.total_pink_spice_boost[i] = Decimal.pow(
                    10,
                    (game.total_pink_spice_boost[i].log(10) /
                        game.pink_limit[i].log(10)) **
                        0.5 *
                        game.pink_limit[i].log(10)
                )
            }
            if (
                game.total_crystal_spice_boost[i].cmp(game.crystal_limit[i]) >=
                0
            ) {
                game.total_crystal_spice_boost[i] = Decimal.pow(
                    10,
                    (game.total_crystal_spice_boost[i].log(10) /
                        game.crystal_limit[i].log(10)) **
                        0.5 *
                        game.crystal_limit[i].log(10)
                )
            }
            if (
                game.total_arcane_spice_boost[i].cmp(game.arcane_limit[i]) >= 0
            ) {
                game.total_arcane_spice_boost[i] = Decimal.pow(
                    10,
                    (game.total_arcane_spice_boost[i].log(10) /
                        game.arcane_limit[i].log(10)) **
                        0.5 *
                        game.arcane_limit[i].log(10)
                )
            }
        }
    }

    game.red_spice = game.red_spice.add(
        game.red_spice_gen[0]
            .floor()
            .mul(game.total_red_spice_boost[0])
            .div(delta_time)
    )
    game.yellow_spice = game.yellow_spice.add(
        game.yellow_spice_gen[0]
            .floor()
            .mul(game.total_yellow_spice_boost[0])
            .div(delta_time)
    )
    game.green_spice = game.green_spice.add(
        game.green_spice_gen[0]
            .floor()
            .mul(game.total_green_spice_boost[0])
            .div(delta_time)
    )
    game.blue_spice = game.blue_spice.add(
        game.blue_spice_gen[0]
            .floor()
            .mul(game.total_blue_spice_boost[0])
            .div(delta_time)
    )
    game.pink_spice = game.pink_spice.add(
        game.pink_spice_gen[0]
            .floor()
            .mul(game.total_pink_spice_boost[0])
            .div(delta_time)
    )

    game.crystal_spice = game.crystal_spice.add(
        game.crystal_spice_gen[0]
            .floor()
            .mul(game.total_crystal_spice_boost[0])
            .mul(3)
            .div(delta_time)
    )
    if (game.prestige_bought[24] >= 1 && game.ascend_challenge !== 2) {
        game.pink_spice_gen[5] = game.pink_spice_gen[5].add(
            game.crystal_spice_gen[0].floor().pow(2).div(delta_time)
        )
    }

    if (game.red_spice.cmp(game.highest_red_spice) === 1)
        game.highest_red_spice = game.red_spice
    if (game.yellow_spice.cmp(game.highest_yellow_spice) === 1)
        game.highest_yellow_spice = game.yellow_spice
    if (game.green_spice.cmp(game.highest_green_spice) === 1)
        game.highest_green_spice = game.green_spice
    if (game.blue_spice.cmp(game.highest_blue_spice) === 1)
        game.highest_blue_spice = game.blue_spice
    if (game.pink_spice.cmp(game.highest_pink_spice) === 1)
        game.highest_pink_spice = game.pink_spice
    if (game.crystal_spice.cmp(game.highest_crystal_spice) === 1)
        game.highest_crystal_spice = game.crystal_spice

    game.antitotal_spice[1] = game.antitotal_spice[1].add(
        game.red_spice_gen[0]
            .floor()
            .mul(game.total_red_spice_boost[0])
            .div(delta_time)
    )
    game.antitotal_spice[2] = game.antitotal_spice[2].add(
        game.yellow_spice_gen[0]
            .floor()
            .mul(game.total_yellow_spice_boost[0])
            .div(delta_time)
    )
    game.antitotal_spice[3] = game.antitotal_spice[3].add(
        game.green_spice_gen[0]
            .floor()
            .mul(game.total_green_spice_boost[0])
            .div(delta_time)
    )
    game.antitotal_spice[4] = game.antitotal_spice[4].add(
        game.blue_spice_gen[0]
            .floor()
            .mul(game.total_blue_spice_boost[0])
            .div(delta_time)
    )
    game.antitotal_spice[5] = game.antitotal_spice[5].add(
        game.pink_spice_gen[0]
            .floor()
            .mul(game.total_pink_spice_boost[0])
            .div(delta_time)
    )

    if (game.ascend_complete[0] && game.ascend_bought[16]) {
        game.arcane_spice = game.arcane_spice.add(
            game.arcane_spice_gen[0]
                .floor()
                .mul(game.total_arcane_spice_boost[0])
                .mul(5)
                .div(delta_time)
        )
        if (game.ascend_bought[32] && game.ascend_challenge !== 2) {
            game.crystal_spice_gen[5] = game.crystal_spice_gen[5].add(
                game.arcane_spice_gen[0].floor().pow(60).div(delta_time)
            )
        }

        if (game.arcane_spice.cmp(game.highest_arcane_spice) === 1)
            game.highest_arcane_spice = game.arcane_spice

        game.total_spice = game.total_spice.add(
            game.red_spice_gen[0]
                .floor()
                .mul(game.total_red_spice_boost[0])
                .add(
                    game.yellow_spice_gen[0]
                        .floor()
                        .mul(game.total_yellow_spice_boost[0])
                )
                .add(
                    game.green_spice_gen[0]
                        .floor()
                        .mul(game.total_green_spice_boost[0])
                )
                .add(
                    game.blue_spice_gen[0]
                        .floor()
                        .mul(game.total_blue_spice_boost[0])
                )
                .add(
                    game.pink_spice_gen[0]
                        .floor()
                        .mul(game.total_pink_spice_boost[0])
                )
                .add(
                    game.crystal_spice_gen[0]
                        .floor()
                        .mul(game.total_crystal_spice_boost[0])
                        .mul(3)
                )
                .add(
                    game.arcane_spice_gen[0]
                        .floor()
                        .mul(game.total_arcane_spice_boost[0])
                        .div(200)
                )
                .div(delta_time)
        )

        game.collapse_spice = game.collapse_spice.add(
            game.red_spice_gen[0]
                .floor()
                .mul(game.total_red_spice_boost[0])
                .add(
                    game.yellow_spice_gen[0]
                        .floor()
                        .mul(game.total_yellow_spice_boost[0])
                )
                .add(
                    game.green_spice_gen[0]
                        .floor()
                        .mul(game.total_green_spice_boost[0])
                )
                .add(
                    game.blue_spice_gen[0]
                        .floor()
                        .mul(game.total_blue_spice_boost[0])
                )
                .add(
                    game.pink_spice_gen[0]
                        .floor()
                        .mul(game.total_pink_spice_boost[0])
                )
                .add(
                    game.crystal_spice_gen[0]
                        .floor()
                        .mul(game.total_crystal_spice_boost[0])
                        .mul(3)
                )
                .add(
                    game.arcane_spice_gen[0]
                        .floor()
                        .mul(game.total_arcane_spice_boost[0])
                        .div(200)
                )
                .div(delta_time)
        )
    } else {
        game.total_spice = game.total_spice.add(
            game.red_spice_gen[0]
                .floor()
                .mul(game.total_red_spice_boost[0])
                .add(
                    game.yellow_spice_gen[0]
                        .floor()
                        .mul(game.total_yellow_spice_boost[0])
                )
                .add(
                    game.green_spice_gen[0]
                        .floor()
                        .mul(game.total_green_spice_boost[0])
                )
                .add(
                    game.blue_spice_gen[0]
                        .floor()
                        .mul(game.total_blue_spice_boost[0])
                )
                .add(
                    game.pink_spice_gen[0]
                        .floor()
                        .mul(game.total_pink_spice_boost[0])
                )
                .add(
                    game.crystal_spice_gen[0]
                        .floor()
                        .mul(game.total_crystal_spice_boost[0])
                        .mul(3)
                )
                .div(delta_time)
        )

        game.collapse_spice = game.collapse_spice.add(
            game.red_spice_gen[0]
                .floor()
                .mul(game.total_red_spice_boost[0])
                .add(
                    game.yellow_spice_gen[0]
                        .floor()
                        .mul(game.total_yellow_spice_boost[0])
                )
                .add(
                    game.green_spice_gen[0]
                        .floor()
                        .mul(game.total_green_spice_boost[0])
                )
                .add(
                    game.blue_spice_gen[0]
                        .floor()
                        .mul(game.total_blue_spice_boost[0])
                )
                .add(
                    game.pink_spice_gen[0]
                        .floor()
                        .mul(game.total_pink_spice_boost[0])
                )
                .add(
                    game.crystal_spice_gen[0]
                        .floor()
                        .mul(game.total_crystal_spice_boost[0])
                        .mul(3)
                )
                .div(delta_time)
        )
    }

    if (game.ascend_challenge === 4 || game.collapse_challenge === 7) {
        for (let i = 3; i < 6; i++) {
            game.total_red_spice_boost[i] = new Decimal(0)
            game.total_yellow_spice_boost[i] = new Decimal(0)
            game.total_green_spice_boost[i] = new Decimal(0)
            game.total_blue_spice_boost[i] = new Decimal(0)
            game.total_pink_spice_boost[i] = new Decimal(0)
            game.total_crystal_spice_boost[i] = new Decimal(0)
            game.total_arcane_spice_boost[i] = new Decimal(0)
        }
    }

    for (let i = 0; i < 5; i++) {
        if (i === 4 && game.collapse_challenge === 8) {
            game.red_spice_gen[i] = game.red_spice_gen[i].add(
                game.red_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_red_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(
                game.yellow_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_yellow_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.green_spice_gen[i] = game.green_spice_gen[i].add(
                game.green_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_green_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.blue_spice_gen[i] = game.blue_spice_gen[i].add(
                game.blue_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_blue_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.pink_spice_gen[i] = game.pink_spice_gen[i].add(
                game.pink_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_pink_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(
                game.crystal_spice_gen[i + 1]
                    .add(game.free_deity)
                    .floor()
                    .mul(game.total_crystal_spice_boost[i + 1])
                    .mul(3)
                    .div(delta_time)
            )
        } else {
            game.red_spice_gen[i] = game.red_spice_gen[i].add(
                game.red_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_red_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(
                game.yellow_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_yellow_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.green_spice_gen[i] = game.green_spice_gen[i].add(
                game.green_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_green_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.blue_spice_gen[i] = game.blue_spice_gen[i].add(
                game.blue_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_blue_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.pink_spice_gen[i] = game.pink_spice_gen[i].add(
                game.pink_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_pink_spice_boost[i + 1])
                    .div(delta_time * (i + 2))
            )
            game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(
                game.crystal_spice_gen[i + 1]
                    .floor()
                    .mul(game.total_crystal_spice_boost[i + 1])
                    .mul(3)
                    .div(delta_time)
            )
        }
        if (game.ascend_complete[0] && game.ascend_bought[16]) {
            if (i === 4) {
                game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(
                    game.arcane_spice_gen[i + 1]
                        .floor()
                        .add(game.free_deity)
                        .mul(game.total_arcane_spice_boost[i + 1])
                        .mul(5)
                        .div(delta_time)
                )
            } else {
                game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(
                    game.arcane_spice_gen[i + 1]
                        .floor()
                        .mul(game.total_arcane_spice_boost[i + 1])
                        .mul(5)
                        .div(delta_time)
                )
            }
        }
    }

    if (game.prestige_bought[10] >= 1) {
        game.red_spice_gen[5] = game.red_spice_gen[5].add(
            game.yellow_spice_gen[0].floor().pow(0.1).div(delta_time)
        )
        game.yellow_spice_gen[5] = game.yellow_spice_gen[5].add(
            game.green_spice_gen[0].floor().pow(0.1).div(delta_time)
        )
        game.green_spice_gen[5] = game.green_spice_gen[5].add(
            game.blue_spice_gen[0].floor().pow(0.1).div(delta_time)
        )
        game.blue_spice_gen[5] = game.blue_spice_gen[5].add(
            game.pink_spice_gen[0].floor().pow(0.1).div(delta_time)
        )
    }

    game.autopr_goal[0] = Number(
        document.getElementById("p_boosts_input").value
    )
    if (game.autopr_goal[0] === NaN) game.autopr_goal[0] = 10
    if (game.autopr_goal[0] < 10) game.autopr_goal[0] = 10

    let v = document.getElementById("p_spice_input").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autopr_goal[1] = new Decimal(v)
    else game.autopr_goal[1] = new Decimal(1)

    game.autopr_goal[2] = Number(document.getElementById("p_time_input").value)
    if (game.autopr_goal[2] === NaN) game.autopr_goal[2] = 30
    if (game.autopr_goal[2] < 0.01) game.autopr_goal[2] = 0.01

    game.autopr_delta[0] = Number(
        document.getElementById("p_boosts_input2").value
    )
    if (game.autopr_delta[0] === NaN) game.autopr_goal[0] = 0
    if (game.autopr_delta[0] < 0) game.autopr_goal[0] = 0

    v = document.getElementById("p_spice_input2").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autopr_delta[1] = new Decimal(v)
    else game.autopr_goal[1] = new Decimal(1)

    if (game.autopr_toggle && game.prestige_bought[15] >= 1) {
        switch (game.autopr_mode) {
            case 0:
                if (game.ascend_bought[9]) {
                    if (
                        game.color_boosts >=
                        game.autopr_goal[0] + game.autopr_goal2[0]
                    )
                        prestige()
                } else {
                    if (game.color_boosts >= game.autopr_goal[0]) prestige()
                }
                break
            case 1:
                let amount = 0
                if (game.color_boosts <= 16)
                    amount = new Decimal(2).pow((game.color_boosts - 10) / 3)
                else amount = new Decimal(2).pow((game.color_boosts - 8) / 4)
                if (
                    game.research_complete[31] >= 1 &&
                    game.collapse_challenge !== 12
                ) {
                    if (game.color_boosts >= game.augment_start) {
                        let augment_amount = new Decimal(2).pow(
                            (game.augment_start - 8) / 4
                        )
                        amount = amount
                            .div(augment_amount)
                            .pow(1.5)
                            .mul(augment_amount)
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
                            Decimal.pow(
                                2,
                                5 * (game.ascend - 7740) ** 0.5 + 262
                            )
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
                        antispice_amount.cmp(
                            Decimal.pow(10, 11).mul(2 * 5 ** 0.5)
                        ) >= 0
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

                if (game.ascend_bought[9]) {
                    if (
                        amount.cmp(
                            game.autopr_goal[1].mul(game.autopr_goal2[1])
                        ) >= 0
                    )
                        prestige()
                } else {
                    if (amount.cmp(game.autopr_goal[1]) >= 0) prestige()
                }
                break
            case 2:
                if (game.real_time_played[1] >= game.autopr_goal[2]) prestige()
                break
        }
    }

    if (game.autoup_toggle && game.ascend_bought[8]) {
        for (const u of prestige_upgrade.upgrades) {
            buy_prestige_upgrade(u.id, true)
        }
    }

    if (
        game.autocr_toggle &&
        game.ascend_bought[10] &&
        game.ascend_challenge !== 2
    )
        max_all("crystal")

    if (game.autoen_toggle && game.ascend_bought[17]) max_enchantment()

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

    for (let i = 0; i < 3; i++) {
        game.rune_power[i] += (game.rune[i] * rune_speed) / delta_time
        game.total_rune_power += (game.rune[i] * rune_speed) / delta_time
    }

    for (let i = 0; i < 3; i++) {
        let base = 2 ** (2 - 0.5 * i)
        let effective_rune_power = game.rune_power[i]
        if (effective_rune_power >= 1024 ** 36)
            effective_rune_power =
                (effective_rune_power / 1024 ** 36) ** 0.5 * 1024 ** 36
        let exponent = Math.floor(effective_rune_power)
        if (effective_rune_power >= 1024) {
            exponent =
                128 * (Math.floor(effective_rune_power) + 3072) ** 0.5 - 7168
        }
        if (effective_rune_power >= 1048576) {
            exponent =
                1024 * (Math.floor(effective_rune_power) - 982912) ** 0.25 +
                107704
        }
        if (effective_rune_power >= 1024 ** 4) {
            exponent =
                4096 *
                    (Math.floor(effective_rune_power) - 8.76543 * 10 ** 11) **
                        (1 / 6) +
                837321
        }
        if (effective_rune_power >= 1024 ** 8) {
            exponent =
                16384 *
                    (Math.floor(effective_rune_power) - 9.06304 * 10 ** 23) **
                        0.125 +
                29003079
        }
        if (effective_rune_power >= 2 ** 133) {
            exponent =
                2097152 *
                    (Math.floor(effective_rune_power) - 8.91911 * 10 ** 39) **
                        0.0625 +
                1.08579 * 10 ** 9
        }
        if (effective_rune_power >= 1024 ** 24) {
            exponent =
                67108864 *
                    (Math.floor(effective_rune_power) - 1.62243 * 10 ** 72) **
                        0.03125 +
                5.85717 * 10 ** 10
        }

        game.rune_boost[i] = Decimal.pow(base, exponent)

        if (game.ascend_bought[26])
            game.rune_boost[i] = Decimal.pow(base, exponent * 2)
        if (game.ascend_complete[4] && game.ascend_bought[28])
            game.rune_boost[i] = Decimal.pow(base, exponent * 4)
        if (game.ascend_bought[33])
            game.rune_boost[i] = Decimal.pow(base, exponent * 8)

        if (game.collapse_challenge !== 12) {
            if (
                game.research_complete[12] >= 1 &&
                game.research_complete[35] >= 1
            ) {
                game.rune_boost[i] = Decimal.pow(base, exponent * 3)

                if (game.ascend_bought[26])
                    game.rune_boost[i] = Decimal.pow(base, exponent * 6)
                if (game.ascend_complete[4] && game.ascend_bought[28])
                    game.rune_boost[i] = Decimal.pow(base, exponent * 12)
                if (game.ascend_bought[33])
                    game.rune_boost[i] = Decimal.pow(base, exponent * 24)
            } else {
                if (game.research_complete[35] >= 1) {
                    game.rune_boost[i] = Decimal.pow(base, exponent * 2)

                    if (game.ascend_bought[26])
                        game.rune_boost[i] = Decimal.pow(base, exponent * 4)
                    if (game.ascend_complete[4] && game.ascend_bought[28])
                        game.rune_boost[i] = Decimal.pow(base, exponent * 8)
                    if (game.ascend_bought[33])
                        game.rune_boost[i] = Decimal.pow(base, exponent * 16)
                }
                if (game.research_complete[12] >= 1) {
                    game.rune_boost[i] = Decimal.pow(base, exponent * 1.5)

                    if (game.ascend_bought[26])
                        game.rune_boost[i] = Decimal.pow(base, exponent * 3)
                    if (game.ascend_complete[4] && game.ascend_bought[28])
                        game.rune_boost[i] = Decimal.pow(base, exponent * 6)
                    if (game.ascend_bought[33])
                        game.rune_boost[i] = Decimal.pow(base, exponent * 12)
                }
            }
        }
    }

    if (game.ansuz >= 6 && !game.distribute_unlocked)
        game.distribute_unlocked = true
    if (game.ansuz >= 2.5 * 10 ** 11 && !game.half_distribute_unlocked)
        game.half_distribute_unlocked = true

    for (let i = 1; i < 6; i++) {
        if (!game.arcane_unlocked[i]) {
            if (game.arcane_spice_gen[i - 1].cmp(3) >= 0) {
                game.arcane_unlocked[i] = true
            }
        }
    }

    if (game.arcane_strengthener >= 1 && !game.arcane_max_unlocked) {
        game.arcane_max_unlocked = true
    }

    game.autoas_goal[0] = Number(document.getElementById("a_runes_input").value)
    if (game.autoas_goal[0] === NaN) game.autoas_goal[0] = 1
    if (game.autoas_goal[0] < 1) game.autoas_goal[0] = 1

    game.autoas_goal[1] = Number(document.getElementById("a_time_input").value)
    if (game.autoas_goal[1] === NaN) game.autoas_goal[1] = 30
    if (game.autoas_goal[1] < 0.01) game.autoas_goal[1] = 0.01

    if (
        game.ascend_bought[12] &&
        game.autoas_toggle &&
        game.ascend_challenge === 0
    ) {
        let stop = false
        if (
            game.autoco_toggle &&
            game.research_complete[15] >= 1 &&
            game.collapse_challenge === 0
        ) {
            if (game.autoco_mode === 0) {
                let amount = game.collapse_spice.pow(5 * 10 ** -10).floor()

                if (amount.cmp(Decimal.pow(10, 1800)) >= 0) {
                    amount = amount
                        .div(Decimal.pow(10, 200))
                        .pow(10 / ((amount.log(10) * 0.3 - 56) ** 0.5 - 2))
                        .mul(Decimal.pow(10, 200))

                    if (amount.cmp(Decimal.pow(10, 20000)) >= 0)
                        amount = Decimal.pow(
                            10,
                            20000 * (amount.log(10) / 20000) ** (2 / 3)
                        )
                } else if (amount.cmp(Decimal.pow(10, 200)) >= 0) {
                    amount = amount
                        .div(Decimal.pow(10, 200))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 200))
                }

                if (
                    game.research_complete[5] >= 1 &&
                    game.collapse_challenge === 0
                ) {
                    let rune_amount = Decimal.pow(
                        1.2,
                        (game.total_rune_power / 10 ** 28) ** 0.2
                    ).mul(game.total_rune_power ** 0.5 / (5 * 10 ** 12) + 1)
                    if (rune_amount.cmp(Decimal.pow(10, 50)) >= 0)
                        rune_amount = Decimal.pow(
                            10,
                            rune_amount.div(Decimal.pow(10, 50)).log(10) **
                                0.5 +
                                50
                        )
                    if (rune_amount.cmp(Decimal.pow(10, 100)) >= 0)
                        rune_amount = Decimal.pow(
                            10,
                            200 - 10000 / rune_amount.log(10)
                        )

                    amount = amount.mul(rune_amount)
                }

                let total_completions = 0
                for (let i = 0; i < 6; i++) {
                    total_completions += game.collapse_complete[i]
                }
                if (
                    game.research_complete[22] >= 1 &&
                    game.collapse_challenge === 0
                )
                    amount = amount.mul(Decimal.pow(888, total_completions))

                if (
                    amount.cmp(game.autoco_stop[0]) >= 0 &&
                    game.ascend_complete[5]
                )
                    stop = true
            } else if (game.autoco_mode === 1) {
                if (game.real_time_played[3] >= game.autoco_stop[1]) stop = true
            }
        }

        if (game.autoas_mode === 0) {
            if (game.rainbow_spice.cmp(0) === 1) {
                let amount = Math.floor(
                    (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8
                )
                if (
                    game.research_complete[10] >= 1 &&
                    game.collapse_challenge !== 12
                )
                    amount = Math.floor(
                        (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8 *
                            (Math.log2((game.collapse + 25) / 25) ** 2 * 6.27 +
                                1)
                    )

                if (game.antispice[4].cmp(1) >= 0) {
                    let antispice_amount = game.antispice[4]
                    if (antispice_amount.cmp(new Decimal(20000)) >= 0)
                        antispice_amount = antispice_amount
                            .div(new Decimal(20000))
                            .pow(0.5)
                            .mul(new Decimal(20000))
                    if (
                        antispice_amount.cmp(
                            Decimal.pow(10, 11).mul(2 * 5 ** 0.5)
                        ) >= 0
                    )
                        antispice_amount = antispice_amount
                            .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                            .pow(0.5)
                            .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))

                    if (game.collapse_challenge !== 0) {
                        amount =
                            amount **
                            (1 + antispice_amount.log(10) ** 0.75 * 0.0325)
                    } else {
                        amount =
                            amount **
                            (1 + antispice_amount.log(10) ** 0.75 * 0.065)
                    }
                }

                if (game.antispice_bought[2]) {
                    amount = amount ** 1.15
                }

                if (amount >= game.autoas_goal[0] && !stop) ascend()
            }
        } else if (game.autoas_mode === 1) {
            if (game.real_time_played[2] >= game.autoas_goal[1] && !stop)
                ascend()
        }
    }

    if (game.ascend_bought[25] && game.color_boosts >= 10) {
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

        game.rainbow_spice = game.rainbow_spice.add(amount.div(10 * delta_time))
        game.antitotal_spice[6] = game.antitotal_spice[6].add(
            amount.div(10 * delta_time)
        )
    }

    game.autods_portion[0] = Number(
        document.getElementById("au_portion_input").value / 100
    )
    if (game.research_complete[6] >= 1) {
        game.autods_portion[0] = Number(
            document.getElementById("au_portion_input2").value / 100
        )
    }
    game.autods_portion[1] = Number(
        document.getElementById("ar_portion_input").value / 100
    )
    game.autods_portion[2] = Number(
        document.getElementById("aa_portion_input").value / 100
    )
    game.autods_portion[3] = Number(
        document.getElementById("ar_portion_input2").value / 100
    )
    game.autods_portion[4] = Number(
        document.getElementById("aa_portion_input2").value / 100
    )

    for (let i = 0; i < 5; i++) {
        if (i === 0) {
            if (game.autods_portion[i] === NaN) game.autods_portion[i] = 0.5
        } else {
            if (game.autods_portion[i] === NaN) game.autods_portion[i] = 0
        }
        if (game.autods_portion[i] < 0) game.autods_portion[i] = 0
        if (game.autods_portion[i] > 1) game.autods_portion[i] = 1
    }

    let error = false

    if (game.research_complete[6] >= 1) {
        if (
            game.autods_portion[0] +
                game.autods_portion[1] +
                game.autods_portion[2] >
            1
        ) {
            error = true
            document.getElementById("distributor_error1").style.display =
                "block"
        } else {
            document.getElementById("distributor_error1").style.display = "none"
        }
        if (game.autods_portion[3] + game.autods_portion[4] > 1) {
            error = true
            document.getElementById("distributor_error2").style.display =
                "block"
        } else {
            document.getElementById("distributor_error2").style.display = "none"
        }
    }

    if (game.collapse_complete[4] >= 1 && game.collapse_challenge !== 11) {
        let amount = 0
        if (game.rainbow_spice.cmp(Decimal.pow(2, 1024)) >= 0) {
            amount = Math.floor(
                (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8
            )
            if (
                game.research_complete[10] >= 1 &&
                game.collapse_challenge !== 12
            )
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
                    antispice_amount.cmp(
                        Decimal.pow(10, 11).mul(2 * 5 ** 0.5)
                    ) >= 0
                )
                    antispice_amount = antispice_amount
                        .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))

                if (game.collapse_challenge !== 0) {
                    amount =
                        amount **
                        (1 + antispice_amount.log(10) ** 0.75 * 0.0325)
                } else {
                    amount =
                        amount ** (1 + antispice_amount.log(10) ** 0.75 * 0.065)
                }
            }

            if (game.antispice_bought[3]) {
                amount = amount ** 1.25
            }
        }

        game.ansuz +=
            (amount *
                0.005 *
                game.collapse_complete[4] *
                (game.collapse_complete[4] + 1) *
                reward_scaling) /
            delta_time

        if (game.research_complete[4] >= 1 && !error) {
            if (game.research_complete[6] >= 1) {
                if (game.ascend_bought[34]) {
                    game.autods_budget[1] +=
                        (Math.floor(amount * game.autods_portion[3]) *
                            0.005 *
                            game.collapse_complete[4] *
                            (game.collapse_complete[4] + 1) *
                            reward_scaling) /
                        delta_time
                    game.autods_budget[2] +=
                        (Math.floor(amount * game.autods_portion[4]) *
                            0.005 *
                            game.collapse_complete[4] *
                            (game.collapse_complete[4] + 1) *
                            reward_scaling) /
                        delta_time
                } else {
                    game.autods_budget[0] +=
                        (Math.floor(amount * game.autods_portion[0]) *
                            0.005 *
                            game.collapse_complete[4] *
                            (game.collapse_complete[4] + 1) *
                            reward_scaling) /
                        delta_time
                    game.autods_budget[1] +=
                        (Math.floor(amount * game.autods_portion[1]) *
                            0.005 *
                            game.collapse_complete[4] *
                            (game.collapse_complete[4] + 1) *
                            reward_scaling) /
                        delta_time
                    game.autods_budget[2] +=
                        (Math.floor(amount * game.autods_portion[2]) *
                            0.005 *
                            game.collapse_complete[4] *
                            (game.collapse_complete[4] + 1) *
                            reward_scaling) /
                        delta_time
                }
            } else {
                game.autods_budget[0] +=
                    (Math.floor(amount * game.autods_portion[0]) *
                        0.005 *
                        game.collapse_complete[4] *
                        (game.collapse_complete[4] + 1) *
                        reward_scaling) /
                    delta_time
            }
        }
    }

    if (game.research_complete[4] >= 1 && game.autods_toggle && !error) {
        for (let i = 0; i < 35; i++) {
            buy_ascension_upgrade(i, true)
        }

        if (game.research_complete[6] >= 1) {
            distribute_runes("budget")
            if (game.ascend_complete[0]) max_all("arcane_budget")
        }
    }

    v = document.getElementById("co_spice_input").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autoco_goal[0] = new Decimal(v)
    else game.autoco_goal[0] = new Decimal(1)

    game.autoco_goal[1] = Number(document.getElementById("co_time_input").value)
    if (game.autoco_goal[1] === NaN) game.autoco_goal[1] = 120
    if (game.autoco_goal[1] < 0.01) game.autoco_goal[1] = 0.01

    v = document.getElementById("co_spice_input2").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autoco_stop[0] = new Decimal(v)
    else game.autoco_stop[0] = new Decimal(1)

    game.autoco_stop[1] = Number(
        document.getElementById("co_time_input2").value
    )
    if (game.autoco_stop[1] === NaN) game.autoco_stop[1] = 60
    if (game.autoco_stop[1] < 0.01) game.autoco_stop[1] = 0.01

    if (
        game.research_complete[15] >= 1 &&
        game.autoco_toggle &&
        game.collapse_challenge === 0
    ) {
        if (game.autoco_mode === 0) {
            let amount = game.collapse_spice.pow(5 * 10 ** -10).floor()

            if (amount.cmp(Decimal.pow(10, 1800)) >= 0) {
                amount = amount
                    .div(Decimal.pow(10, 200))
                    .pow(10 / ((amount.log(10) * 0.3 - 56) ** 0.5 - 2))
                    .mul(Decimal.pow(10, 200))

                if (amount.cmp(Decimal.pow(10, 20000)) >= 0)
                    amount = Decimal.pow(
                        10,
                        20000 * (amount.log(10) / 20000) ** (2 / 3)
                    )
            } else if (amount.cmp(Decimal.pow(10, 200)) >= 0) {
                amount = amount
                    .div(Decimal.pow(10, 200))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 200))
            }

            if (
                game.research_complete[5] >= 1 &&
                game.collapse_challenge === 0
            ) {
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

                amount = amount.mul(rune_amount)
            }

            let total_completions = 0
            for (let i = 0; i < 6; i++) {
                total_completions += game.collapse_complete[i]
            }
            if (
                game.research_complete[22] >= 1 &&
                game.collapse_challenge === 0
            )
                amount = amount.mul(Decimal.pow(888, total_completions))

            if (amount.cmp(game.autoco_goal[0]) >= 0) collapse()
        } else if (game.autoco_mode === 1) {
            if (game.real_time_played[3] >= game.autoco_goal[1]) collapse()
        }
    }

    if (!game.research_pause && game.research_select !== 0) {
        let r = game.research_select - 1

        if (game.data_boosts === 0) {
            game.data[r] +=
                (1 * (2 * reward_scaling) ** game.collapse_complete[5]) /
                (delta_time * game.gamespeed)
        } else {
            game.data[r] +=
                (2 *
                    1.5 ** (game.data_boosts - 1) *
                    (2 * reward_scaling) ** game.collapse_complete[5]) /
                (delta_time * game.gamespeed)
        }

        if (!research.researches[r].repeat) {
            if (game.data[r] >= research.researches[r].data) {
                game.data[r] = research.researches[r].data
                game.research_complete[r] = 1
                game.research_pause = true
                game.research_select = 0
            }
        } else {
            let goal = 0
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

            if (game.data[r] >= goal) {
                game.research_complete[r]++
                game.research_pause = true
                game.research_select = 0
                if (r === 0) {
                    if (game.research_complete[0] < 40) {
                        game.data[r] = 0
                    }
                } else {
                    game.data[r] = 0
                }
            }
        }
    }

    if (game.antispice_bought[0]) {
        game.halflife = 600 * (0.67 / 1.11) ** game.research_complete[0]
    } else {
        game.halflife = 600 * 0.67 ** game.research_complete[0]
    }
    if (game.collapse_challenge === 12) game.halflife = 600

    if (game.research_complete[7] < 4)
        game.atomic_efficiency = 0.6 + 0.1 * game.research_complete[7]
    else game.atomic_efficiency = 0.8 + 0.05 * game.research_complete[7]

    if (game.antispice_bought[0]) {
        game.atomic_efficiency = (game.atomic_efficiency - 0.6) * 1.11 + 0.6
    }

    game.atomic_portion =
        Number(document.getElementById("collider_input").value) / 100
    if (game.atomic_portion === NaN) game.atomic_portion = 1
    if (game.atomic_portion < 0.01) game.atomic_portion = 0.01
    if (game.atomic_portion > 1) game.atomic_portion = 1

    game.augment_start =
        (2000000 + 2000000 * game.collapse_complete[3]) * reward_scaling

    if (game.research_complete[28] >= 1 && game.collapse_challenge !== 0) {
        let c = collapse_challenge.challenges[game.collapse_challenge - 7]
        let completions = game.collapse_complete[game.collapse_challenge - 7]

        let temp_goal = c.goal.mul(
            c.delta.pow(completions + game.pending_completions)
        )

        let extra = [1, 1, 1, 1, 1, 1]
        let superstep = c.goal.mul(c.delta.pow(Math.abs(c.scaling1) - 1))
        let superdelta = c.delta
        let step1 = c.goal
        if (c.scaling1 !== undefined) {
            if (c.scaling1 < 0) extra[0] = 0
            step1 = step1.mul(c.delta.pow(Math.abs(c.scaling1) - 1))
            if (completions + game.pending_completions >= Math.abs(c.scaling1))
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
            if (completions + game.pending_completions >= Math.abs(c.scaling2))
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
            if (completions + game.pending_completions >= Math.abs(c.scaling3))
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
            if (completions + game.pending_completions >= Math.abs(c.scaling4))
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
            if (completions + game.pending_completions >= Math.abs(c.scaling5))
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
            if (completions + game.pending_completions >= Math.abs(c.scaling6))
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
                c.delta7.pow(c.superscaling - Math.abs(c.scaling6) + extra[5])
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

        game.pending_goal = temp_goal

        let amount = game.collapse_spice.pow(5 * 10 ** -10).floor()

        if (amount.cmp(Decimal.pow(10, 1800)) >= 0) {
            amount = amount
                .div(Decimal.pow(10, 200))
                .pow(10 / ((amount.log(10) * 0.3 - 56) ** 0.5 - 2))
                .mul(Decimal.pow(10, 200))

            if (amount.cmp(Decimal.pow(10, 20000)) >= 0)
                amount = Decimal.pow(
                    10,
                    20000 * (amount.log(10) / 20000) ** (2 / 3)
                )
        } else if (amount.cmp(Decimal.pow(10, 200)) >= 0) {
            amount = amount
                .div(Decimal.pow(10, 200))
                .pow(0.5)
                .mul(Decimal.pow(10, 200))
        }

        if (amount.cmp(game.pending_goal) >= 0) {
            game.pending_completions++
        }
    }

    let rainbow_gain = new Decimal(0)
    if (game.color_boosts <= 16)
        rainbow_gain = new Decimal(2).pow((game.color_boosts - 10) / 3)
    else rainbow_gain = new Decimal(2).pow((game.color_boosts - 8) / 4)
    if (game.research_complete[31] >= 1 && game.collapse_challenge !== 12) {
        if (game.color_boosts >= game.augment_start) {
            let augment_amount = new Decimal(2).pow(
                (game.augment_start - 8) / 4
            )
            rainbow_gain = rainbow_gain
                .div(augment_amount)
                .pow(1.5)
                .mul(augment_amount)
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
            rainbow_gain = rainbow_gain.mul(Decimal.pow(2, game.ascend / 20))
        else
            rainbow_gain = rainbow_gain.mul(
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
        if (antispice_amount.cmp(Decimal.pow(10, 11).mul(2 * 5 ** 0.5)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                .pow(0.5)
                .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))

        if (game.collapse_challenge !== 0) {
            rainbow_gain = rainbow_gain.pow(
                1 + antispice_amount.log(10) ** 0.75 * 0.0325
            )
        } else {
            rainbow_gain = rainbow_gain.pow(
                1 + antispice_amount.log(10) ** 0.75 * 0.065
            )
        }
    }

    if (game.antispice_bought[2]) {
        rainbow_gain = rainbow_gain.pow(1.15)
    }

    if (
        rainbow_gain
            .div(game.prestige_time_played)
            .cmp(game.peak_rainbow_gain) === 1 &&
        game.prestige_time_played > 0
    ) {
        game.peak_rainbow_gain = rainbow_gain.div(game.prestige_time_played)
        game.peak_rainbow_amount = rainbow_gain
        game.peak_rainbow_boosts = game.color_boosts
        game.peak_rainbow_time = game.real_time_played[1]
    }

    let ansuz_gain = Math.floor(
        (game.rainbow_spice.log(Decimal.pow(2, 512)) / 2) ** 8
    )
    if (game.research_complete[10] >= 1 && game.collapse_challenge !== 12)
        ansuz_gain = Math.floor(
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
        if (antispice_amount.cmp(Decimal.pow(10, 11).mul(2 * 5 ** 0.5)) >= 0)
            antispice_amount = antispice_amount
                .div(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))
                .pow(0.5)
                .mul(Decimal.pow(10, 11).mul(2 * 5 ** 0.5))

        if (game.collapse_challenge !== 0) {
            ansuz_gain =
                ansuz_gain ** (1 + antispice_amount.log(10) ** 0.75 * 0.0325)
        } else {
            ansuz_gain =
                ansuz_gain ** (1 + antispice_amount.log(10) ** 0.75 * 0.065)
        }
    }

    if (game.antispice_bought[3]) {
        ansuz_gain = ansuz_gain ** 1.25
    }

    if (
        ansuz_gain / game.ascend_time_played > game.peak_ansuz_gain &&
        ansuz_gain / game.ascend_time_played < Infinity
    ) {
        game.peak_ansuz_gain = ansuz_gain / game.ascend_time_played
        game.peak_ansuz_amount = ansuz_gain
        game.peak_ansuz_time = game.real_time_played[2]
    }

    let atomic_gain = game.collapse_spice.pow(5 * 10 ** -10).floor()

    if (atomic_gain.cmp(Decimal.pow(10, 1800)) >= 0) {
        atomic_gain = atomic_gain
            .div(Decimal.pow(10, 200))
            .pow(10 / ((atomic_gain.log(10) * 0.3 - 56) ** 0.5 - 2))
            .mul(Decimal.pow(10, 200))

        if (atomic_gain.cmp(Decimal.pow(10, 20000)) >= 0)
            atomic_gain = Decimal.pow(
                10,
                20000 * (atomic_gain.log(10) / 20000) ** (2 / 3)
            )
    } else if (atomic_gain.cmp(Decimal.pow(10, 200)) >= 0) {
        atomic_gain = atomic_gain
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

        atomic_gain = atomic_gain.mul(rune_amount)
    }

    let total_completions = 0
    for (let i = 0; i < 6; i++) {
        total_completions += game.collapse_complete[i]
    }
    if (game.research_complete[22] >= 1 && game.collapse_challenge === 0)
        atomic_gain = atomic_gain.mul(Decimal.pow(888, total_completions))

    if (
        atomic_gain
            .div(game.collapse_time_played)
            .cmp(game.peak_atomic_gain) === 1 &&
        game.collapse_time_played > 0
    ) {
        game.peak_atomic_gain = atomic_gain.div(game.collapse_time_played)
        game.peak_atomic_amount = atomic_gain
        game.peak_atomic_time = game.real_time_played[3]
    }
}

//handling spice collider animations
function collider_tick() {
    collider.time++

    let col = document.getElementById("collider_view")
    let ctx = col.getContext("2d")
    let col2 = document.getElementById("collider_view2")
    let ctx2 = col2.getContext("2d")
    if (collider.type >= 1 && collider.type !== 8) {
        col2 = document.getElementById("collider_view3")
        ctx2 = col2.getContext("2d")

        switch (collider.type) {
            case 1:
            case 9:
                col2.className = "pure_collider"
                break
            case 2:
            case 10:
                col2.className = "red_collider"
                break
            case 3:
            case 11:
                col2.className = "yellow_collider"
                break
            case 4:
            case 12:
                col2.className = "green_collider"
                break
            case 5:
            case 13:
                col2.className = "blue_collider"
                break
            case 6:
            case 14:
                col2.className = "pink_collider"
                break
            case 7:
            case 15:
                col2.className = "rainbow_collider"
                break
        }
    }

    if (collider.time <= 25) {
        ctx.beginPath()
        ctx2.beginPath()

        for (let i = 0; i < 2; i++) {
            let px = large_particle.particles[i].x
            large_particle.particles[i].x +=
                28 * large_particle.particles[i].dir
            ctx.moveTo(720 + px, 360)
            ctx.lineTo(720 + large_particle.particles[i].x, 360)
            ctx2.moveTo(720 + px, 360)
            ctx2.lineTo(720 + large_particle.particles[i].x, 360)
        }

        ctx.lineWidth = 12
        ctx.lineCap = "round"
        ctx.strokeStyle = "#33ff3a"
        ctx.stroke()
        ctx2.lineWidth = 12
        ctx2.lineCap = "round"
        switch (collider.type) {
            case 0:
            case 8:
                ctx2.strokeStyle = "#ff4e33"
                break
            case 1:
            case 9:
                ctx2.strokeStyle = "#ffffff"
                break
            case 2:
            case 10:
                ctx2.strokeStyle = "#14ebff"
                break
            case 3:
            case 11:
                ctx2.strokeStyle = "#1f48ff"
                break
            case 4:
            case 12:
                ctx2.strokeStyle = "#ea1a78"
                break
            case 5:
            case 13:
                ctx2.strokeStyle = "#ff8c00"
                break
            case 6:
            case 14:
                ctx2.strokeStyle = "#3dff64"
                break
            case 7:
            case 15:
                ctx2.strokeStyle = "#f53d3d"
                break
        }
        ctx2.stroke()
    } else if (collider.time <= 100) {
        ctx2.beginPath()

        for (let i = 0; i < collider.particles; i++) {
            if (
                particle.particles[i].speed > 0 &&
                Math.abs(particle.particles[i].y) < 354
            ) {
                let px = particle.particles[i].x
                let py = particle.particles[i].y

                particle.particles[i].x +=
                    particle.particles[i].speed *
                    Math.cos(particle.particles[i].dir)
                particle.particles[i].y +=
                    particle.particles[i].speed *
                    Math.sin(particle.particles[i].dir)

                if (particle.particles[i].type === 1) {
                    particle.particles[i].dir +=
                        (particle.particles[i].delta *
                            particle.particles[i].speed) /
                        particle.particles[i].speed_init
                }
                if (particle.particles[i].type === 2) {
                    particle.particles[i].dir +=
                        (particle.particles[i].delta *
                            particle.particles[i].speed *
                            (collider.time - 25) ** 0.2) /
                        particle.particles[i].speed_init
                }

                particle.particles[i].speed--

                if (Math.abs(particle.particles[i].y) < 354) {
                    ctx2.moveTo(720 + px, 360 + py)
                    ctx2.lineTo(
                        720 + particle.particles[i].x,
                        360 + particle.particles[i].y
                    )
                }
            }

            ctx2.lineWidth = 6
            ctx2.lineCap = "round"
            switch (collider.type) {
                case 0:
                case 8:
                    ctx2.strokeStyle = "#ff4e33"
                    break
                case 1:
                case 9:
                    ctx2.strokeStyle = "#ffffff"
                    break
                case 2:
                case 10:
                    ctx2.strokeStyle = "#14ebff"
                    break
                case 3:
                case 11:
                    ctx2.strokeStyle = "#1f48ff"
                    break
                case 4:
                case 12:
                    ctx2.strokeStyle = "#ea1a78"
                    break
                case 5:
                case 13:
                    ctx2.strokeStyle = "#ff8c00"
                    break
                case 6:
                case 14:
                    ctx2.strokeStyle = "#3dff64"
                    break
                case 7:
                case 15:
                    ctx2.strokeStyle = "#f53d3d"
                    break
            }
            ctx2.stroke()
        }

        if (collider.time === 26) {
            if (collider.type === 0) {
                game.total_unstable_spice = game.total_unstable_spice.add(
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency)
                        .floor()
                )
                game.unstable_spice = game.unstable_spice.add(
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency)
                        .floor()
                )
                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 1) {
                game.spent_atomic_spice[0] = game.spent_atomic_spice[0].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[0].pow(
                    game.atomic_efficiency / 132
                )
                if (amount.cmp(Decimal.pow(10, 420)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 420) ** 0.8 * 420
                    )
                if (amount.floor().cmp(game.antispice[0]) >= 0)
                    game.antispice[0] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 2) {
                let red_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[1].log(10) / (4.2 * 10 ** 11)) ** 0.5
                )

                game.spent_atomic_spice[1] = game.spent_atomic_spice[1].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[1]
                    .pow(game.atomic_efficiency / 320)
                    .mul(red_amount)
                if (amount.cmp(Decimal.pow(10, 336)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 336) ** 0.8 * 336
                    )
                if (amount.floor().cmp(game.antispice[1]) >= 0)
                    game.antispice[1] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 3) {
                let yellow_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[2].log(10) / (1.75 * 10 ** 12)) ** 0.5
                )

                game.spent_atomic_spice[2] = game.spent_atomic_spice[2].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[2]
                    .pow(game.atomic_efficiency / 1000)
                    .mul(yellow_amount)
                if (amount.cmp(Decimal.pow(10, 116)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 116) ** 0.8 * 116
                    )
                if (amount.floor().cmp(game.antispice[2]) >= 0)
                    game.antispice[2] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 4) {
                let green_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[3].log(10) / (4.5 * 10 ** 12)) ** 0.5
                )

                game.spent_atomic_spice[3] = game.spent_atomic_spice[3].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[3]
                    .pow(game.atomic_efficiency / 2575)
                    .mul(green_amount)
                if (amount.cmp(Decimal.pow(10, 48)) >= 0)
                    amount = Decimal.pow(10, (amount.log(10) / 48) ** 0.8 * 48)
                if (amount.floor().cmp(game.antispice[3]) >= 0)
                    game.antispice[3] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 5) {
                let blue_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[4].log(10) / (3.5 * 10 ** 13)) ** 0.5
                )

                game.spent_atomic_spice[4] = game.spent_atomic_spice[4].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[4]
                    .pow(game.atomic_efficiency / 4850)
                    .mul(blue_amount)
                if (amount.cmp(Decimal.pow(10, 19)) >= 0)
                    amount = Decimal.pow(10, (amount.log(10) / 19) ** 0.8 * 19)
                if (amount.floor().cmp(game.antispice[4]) >= 0)
                    game.antispice[4] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 6) {
                let pink_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[5].log(10) / (3.75 * 10 ** 13)) ** 0.5
                )

                game.spent_atomic_spice[5] = game.spent_atomic_spice[5].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[5]
                    .pow(game.atomic_efficiency / 16500)
                    .mul(pink_amount)
                if (amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 7.5) ** 0.8 * 7.5
                    )
                if (amount.floor().cmp(game.antispice[5]) >= 0)
                    game.antispice[5] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 7) {
                let rainbow_amount =
                    (game.antitotal_spice[6].log(10) - 11300000) / 900000
                if (rainbow_amount > 0.5)
                    rainbow_amount =
                        ((rainbow_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
                else rainbow_amount = 0.5
                if (rainbow_amount > 24) rainbow_amount = 24

                game.spent_atomic_spice[6] = game.spent_atomic_spice[6].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let atomic_amount =
                    (game.spent_atomic_spice[6].log(10) - 30976) / 2048
                if (atomic_amount > 0.5)
                    atomic_amount =
                        ((atomic_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
                else atomic_amount = 0.5
                if (atomic_amount > 24) atomic_amount = 24
                let old_total = game.total_rainbow_antispice
                game.total_rainbow_antispice = Math.floor(
                    atomic_amount + rainbow_amount
                )
                game.antispice[6] += game.total_rainbow_antispice - old_total

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type >= 8) {
                let can_collide = false
                let available_spice = new Array(8).fill(false)
                let unlock_index = [undefined, 19, 21, 24, 27, 30, 33, 37]

                let red_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[1].log(10) / (4.2 * 10 ** 11)) ** 0.5
                )
                let yellow_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[2].log(10) / (1.75 * 10 ** 12)) ** 0.5
                )
                let green_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[3].log(10) / (4.5 * 10 ** 12)) ** 0.5
                )
                let blue_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[4].log(10) / (3.5 * 10 ** 13)) ** 0.5
                )
                let pink_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[5].log(10) / (3.75 * 10 ** 13)) ** 0.5
                )
                let rainbow_amount =
                    (game.antitotal_spice[6].log(10) - 11300000) / 900000
                if (rainbow_amount > 0.5)
                    rainbow_amount =
                        ((rainbow_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
                else rainbow_amount = 0.5
                if (rainbow_amount > 24) rainbow_amount = 24
                let atomic_amount2 =
                    (game.spent_atomic_spice[6]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .log(10) -
                        30976) /
                    2048
                if (atomic_amount2 > 0.5)
                    atomic_amount2 =
                        ((atomic_amount2 - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
                else atomic_amount2 = 0.5
                if (atomic_amount2 > 24) atomic_amount2 = 24

                let pending_amount = new Decimal(0)

                if (
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency)
                        .cmp(game.total_unstable_spice) >= 0
                )
                    can_collide = true

                if (game.research_complete[19] >= 1) {
                    pending_amount = game.spent_atomic_spice[0]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 132)
                    if (pending_amount.cmp(Decimal.pow(10, 420)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 420) ** 0.8 * 420
                        )
                    if (
                        pending_amount.sub(game.antispice[0]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[1] = true
                    }
                }

                if (game.research_complete[21] >= 1) {
                    pending_amount = game.spent_atomic_spice[1]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 320)
                        .mul(red_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 336)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 336) ** 0.8 * 336
                        )
                    if (
                        pending_amount.sub(game.antispice[1]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[2] = true
                    }
                }

                if (game.research_complete[24] >= 1) {
                    pending_amount = game.spent_atomic_spice[2]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 1000)
                        .mul(yellow_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 116)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 116) ** 0.8 * 116
                        )
                    if (
                        pending_amount.sub(game.antispice[2]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[3] = true
                    }
                }

                if (game.research_complete[27] >= 1) {
                    pending_amount = game.spent_atomic_spice[3]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 2575)
                        .mul(green_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 48)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 48) ** 0.8 * 48
                        )
                    if (
                        pending_amount.sub(game.antispice[3]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[4] = true
                    }
                }

                if (game.research_complete[30] >= 1) {
                    pending_amount = game.spent_atomic_spice[4]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 4850)
                        .mul(blue_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 19)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 19) ** 0.8 * 19
                        )
                    if (
                        pending_amount.sub(game.antispice[4]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[5] = true
                    }
                }

                if (game.research_complete[33] >= 1) {
                    pending_amount = game.spent_atomic_spice[5]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 16500)
                        .mul(pink_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 7.5) ** 0.8 * 7.5
                        )
                    if (
                        pending_amount.sub(game.antispice[5]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[6] = true
                    }
                }

                if (game.research_complete[37] >= 1) {
                    if (
                        Math.floor(atomic_amount2 + rainbow_amount) >
                        game.total_rainbow_antispice
                    ) {
                        can_collide = true
                        available_spice[7] = true
                    }
                }

                if (can_collide) {
                    available_spice[0] = true
                }

                let spices_unlocked = 0
                for (let i = 0; i < 8; i++) {
                    if (i === 0) {
                        if (available_spice[i]) spices_unlocked++
                    } else {
                        if (
                            available_spice[i] &&
                            game.research_complete[unlock_index[i]] >= 0
                        )
                            spices_unlocked++
                    }
                }
                let atomic_amount = game.atomic_spice
                    .mul(game.atomic_portion)
                    .div(spices_unlocked)

                if (available_spice[0]) {
                    game.total_unstable_spice = game.total_unstable_spice.add(
                        atomic_amount.pow(game.atomic_efficiency).floor()
                    )
                    game.unstable_spice = game.unstable_spice.add(
                        atomic_amount.pow(game.atomic_efficiency).floor()
                    )
                }

                if (game.research_complete[19] >= 1 && available_spice[1]) {
                    game.spent_atomic_spice[0] =
                        game.spent_atomic_spice[0].add(atomic_amount)
                    let amount = game.spent_atomic_spice[0].pow(
                        game.atomic_efficiency / 132
                    )
                    if (amount.cmp(Decimal.pow(10, 420)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 420) ** 0.8 * 420
                        )
                    if (amount.floor().cmp(game.antispice[0]) >= 0)
                        game.antispice[0] = amount.floor()
                }

                if (game.research_complete[21] >= 1 && available_spice[2]) {
                    game.spent_atomic_spice[1] =
                        game.spent_atomic_spice[1].add(atomic_amount)
                    let amount = game.spent_atomic_spice[1]
                        .pow(game.atomic_efficiency / 320)
                        .mul(red_amount)
                    if (amount.cmp(Decimal.pow(10, 336)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 336) ** 0.8 * 336
                        )
                    if (amount.floor().cmp(game.antispice[1]) >= 0)
                        game.antispice[1] = amount.floor()
                }

                if (game.research_complete[24] >= 1 && available_spice[3]) {
                    game.spent_atomic_spice[2] =
                        game.spent_atomic_spice[2].add(atomic_amount)
                    let amount = game.spent_atomic_spice[2]
                        .pow(game.atomic_efficiency / 1000)
                        .mul(yellow_amount)
                    if (amount.cmp(Decimal.pow(10, 116)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 116) ** 0.8 * 116
                        )
                    if (amount.floor().cmp(game.antispice[2]) >= 0)
                        game.antispice[2] = amount.floor()
                }

                if (game.research_complete[27] >= 1 && available_spice[4]) {
                    game.spent_atomic_spice[3] =
                        game.spent_atomic_spice[3].add(atomic_amount)
                    let amount = game.spent_atomic_spice[3]
                        .pow(game.atomic_efficiency / 2575)
                        .mul(green_amount)
                    if (amount.cmp(Decimal.pow(10, 48)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 48) ** 0.8 * 48
                        )
                    if (amount.floor().cmp(game.antispice[3]) >= 0)
                        game.antispice[3] = amount.floor()
                }

                if (game.research_complete[30] >= 1 && available_spice[5]) {
                    game.spent_atomic_spice[4] =
                        game.spent_atomic_spice[4].add(atomic_amount)
                    let amount = game.spent_atomic_spice[4]
                        .pow(game.atomic_efficiency / 4850)
                        .mul(blue_amount)
                    if (amount.cmp(Decimal.pow(10, 19)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 19) ** 0.8 * 19
                        )
                    if (amount.floor().cmp(game.antispice[4]) >= 0)
                        game.antispice[4] = amount.floor()
                }

                if (game.research_complete[33] >= 1 && available_spice[6]) {
                    game.spent_atomic_spice[5] =
                        game.spent_atomic_spice[5].add(atomic_amount)
                    let amount = game.spent_atomic_spice[5]
                        .pow(game.atomic_efficiency / 16500)
                        .mul(pink_amount)
                    if (amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 7.5) ** 0.8 * 7.5
                        )
                    if (amount.floor().cmp(game.antispice[5]) >= 0)
                        game.antispice[5] = amount.floor()
                }

                if (game.research_complete[37] >= 1 && available_spice[7]) {
                    game.spent_atomic_spice[6] =
                        game.spent_atomic_spice[6].add(atomic_amount)

                    atomic_amount2 =
                        (game.spent_atomic_spice[6].log(10) - 30976) / 2048
                    if (atomic_amount2 > 0.5)
                        atomic_amount2 =
                            ((atomic_amount2 - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
                    else atomic_amount2 = 0.5
                    if (atomic_amount2 > 24) atomic_amount2 = 24
                    let old_total = game.total_rainbow_antispice
                    game.total_rainbow_antispice = Math.floor(
                        atomic_amount2 + rainbow_amount
                    )
                    game.antispice[6] +=
                        game.total_rainbow_antispice - old_total
                }

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            }

            document.getElementById("collider_view").style.display = "none"
            if (collider.type === 0 || collider.type === 8)
                document.getElementById("collider_view2").style.display =
                    "block"
            else
                document.getElementById("collider_view3").style.display =
                    "block"
        }
    } else {
        collider.enabled = false
    }
}

//handling hotkeys
function switch_key(eventcode, state) {
    if (eventcode.startsWith("Digit")) {
        // is it a "Digit" key, between 1 and 6? change its state to 'state'
        if (
            parseInt(
                eventcode.substring(5) >= 1 &&
                    parseInt(eventcode.substring(5) <= 6)
            )
        ) {
            key.digit[parseInt(eventcode.substring(5))] = state
        }
    } else if (eventcode.startsWith("Key")) {
        // a "Key"-key? and in a list? change its state to 'state'
        if (
            ["a", "b", "c", "i", "m", "n", "p", "s", "x"].includes(
                eventcode.substring(3).toLowerCase()
            )
        ) {
            key[eventcode.substring(3).toLowerCase()] = state
        }
    }

    if (eventcode === "ShiftLeft" || eventcode === "ShiftRight")
        key.shift = state
}
document.body.addEventListener("keydown", function (event) {
    let active_element = document.activeElement
    if (
        active_element.tagName == "INPUT" &&
        (active_element.type == "text" || active_element.type == "number")
    ) {
        event.stopPropagation()
    } else {
        switch_key(event.code, true) // change corresponding key and or key.digit(if between 1-6)

        // upcoming: fast-button to change tab/subtabs
        // temporary variable "available_subtabs"
        let available_subtabs = [4, 2, 3, 3, 3]
        // ArrowButton-Action ;)
        if (event.code === "ArrowUp") {
            // swich Tabs to the right (+rightmost to leftmost)
            if (
                game.tab == 0 && // on Spices AND
                (game.color_boosts >= 10 ||
                    game.prestige > 0 ||
                    game.ascend > 0 ||
                    game.collapse > 0) // unlocked Prestige+?
            ) {
                goto_tab(1) // goto Prestige
            } else if (
                // same as before, this time checking for Ascension+ unlocked
                game.tab == 1 &&
                (game.prestige_bought[25] ||
                    game.ascend > 0 ||
                    game.collapse > 0)
            ) {
                goto_tab(2)
            } else if (
                //
                game.tab == 2 &&
                (game.ascend_complete[5] || game.collapse > 0)
            ) {
                goto_tab(3)
            } else if (game.tab == 3) {
                // from collapse straight into Stats
                goto_tab(5)
            } else if (game.tab == 5) {
                // stats to Settings
                goto_tab(6)
            } else if (game.tab == 6) {
                // Settings to Spices
                goto_tab(0)
            } else {
                // if any pre/asc/coll aren't unlocked, it will hop into stats
                goto_tab(5)
            }
        }

        if (event.code === "ArrowDown") {
            // Switch Tabs to the left (+ leftmost to rightmost)
            event.preventDefault() // will prevent default behaviour

            if (game.tab == 0) {
                // Sitting on "Spices" ?
                goto_tab(6) // goto "Settings"
            } else if (game.tab == 6) {
                // from Settings
                goto_tab(5) // to "Statistic"
            } else if (game.tab == 5) {
                // Special-Case: from "Statistic"
                // look for unlocked tabs reversed, hop into highest unlocked
                if (game.ascend_complete[5] || game.collapse > 0) {
                    // are there collapse already?
                    goto_tab(3)
                } else if (game.prestige_bought[25] || game.ascend > 0) {
                    // maybe ascension?
                    goto_tab(2)
                } else if (game.color_boosts >= 10 || game.prestige > 0) {
                    // still not? then maybe Prestige
                    goto_tab(1)
                } else {
                    // new player, not unlocked any tab, hit him to "Spices"
                    goto_tab(0)
                }
            } else if (game.tab == 3) {
                // still have to check from collapse downwards
                goto_tab(2)
            } else if (game.tab == 2) {
                // ascension-check
                goto_tab(1)
            } else goto_tab(0) // no need to check for Prestige
        }
        if (event.code === "ArrowRight") {
            // Will switch Subtabs to the right, based on conditions
            event.preventDefault() // same as before, to prevent default behavior

            switch (
                game.tab // get value game.tab, which is a number in between 0-6 (only caring about 0,1,2,3%5 bc they have subtabs)
            ) {
                case 0: // case for Spice-Subtabs
                    if (game.color_boosts > 0)
                        if (
                            game.subtab[0] == game.color_boosts ||
                            game.subtab[0] == available_subtabs[0]
                        )
                            // are there color-Shifts/Boosts?
                            // is this the rightmost unlocked spice?
                            goto_subtab(0) // go back to red spices
                        else goto_subtab(game.subtab[0] + 1)
                    // otherwise move one right
                    else goto_subtab(0) // ensure staying on subtab 0, if nothing unlocked
                    break
                case 1: // case Prestige-Subtabs
                    if (game.prestige_bought[12] == 1)
                        if (game.subtab[1] == available_subtabs[1])
                            // did we unlocked crystal spice?
                            // are we rightmost?
                            goto_subtab(0) // go back to leftmost
                        else goto_subtab(game.subtab[1] + 1)
                    // otherwise shift one to the right
                    else goto_subtab(0) // ensure staying on subtab 0, if nothing unlocked

                    break
                case 2: //case Ascension-Subtabs, index 3 on game.subtabs
                    if (game.ascend_complete[0])
                        if (game.subtab[3] == available_subtabs[3])
                            // if challenge completed, behave as usual, rightmost to leftmost, else +1
                            goto_subtab(0)
                        else goto_subtab(game.subtab[3] + 1)
                    else if (game.ascend_bought[16])
                        if (game.subtab[3] == available_subtabs[3] - 1)
                            // no complete, but challenge unlocked?
                            // as before, but skip locked subtab
                            goto_subtab(0)
                        else goto_subtab(game.subtab[3] + 1)
                    else if (game.subtab[3] == 0)
                        // otherwise, if challenges not unlocked, switch between subtab 0 and 1
                        goto_subtab(1)
                    else goto_subtab(0)

                    break
                case 3: // case Collapse, checking for research completed, using index 4 on game.subtabs
                    if (game.research_complete[19])
                        if (game.subtab[4] == available_subtabs[4])
                            // this research is unlocked after completing Collapse-challenge
                            // all Sub unlocked, rightmost to leftmost, else go right
                            goto_subtab(0)
                        else goto_subtab(game.subtab[4] + 1)
                    else if (game.research_complete[18])
                        if (game.subtab[4] == available_subtabs[4] - 1)
                            // this research unlocks challenges
                            // skip 4th subtab, else go right
                            goto_subtab(0)
                        else goto_subtab(game.subtab[4] + 1)
                    else if (game.collapse >= 5)
                        if (game.subtab[4] == 0)
                            // research unlocked?
                            // switch between research and collapse
                            goto_subtab(1)
                        else goto_subtab(0)
                    else goto_subtab(0) // ensure staying on subtab 0, if nothing unlocked

                    break
                case 5: // case Statistic, using index 2 on subtabs
                    if (game.collapse > 0)
                        if (game.subtab[2] == 3)
                            // already done a collapse?
                            // rightmost to leftmost, else go one subtab right
                            goto_subtab(0)
                        else goto_subtab(game.subtab[2] + 1)
                    else if (game.ascend > 0)
                        // no collapse but already ascended?
                        game.subtab[2] == 2 // as before, but skip the locked subtab for collapse
                            ? goto_subtab(0)
                            : goto_subtab(game.subtab[2] + 1)
                    else if (game.prestige > 0)
                        if (game.subtab[2] == 0)
                            // only prestige done?
                            // switch between 'Past Prestiges' and 'Statistics' subtabs
                            goto_subtab(1)
                        else goto_subtab(0)
                    else goto_subtab(0) // ensure staying on subtab 0, if nothing unlocked

                    break
            }
        }
        if (event.code === "ArrowLeft") {
            // Switch Subtabs left, based on conditions + leftmost to rightmost
            switch (
                game.tab // still a tab-based conditioning
            ) {
                case 0: // case Spices
                    if (game.color_boosts > 0)
                        if (game.subtab[0] == 0)
                            if (game.color_boosts >= available_subtabs[0])
                                // do we have shifts/Boosts?
                                // are we on red spices?
                                // are shift/boosts greater/equal (subtabs - 1)?
                                goto_subtab(4) // go to rightmost subtab
                            else goto_subtab(game.color_boosts)
                        // else to the subtab we just unlocked
                        else goto_subtab(game.subtab[0] - 1)
                    // otherwise, just move one to the left
                    else goto_subtab(0)

                    break
                case 1: // case Prestige
                    if (game.prestige_bought[12] == 1)
                        if (game.subtab[1] == 0)
                            // colored spices unlocked?
                            // AND on leftmost subtab?
                            goto_subtab(available_subtabs[1])
                        // goto rightmost subtab
                        else goto_subtab(game.subtab[1] - 1)
                    // otherwise, just move one to the left
                    else goto_subtab(0) // ensure he's staying on prestige only, as long as nothing else unlocked

                    break
                case 2: // case Ascension. It's using index 3 on game.subtab
                    if (game.ascend_complete[0])
                        if (!game.subtab[3])
                            // challenge 1 completed?
                            // and on leftmost subtab? goto rightmost, else only one left
                            goto_subtab(available_subtabs[3])
                        else goto_subtab(game.subtab[3] - 1)
                    else if (game.ascend_bought[16])
                        if (!game.subtab[3])
                            // challenge just unlocked, behave as before, but skip 4th subtab
                            goto_subtab(available_subtabs[3] - 1)
                        else goto_subtab(game.subtab[3] - 1)
                    else if (!game.subtab[3])
                        // only 2 subtabs? swtich between them
                        goto_subtab(1)
                    else goto_subtab(0)

                    break
                case 3: // case Collape, using index 4 on game.subtab
                    if (game.research_complete[19])
                        if (game.subtab[4] == 0)
                            // challenge 1 completed?
                            // leftmost to rightmost, else only one left
                            goto_subtab(available_subtabs[4])
                        else goto_subtab(game.subtab[4] - 1)
                    else if (game.research_complete[18])
                        if (game.subtab[4] == 0)
                            // challenge just unlocked?
                            // leftmost to rightmost, skipping 4th subtab
                            goto_subtab(available_subtabs[4] - 1)
                        else goto_subtab(game.subtab[4] - 1)
                    else if (game.collapse >= 5)
                        if (game.subtab[4] == 0)
                            // more or exact 5 collapses? you unlocked research, switch between both
                            goto_subtab(1)
                        else goto_subtab(0)
                    else goto_subtab(0) // ensure staying on subtab 0, if nothing else is available

                    break
                case 5: // case Stats, index 2 on game.subtab
                    if (game.collapse > 0)
                        if (game.subtab[2] == 0)
                            // collapse done?
                            // right to left, leftmost to righmost
                            goto_subtab(available_subtabs[2])
                        else goto_subtab(game.subtab[2] - 1)
                    else if (game.ascend > 0)
                        if (game.subtab[2] == 0)
                            // only ascension?
                            // right to left, leftmost to rightmost, skip collapse-subtab
                            goto_subtab(available_subtabs[2] - 1)
                        else goto_subtab(game.subtab[2] - 1)
                    else if (game.prestige > 0)
                        if (game.subtab[2] == 0)
                            // only prestige
                            // skip between stats and prestige
                            goto_subtab(1)
                        else goto_subtab(0)
                    else goto_subtab(0) // ensure staying on subtab 0, if nothing unlocked

                    break
            }
        }
    }
})

document.body.addEventListener("keyup", function (event) {
    switch_key(event.code, false) // same as in keydown, this time "false" them
})

window.addEventListener("blur", function () {
    for (let i = 0; i < 6; i++) {
        key.digit[i] = false
    }

    key.shift = false
    key.s = false
    key.m = false
    key.b = false
    key.p = false
    key.i = false
    key.a = false
    key.n = false
    key.c = false
    key.x = false
})

function hotkey_tick() {
    if (game.hotkeys) {
        if (key.b) color_boost()
        if (key.p) prestige()
        if (key.i) buy_infusion()
        if (key.a) ascend()
        if (key.n) buy_enchantment()
        if (key.c) collapse()
        if (key.x) {
            exit_ascension_challenge()
            exit_collapse_challenge()
        }

        if (game.tab === 0) {
            switch (game.subtab[0]) {
                case 0:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("red", i)
                        } else if (key.digit[i]) {
                            buy_until10("red", i)
                        }

                        if (key.s) buy_strengthener("red")
                        if (key.m) {
                            if (
                                game.color_boosts >= 1 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("red")
                        }
                    }
                    break
                case 1:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("yellow", i)
                        } else if (key.digit[i]) {
                            buy_until10("yellow", i)
                        }

                        if (key.s) buy_strengthener("yellow")
                        if (key.m) {
                            if (
                                game.color_boosts >= 2 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("yellow")
                        }
                    }
                    break
                case 2:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("green", i)
                        } else if (key.digit[i]) {
                            buy_until10("green", i)
                        }

                        if (key.s) buy_strengthener("green")
                        if (key.m) {
                            if (
                                game.color_boosts >= 3 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("green")
                        }
                    }
                    break
                case 3:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("blue", i)
                        } else if (key.digit[i]) {
                            buy_until10("blue", i)
                        }

                        if (key.s) buy_strengthener("blue")
                        if (key.m) {
                            if (
                                game.color_boosts >= 4 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("blue")
                        }
                    }
                    break
                case 4:
                    for (let i = 0; i < 6; i++) {
                        if (key.shift && key.digit[i]) {
                            buy_gen("pink", i)
                        } else if (key.digit[i]) {
                            buy_until10("pink", i)
                        }

                        if (key.s) buy_strengthener("pink")
                        if (key.m) {
                            if (
                                game.color_boosts >= 5 ||
                                game.prestige >= 1 ||
                                game.ascend >= 1 ||
                                game.collapse >= 1
                            )
                                max_all("pink")
                        }
                    }
                    break
            }
        }
        if (game.tab === 1) {
            if (game.subtab[1] === 1) {
                for (let i = 0; i < 6; i++) {
                    if (key.shift && key.digit[i]) {
                        buy_gen("crystal", i)
                    } else if (key.digit[i]) {
                        buy_until10("crystal", i)
                    }

                    if (key.s) buy_strengthener("crystal")
                    if (key.m) {
                        if (
                            game.crystal_spice_bought[5] >= 5n ||
                            game.ascend >= 1 ||
                            game.collapse >= 1
                        )
                            max_all("crystal")
                    }
                }
            }
        }
        if (game.tab === 2) {
            if (game.subtab[3] === 3) {
                for (let i = 0; i < 6; i++) {
                    if (key.shift && key.digit[i]) {
                        buy_gen("arcane", i)
                    } else if (key.digit[i]) {
                        buy_until10("arcane", i)
                    }

                    if (key.s) buy_strengthener("arcane")
                    if (key.shift && key.m) {
                        if (
                            game.arcane_max_unlocked &&
                            game.half_distribute_unlocked
                        )
                            max_all("arcane_half")
                    } else if (key.m) {
                        if (game.arcane_max_unlocked) max_all("arcane")
                    }
                }
            }
        }
    }
}

//saving the game
function save() {
    game.version = "1.6.4"
    game.prestige_price = new Array(prestige_upgrade.upgrades.length).fill(0)
    for (const u of prestige_upgrade.upgrades) {
        game.prestige_price[u.id] = u.price
    }
    localStorage.setItem("spice_idle_save", JSON.stringify(game))
}

//exporting a save file
function export_save() {
    navigator.clipboard.writeText(btoa(JSON.stringify(game)))
}

//importing a save file
function import_save() {
    let save_file = atob(prompt("Paste your exported save code here:"))
    let valid_json = true
    try {
        JSON.parse(save_file)
    } catch {
        valid_json = false
    }

    if (valid_json) {
        if (JSON.parse(save_file) !== null) {
            load(JSON.parse(save_file))
        }
    }
}

//deleting a save
function delete_save() {
    if (
        confirm(
            "Are you sure you want to delete your save?\nThis will reset EVERYTHING!"
        )
    ) {
        game.gamespeed = 1

        color_boost(true)
        game.color_boosts = 0

        game.total_spice = new Decimal(5)
        game.collapse_spice = new Decimal(5)
        game.total_time_played = 0
        game.real_time_played = [0, 0, 0, 0]

        game.autosp_toggle = new Array(5).fill(false)
        game.autocb_toggle = false
        game.autoin_toggle = false
        game.autopr_toggle = false
        game.autoup_toggle = false
        game.autocr_toggle = false
        game.autoas_toggle = false
        game.autoen_toggle = false

        game.prestige = 0
        game.rainbow_spice = new Decimal(0)
        game.prestige_bought = new Array(26).fill(0)
        game.prestige_time_played = 0
        game.prestige_amount_history = new Array(10).fill(-1)
        game.prestige_time_history = new Array(10).fill(-1)
        game.prestige_real_time_history = new Array(10).fill(-1)

        prestige_upgrade.upgrades[0].price = new Decimal(1)
        prestige_upgrade.upgrades[2].price = new Decimal(2)
        prestige_upgrade.upgrades[3].price = new Decimal(4)
        prestige_upgrade.upgrades[4].price = new Decimal(8)
        prestige_upgrade.upgrades[5].price = new Decimal(16)
        prestige_upgrade.upgrades[9].price = Decimal.pow(2, 20)
        prestige_upgrade.upgrades[20].price = Decimal.pow(2, 214)

        game.crystal_spice = new Decimal(0)
        game.crystal_spice_price = [
            Decimal.pow(2, 56),
            Decimal.pow(2, 62),
            Decimal.pow(2, 68),
            Decimal.pow(2, 84),
            Decimal.pow(2, 100),
            Decimal.pow(2, 124),
        ]
        game.crystal_strengthener = 0
        game.crystal_strengthener_price = Decimal.pow(2, 76)
        game.crystal_infusion = 0n
        game.crystal_infusion_price = new Decimal(10)
        for (let i = 0; i < 6; i++) {
            game.crystal_spice_gen[i] = new Decimal(0)
            game.crystal_spice_bought[i] = 0n
            game.crystal_spice_boost[i] = new Decimal(1)
            game.total_crystal_spice_boost[i] = new Decimal(1)
        }

        game.ascend = 0
        game.ansuz = 0
        game.rune = new Array(3).fill(0)
        game.rune_power = new Array(3).fill(0)
        game.total_rune_power = 0
        game.rune_boost = [new Decimal(1), new Decimal(1), new Decimal(1)]
        game.distribute_unlocked = false
        game.half_distribute_unlocked = false

        game.ascend_bought = new Array(35).fill(false)
        game.ascend_time_played = 0
        game.ascend_amount_history = new Array(10).fill(-1)
        game.ascend_time_history = new Array(10).fill(-1)
        game.ascend_real_time_history = new Array(10).fill(-1)
        game.ascend_challenge_history = new Array(10).fill(-1)

        game.ascend_challenge = 0
        game.ascend_complete = new Array(6).fill(false)
        game.ascend_challenge_timer = 0

        game.arcane_spice = new Decimal(0)
        game.arcane_spice_price = [
            20000,
            100000,
            600000,
            3.5 * 10 ** 7,
            3 * 10 ** 9,
            4 * 10 ** 11,
        ]
        game.arcane_strengthener = 0
        game.arcane_strengthener_price = 5000000
        game.arcane_enchantment = 0n
        game.free_enchantment = 0n
        game.arcane_enchantment_price = new Decimal(25)
        game.arcane_unlocked = [true, false, false, false, false, false]
        game.arcane_max_unlocked = false
        for (let i = 0; i < 6; i++) {
            game.arcane_spice_gen[i] = new Decimal(0)
            game.arcane_spice_bought[i] = 0n
            game.arcane_spice_boost[i] = new Decimal(1)
            game.total_arcane_spice_boost[i] = new Decimal(1)
        }

        game.collapse = 0
        game.atomic_spice = new Decimal(0)
        game.unstable_spice = new Decimal(0)
        game.total_unstable_spice = new Decimal(0)
        game.decayed_spice = new Decimal(0)

        game.research_view = 0
        game.research_select = 0
        game.research_pause = true
        game.research_complete = new Array(38).fill(0)
        game.data = new Array(38).fill(0)
        game.data_boosts = 0

        game.collapse_time_played = 0
        game.collapse_amount_history = new Array(10).fill(-1)
        game.collapse_time_history = new Array(10).fill(-1)
        game.collapse_real_time_history = new Array(10).fill(-1)
        game.collapse_challenge_history = new Array(10).fill(-1)

        game.collapse_challenge = 0
        game.collapse_complete = new Array(6).fill(0)
        game.pending_completions = 0
        game.pending_goal = new Decimal(1)

        game.halflife = 600
        game.atomic_efficiency = 0.6
        game.free_deity = new Decimal(0)
        game.augment_start = 2000000

        game.collider_tab = 0
        game.antispice = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            0,
        ]
        game.spent_atomic_spice = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.antitotal_spice = [
            undefined,
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.total_rainbow_antispice = 0
        game.antispice_bought = new Array(10).fill(false)
        game.antispice_order = new Array(8).fill(false)

        game.limit_active = false
        game.realm_limit = new Decimal("3.3383819898588070e+154271828182845904")
        game.red_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.yellow_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.green_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.blue_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.pink_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.crystal_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.arcane_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]

        game.subtab[0] = 0
        game.subtab[1] = 0
        game.subtab[2] = 0
        game.subtab[3] = 0
        game.subtab[4] = 0

        save()

        let temp_game = game
        load(temp_game)
    }
}

goto_tab(0)

//load the game
function load(savegame) {
    if (savegame === null) return
    if (savegame.red_unlock !== undefined) {
        alert("This save file is too powerful for this game")
        return
    }
    if (savegame.exp !== undefined && savegame.amp !== undefined) {
        alert(
            "You just tried to load an EXP Simulator save file into Spice Idle... Why did you think that would work?"
        )
        return
    }

    game = savegame

    const [edition, major, minor] = savegame.version
        .split(".")
        .map(val => parseInt(val))

    if (major <= 0) {
        let old_subtab = game.subtab
        game.subtab = new Array(4).fill(0)
        for (let i = 0; i < 3; i++) {
            game.subtab[i] = old_subtab[i]
        }
        let old_goal = game.autopr_goal
        game.autopr_goal = [10, "1", 30]
        game.autopr_goal[0] = old_goal[0]
        game.autopr_goal[1] = old_goal[1]
        game.autopr_delta = [5, "10"]
        game.autopr_goal2 = [0, "1"]
        game.ascend = 0
        game.ansuz = 0
        game.rune = new Array(3).fill(0)
        game.rune_power = new Array(3).fill(0)
        game.total_rune_power = 0
        game.rune_boost = ["1", "1", "1"]
        game.distribute_unlocked = false
        game.ascend_confirm = true
        game.ascend_bought = new Array(13).fill(false)
        game.autoup_toggle = false
        game.autocr_toggle = false
        game.autoas_toggle = false
        game.autoas_goal = 1
        game.ascend_amount_history = new Array(10).fill(-1)
        game.ascend_time_history = new Array(10).fill(-1)
        game.ascend_time_played = game.total_time_played
    }
    if (major <= 1) {
        let old_bought = game.ascend_bought
        game.ascend_bought = new Array(26).fill(false)
        for (let i = 0; i < 13; i++) {
            game.ascend_bought[i] = old_bought[i]
        }
        game.ascend_challenge = 0
        game.ascend_complete = new Array(3).fill(false)
        game.arcane_spice = "0"
        game.arcane_spice_gen = ["0", "0", "0", "0", "0", "0"]
        game.arcane_spice_price = [
            20000,
            100000,
            600000,
            3.5 * 10 ** 7,
            3 * 10 ** 9,
            4 * 10 ** 11,
        ]
        game.arcane_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
        game.arcane_spice_boost = ["1", "1", "1", "1", "1", "1"]
        game.total_arcane_spice_boost = ["1", "1", "1", "1", "1", "1"]
        game.arcane_unlocked = [true, false, false, false, false, false]
        game.arcane_max_unlocked = false
        game.arcane_strengthener = 0
        game.arcane_strengthener_price = 5000000
        game.arcane_enchantment = 0n
        game.arcane_enchantment_price = "25"
        game.autoen_toggle = false
        game.half_distribute_unlocked = false
        game.challenge_confirm = true
        game.exponent_notation = 0
    }
    if (major <= 2) {
        if ((major === 2 && minor < 1) || major < 2) {
            game.autoas_mode = 0
            let old_goal = game.autoas_goal
            game.autoas_goal = [old_goal, 30]
            game.prestige_price[8] = new Decimal(32768)
        }

        let old_bought = game.ascend_bought
        game.ascend_bought = new Array(35).fill(false)
        for (let i = 0; i < 26; i++) {
            game.ascend_bought[i] = old_bought[i]
        }
        let old_complete = game.ascend_complete
        game.ascend_complete = new Array(6).fill(false)
        for (let i = 0; i < 3; i++) {
            game.ascend_complete[i] = old_complete[i]
        }
        game.ascend_challenge_timer = 0
    }
    if (major <= 3) {
        if ((major === 3 && minor < 2) || major < 3) {
            game.high_visibility = false
            game.refresh_rate = 20
        }

        game.collapse = 0
        game.atomic_spice = "0"
        game.unstable_spice = "0"
        game.total_unstable_spice = "0"
        game.decayed_spice = "0"
        game.unstable_boost = "1"

        game.halflife = 300
        game.atomic_efficiency = 0.6
        game.free_enchantment = 0n

        game.collapse_amount_history = new Array(10).fill(-1)
        game.collapse_time_history = new Array(10).fill(-1)
        game.collapse_time_played = game.total_time_played
        game.collapse_spice = game.total_spice

        game.collapse_confirm = true

        game.research_view = 0
        game.research_select = 0
        game.research_pause = true
        game.research_complete = new Array(16).fill(0)
        game.data = new Array(16).fill(0)
        game.data_boosts = 0

        let old_subtab = game.subtab
        game.subtab = new Array(5).fill(0)
        for (let i = 0; i < 4; i++) {
            game.subtab[i] = old_subtab[i]
        }

        game.autods_toggle = false
        game.autods_portion = [0.5, 0, 0, 0, 0]
        game.autods_budget = [0, 0, 0]

        game.autoco_toggle = false
        game.autoco_mode = 0
        game.autoco_goal = [new Decimal(10 ** 50), 120]
        game.autoco_stop = [new Decimal(10 ** 25), 60]
    }
    if (major <= 4) {
        if ((major === 4 && minor < 2) || major < 4) {
            game.collider_animation = true

            if (!game.autoco_mode) game.autoco_mode = 0
        }

        let old_complete = game.research_complete
        game.research_complete = new Array(29).fill(0)
        let old_data = game.data
        game.data = new Array(29).fill(0)
        for (let i = 0; i < 16; i++) {
            game.research_complete[i] = old_complete[i]
            game.data[i] = old_data[i]
        }

        game.atomic_portion = 1
        game.collapse_challenge = 0
        game.collapse_complete = new Array(6).fill(0)
        game.pending_completions = 0
        game.pending_goal = new Decimal(1)
        game.free_deity = new Decimal(0)
        game.augment_start = 2000000
        game.gamespeed = 1

        game.collider_tab = 0
        game.antispice = ["0", "0", "0", "0", "0", "0", 0]
        game.spent_atomic_spice = ["0", "0", "0", "0", "0", "0", "0"]
        game.antitotal_spice = [undefined, "0", "0", "0", "0", "0", "0"]

        game.gamespeed = 1
        game.real_time_played = [
            game.total_time_played,
            game.prestige_time_played,
            game.ascend_time_played,
            game.collapse_time_played,
        ]
    }
    if (major <= 5) {
        let old_complete = game.research_complete
        game.research_complete = new Array(38).fill(0)
        let old_data = game.data
        game.data = new Array(38).fill(0)
        for (let i = 0; i < 29; i++) {
            game.research_complete[i] = old_complete[i]
            game.data[i] = old_data[i]
        }
        if (game.data[23] >= 2 * 10 ** 15) game.data[23] = 5 * 10 ** 15
        if (game.data[24] >= 6.9 * 10 ** 15) game.data[24] = 3 * 10 ** 16
        if (game.data[25] >= 1.8 * 10 ** 18) game.data[25] = 6 * 10 ** 19
        if (game.data[26] >= 10 ** 20) game.data[26] = 4 * 10 ** 20
        if (game.data[27] >= 3 * 10 ** 20) game.data[27] = 10 ** 21
        if (game.data[28] >= 4.2 * 10 ** 21) game.data[28] = 2.8 * 10 ** 24
        game.total_rainbow_antispice = 0
        game.antispice_bought = new Array(10).fill(false)
        game.antispice_order = new Array(8).fill(false)

        game.autosc_toggle = false

        game.highest_red_spice = new Decimal(5)
        game.highest_yellow_spice = new Decimal(5)
        game.highest_green_spice = new Decimal(5)
        game.highest_blue_spice = new Decimal(5)
        game.highest_pink_spice = new Decimal(5)
        game.highest_crystal_spice = new Decimal(0)
        game.highest_arcane_spice = new Decimal(0)

        game.limit_active = false
        game.realm_limit = new Decimal("3.3383819898588070e+154271828182845904")
        game.red_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.yellow_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.green_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.blue_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.pink_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.crystal_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
        game.arcane_limit = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
        ]
    }
    if (major <= 6) {
        if ((major === 6 && minor < 2) || major < 6) {
            game.resource_efficiency = false
            game.reduce_flashing = false

            game.peak_rainbow_gain = "0"
            game.peak_rainbow_boosts = 0
            game.peak_rainbow_amount = "0"
            game.peak_rainbow_time = 0

            game.peak_ansuz_gain = 0
            game.peak_ansuz_amount = 0
            game.peak_ansuz_time = 0

            game.peak_atomic_gain = "0"
            game.peak_atomic_amount = "0"
            game.peak_atomic_time = 0
        }

        if ((major === 6 && minor < 4) || major < 6) {
            game.prestige_real_time_history = new Array(10).fill(-1)
            game.ascend_real_time_history = new Array(10).fill(-1)
            game.ascend_challenge_history = new Array(10).fill(-1)
            game.collapse_real_time_history = new Array(10).fill(-1)
            game.collapse_challenge_history = new Array(10).fill(-1)
        }
    }

    game.version = "1.6.4"

    game.realm_limit = new Decimal(game.realm_limit)

    if (
        game.realm_limit.cmp(Decimal.pow(10, 10 ** 17)) === 0 ||
        game.realm_limit.cmp(Decimal.pow(10, 1.54 * 10 ** 17)) === 0
    ) {
        game.realm_limit = new Decimal("3.3383819898588070e+154271828182845904")

        if (game.limit_active) {
            game.limit_active = false
            for (let i = 0; i < 6; i++) {
                game.red_limit[i] = new Decimal(0)
                game.yellow_limit[i] = new Decimal(0)
                game.green_limit[i] = new Decimal(0)
                game.blue_limit[i] = new Decimal(0)
                game.pink_limit[i] = new Decimal(0)
                game.crystal_limit[i] = new Decimal(0)
                game.arcane_limit[i] = new Decimal(0)
            }
        }
    }

    game.red_spice = new Decimal(game.red_spice)
    game.highest_red_spice = new Decimal(game.highest_red_spice)
    game.red_strengthener_price = new Decimal(game.red_strengthener_price)
    game.yellow_spice = new Decimal(game.yellow_spice)
    game.highest_yellow_spice = new Decimal(game.highest_yellow_spice)
    game.yellow_strengthener_price = new Decimal(game.yellow_strengthener_price)
    game.green_spice = new Decimal(game.green_spice)
    game.highest_green_spice = new Decimal(game.highest_green_spice)
    game.green_strengthener_price = new Decimal(game.green_strengthener_price)
    game.blue_spice = new Decimal(game.blue_spice)
    game.highest_blue_spice = new Decimal(game.highest_blue_spice)
    game.blue_strengthener_price = new Decimal(game.blue_strengthener_price)
    game.pink_spice = new Decimal(game.pink_spice)
    game.highest_pink_spice = new Decimal(game.highest_pink_spice)
    game.pink_strengthener_price = new Decimal(game.pink_strengthener_price)
    game.total_spice = new Decimal(game.total_spice)
    game.rainbow_spice = new Decimal(game.rainbow_spice)
    game.crystal_spice = new Decimal(game.crystal_spice)
    game.highest_crystal_spice = new Decimal(game.highest_crystal_spice)
    game.crystal_strengthener_price = new Decimal(
        game.crystal_strengthener_price
    )
    game.crystal_infusion = BigInt(game.crystal_infusion)
    game.crystal_infusion_price = new Decimal(game.crystal_infusion_price)
    game.arcane_spice = new Decimal(game.arcane_spice)
    game.highest_arcane_spice = new Decimal(game.highest_arcane_spice)
    game.arcane_enchantment = BigInt(game.arcane_enchantment)
    game.free_enchantment = BigInt(game.free_enchantment)
    game.arcane_enchantment_price = new Decimal(game.arcane_enchantment_price)
    for (let i = 0; i < 6; i++) {
        game.red_spice_gen[i] = new Decimal(game.red_spice_gen[i])
        game.red_spice_bought[i] = BigInt(game.red_spice_bought[i])
        game.red_spice_price[i] = new Decimal(game.red_spice_price[i])
        game.red_spice_boost[i] = new Decimal(game.red_spice_boost[i])
        game.total_red_spice_boost[i] = new Decimal(
            game.total_red_spice_boost[i]
        )
        game.red_limit[i] = new Decimal(game.red_limit[i])
        game.yellow_spice_gen[i] = new Decimal(game.yellow_spice_gen[i])
        game.yellow_spice_bought[i] = BigInt(game.yellow_spice_bought[i])
        game.yellow_spice_price[i] = new Decimal(game.yellow_spice_price[i])
        game.yellow_spice_boost[i] = new Decimal(game.yellow_spice_boost[i])
        game.total_yellow_spice_boost[i] = new Decimal(
            game.total_yellow_spice_boost[i]
        )
        game.yellow_limit[i] = new Decimal(game.yellow_limit[i])
        game.green_spice_gen[i] = new Decimal(game.green_spice_gen[i])
        game.green_spice_bought[i] = BigInt(game.green_spice_bought[i])
        game.green_spice_price[i] = new Decimal(game.green_spice_price[i])
        game.green_spice_boost[i] = new Decimal(game.green_spice_boost[i])
        game.total_green_spice_boost[i] = new Decimal(
            game.total_green_spice_boost[i]
        )
        game.green_limit[i] = new Decimal(game.green_limit[i])
        game.blue_spice_gen[i] = new Decimal(game.blue_spice_gen[i])
        game.blue_spice_bought[i] = BigInt(game.blue_spice_bought[i])
        game.blue_spice_price[i] = new Decimal(game.blue_spice_price[i])
        game.blue_spice_boost[i] = new Decimal(game.blue_spice_boost[i])
        game.total_blue_spice_boost[i] = new Decimal(
            game.total_blue_spice_boost[i]
        )
        game.blue_limit[i] = new Decimal(game.blue_limit[i])
        game.pink_spice_gen[i] = new Decimal(game.pink_spice_gen[i])
        game.pink_spice_bought[i] = BigInt(game.pink_spice_bought[i])
        game.pink_spice_price[i] = new Decimal(game.pink_spice_price[i])
        game.pink_spice_boost[i] = new Decimal(game.pink_spice_boost[i])
        game.total_pink_spice_boost[i] = new Decimal(
            game.total_pink_spice_boost[i]
        )
        game.pink_limit[i] = new Decimal(game.pink_limit[i])
        game.crystal_spice_gen[i] = new Decimal(game.crystal_spice_gen[i])
        game.crystal_spice_bought[i] = BigInt(game.crystal_spice_bought[i])
        game.crystal_spice_price[i] = new Decimal(game.crystal_spice_price[i])
        game.crystal_spice_boost[i] = new Decimal(game.crystal_spice_boost[i])
        game.total_crystal_spice_boost[i] = new Decimal(
            game.total_crystal_spice_boost[i]
        )
        game.crystal_limit[i] = new Decimal(game.crystal_limit[i])
        game.arcane_spice_gen[i] = new Decimal(game.arcane_spice_gen[i])
        game.arcane_spice_bought[i] = BigInt(game.arcane_spice_bought[i])
        game.arcane_spice_boost[i] = new Decimal(game.arcane_spice_boost[i])
        game.total_arcane_spice_boost[i] = new Decimal(
            game.total_arcane_spice_boost[i]
        )
        game.arcane_limit[i] = new Decimal(game.arcane_limit[i])
    }
    game.atomic_spice = new Decimal(game.atomic_spice)
    game.unstable_spice = new Decimal(game.unstable_spice)
    game.total_unstable_spice = new Decimal(game.total_unstable_spice)
    game.decayed_spice = new Decimal(game.decayed_spice)
    game.unstable_boost = new Decimal(game.unstable_boost)
    game.collapse_spice = new Decimal(game.collapse_spice)
    game.free_deity = new Decimal(game.free_deity)

    if (game.prestige_price !== undefined) {
        for (const u of prestige_upgrade.upgrades) {
            u.price = new Decimal(game.prestige_price[u.id])
        }
    }

    game.pending_goal = new Decimal(game.pending_goal)

    game.autopr_goal[1] = new Decimal(game.autopr_goal[1])
    game.autopr_delta[1] = new Decimal(game.autopr_delta[1])
    game.autopr_goal2[1] = new Decimal(game.autopr_goal2[1])
    game.autoco_goal[0] = new Decimal(game.autoco_goal[0])
    game.autoco_stop[0] = new Decimal(game.autoco_stop[0])

    for (let i = 0; i < 10; i++) {
        if (game.prestige_amount_history[i] !== -1) {
            game.prestige_amount_history[i] = new Decimal(
                game.prestige_amount_history[i]
            )
        }
        if (game.collapse_amount_history[i] !== -1) {
            game.collapse_amount_history[i] = new Decimal(
                game.collapse_amount_history[i]
            )
        }
    }

    for (let i = 0; i < 6; i++) {
        game.antispice[i] = new Decimal(game.antispice[i])
    }
    for (let i = 0; i < 7; i++) {
        game.spent_atomic_spice[i] = new Decimal(game.spent_atomic_spice[i])
    }
    for (let i = 1; i < 7; i++) {
        game.antitotal_spice[i] = new Decimal(game.antitotal_spice[i])
    }

    game.peak_rainbow_gain = new Decimal(game.peak_rainbow_gain)
    game.peak_rainbow_amount = new Decimal(game.peak_rainbow_amount)
    game.peak_atomic_gain = new Decimal(game.peak_atomic_gain)
    game.peak_atomic_amount = new Decimal(game.peak_atomic_amount)

    goto_tab(game.tab)
    if (game.tab === 0) goto_subtab(game.subtab[0])
    if (game.tab === 1) goto_subtab(game.subtab[1])
    if (game.tab === 2) goto_subtab(game.subtab[3])
    if (game.tab === 3) goto_subtab(game.subtab[4])
    if (game.tab === 5) goto_subtab(game.subtab[2])

    auto_toggle("red")
    auto_toggle("red")
    auto_toggle("yellow")
    auto_toggle("yellow")
    auto_toggle("green")
    auto_toggle("green")
    auto_toggle("blue")
    auto_toggle("blue")
    auto_toggle("pink")
    auto_toggle("pink")
    auto_toggle("boost")
    auto_toggle("boost")
    auto_toggle("infusion")
    auto_toggle("infusion")
    auto_toggle("prestige")
    auto_toggle("prestige")
    auto_toggle("prestige_mode")
    auto_toggle("prestige_mode")
    auto_toggle("prestige_mode")
    auto_toggle("prestige_upgrade")
    auto_toggle("prestige_upgrade")
    auto_toggle("crystal")
    auto_toggle("crystal")
    auto_toggle("ascend", true)
    auto_toggle("ascend", true)
    auto_toggle("enchantment")
    auto_toggle("enchantment")
    auto_toggle("ascend_mode")
    auto_toggle("ascend_mode")
    auto_toggle("ascend_upgrade")
    auto_toggle("ascend_upgrade")
    auto_toggle("collapse", true)
    auto_toggle("collapse", true)
    auto_toggle("collapse_mode")
    auto_toggle("collapse_mode")
    auto_toggle("collider")
    auto_toggle("collider")

    notation(game.notation)
    hotkeys()
    hotkeys()
    condensed()
    condensed()
    confirmations("ascend", true)
    confirmations("ascend", true)
    confirmations("collapse", true)
    confirmations("collapse", true)
    confirmations("challenge")
    confirmations("challenge")
    exponent_notation(game.exponent_notation)
    high_visibility()
    high_visibility()
    refresh_rate(game.refresh_rate)
    animations()
    animations()
    resource_efficiency()
    resource_efficiency()
    reduce_flashing()
    reduce_flashing()

    document.getElementById("p_boosts_input").value = game.autopr_goal[0]
    document.getElementById("p_boosts_input2").value = game.autopr_delta[0]
    document.getElementById("p_spice_input").value = game.autopr_goal[1]
    document.getElementById("p_spice_input2").value = game.autopr_delta[1]
    document.getElementById("p_time_input").value = game.autopr_goal[2]
    document.getElementById("a_runes_input").value = game.autoas_goal[0]
    document.getElementById("a_time_input").value = game.autoas_goal[1]
    document.getElementById("au_portion_input").value =
        game.autods_portion[0] * 100
    document.getElementById("au_portion_input2").value =
        game.autods_portion[0] * 100
    document.getElementById("ar_portion_input").value =
        game.autods_portion[1] * 100
    document.getElementById("aa_portion_input").value =
        game.autods_portion[2] * 100
    document.getElementById("ar_portion_input2").value =
        game.autods_portion[3] * 100
    document.getElementById("aa_portion_input2").value =
        game.autods_portion[4] * 100
    document.getElementById("co_spice_input").value = game.autoco_goal[0]
    document.getElementById("co_spice_input2").value = game.autoco_stop[0]
    document.getElementById("co_time_input").value = game.autoco_goal[1]
    document.getElementById("co_time_input2").value = game.autoco_stop[1]
    document.getElementById("collider_input").value = game.atomic_portion * 100
}

//load the game when opened
load(JSON.parse(localStorage.getItem("spice_idle_save")))

//setting up the tick loop
function tick_loop() {
    let start_time = Date.now()
    let delta_ms = undefined
    let delta_ticks = 1
    if (delta_time === undefined) {
        delta_time = game.tickspeed / game.gamespeed
    } else {
        if (Date.now() < tick_time) tick_time = Date.now()
        if (Date.now() > tick_time + 3600000) tick_time = Date.now() - 3600000

        delta_ms = Date.now() - tick_time
        delta_time = 1000 / (delta_ms * game.gamespeed)
        delta_ticks = Math.floor((delta_ms * game.tickspeed) / 1000)
    }

    tick_time = Date.now()

    if (delta_ms >= 100) {
        if (delta_ticks > 60 * game.tickspeed) delta_ticks = 60 * game.tickspeed
        delta_time *= delta_ticks
        while (delta_ticks > 0) {
            tick()
            delta_ticks--
        }
    } else {
        tick()
    }
    hotkey_tick()
    if (collider.enabled) collider_tick()

    let end_time = Date.now()
    let total_time = end_time - start_time
    if (total_time < 0) total_time = 0
    if (total_time < 1000 / game.tickspeed) {
        window.setTimeout(tick_loop, 1000 / game.tickspeed - total_time)
    } else {
        tick_loop()
    }
}

//setting up the graphics loop
function graphics_loop() {
    let start_time = Date.now()
    tabs_update()
    if (game.tab === 0) spice_update()
    if (game.tab === 1) {
        prestige_update()
        crystal_update()
    }
    if (game.tab === 2) {
        ascension_update()
        arcane_update()
    }
    if (game.tab === 3) {
        collapse_update()
        research_update()
        antispice_update()
    }
    if (game.tab === 5) stats_update()
    if (game.tab === 6) settings_update()

    let end_time = Date.now()
    let total_time = end_time - start_time
    if (total_time < 0) total_time = 0
    if (total_time < game.refresh_rate) {
        window.setTimeout(graphics_loop, game.refresh_rate - total_time)
    } else {
        graphics_loop()
    }
}

tick_loop()
graphics_loop()

//setting up the autosave loop
let save_loop = window.setInterval(function () {
    save()
}, 60000)
