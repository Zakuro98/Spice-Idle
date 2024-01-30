let tick_time = Date.now()
let delta_time = undefined
let pause = false
let pause_time

//game operations run every tick
function tick() {
    let reward_scaling = 1
    let reward_scaling9 = 1
    if (game.antispice_bought[1]) {
        reward_scaling = 1.05
        reward_scaling9 = 1.0703893278913979
    }
    if (game.collapse_challenge === 9) {
        game.gamespeed = 0.00001
    } else {
        if (game.collapse_complete[2] >= 7)
            game.gamespeed =
                (32 * factorial(game.collapse_complete[2] - 4)) **
                reward_scaling9
        else game.gamespeed = 2 ** (game.collapse_complete[2] * reward_scaling9)

        if (game.antispice_bought[7]) game.gamespeed = game.gamespeed ** 1.25
    }

    game.total_time_played += 1 / delta_time
    game.prestige_time_played += 1 / delta_time
    game.ascend_time_played += 1 / delta_time
    game.collapse_time_played += 1 / delta_time

    game.ascend_challenge_timer += 1 / (delta_time * game.gamespeed)
    game.atomic_timer += 1 / (delta_time * game.gamespeed)

    for (let i = 0; i < 4; i++) {
        game.real_time_played[i] += 1 / (delta_time * game.gamespeed)
    }

    if (game.collapse_time_played > 0.0005 && game.collapse_challenge === 9) {
        if (modal === "none") {
            open_modal(
                "alert",
                "You failed to complete Challenge 9 in less than 500 microseconds, so you have left the Challenge."
            )
        } else {
            c9_modal = true
        }
        exit_collapse_challenge()
    }

    if (modal === "none" && c9_modal) {
        open_modal(
            "alert",
            "You failed to complete Challenge 9 in less than 500 microseconds, so you have left the Challenge."
        )
        c9_modal = false
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
        antispice_boosts =
            1 + get_antispice_amount("yellow").log(10) ** (2 / 3) * 40
        if (game.collapse_challenge !== 0)
            antispice_boosts =
                1 + get_antispice_amount("yellow").log(10) ** (2 / 3) * 20
    }

    if (game.antispice_bought[4]) antispice_boosts *= 1.175

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

        if (game.ascend_challenge === 6 || game.collapse_challenge === 12) {
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

        if (game.ascend_challenge === 6 || game.collapse_challenge === 12) {
            game.global_spice_boost = Decimal.pow(
                2,
                (game.color_boosts * 2 - 4) * antispice_boosts
            )
        }
    }

    if (
        game.prestige_bought[1] >= 1 &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 12
    ) {
        if (game.ascend_bought[1]) {
            if (game.prestige >= 1000000) {
                game.global_spice_boost = game.global_spice_boost.mul(
                    Decimal.pow(
                        1e25,
                        10 * (game.prestige - 914447) ** 0.25 + 829.5
                    )
                )
            } else {
                game.global_spice_boost = game.global_spice_boost.mul(
                    Decimal.pow(
                        1e25,
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
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 12
    )
        game.global_spice_boost = game.global_spice_boost.mul(
            game.rainbow_spice.div(256).pow(5).add(1)
        )

    let antispice_infusions = 1
    if (game.antispice[3].cmp(1) >= 0) {
        antispice_infusions =
            1 + get_antispice_amount("green").log(10) ** 0.5 * 0.15
        if (game.collapse_challenge !== 0)
            antispice_infusions =
                1 + get_antispice_amount("green").log(10) ** 0.5 * 0.075
    }

    if (game.antispice_bought[5]) antispice_infusions *= 1.06

    let free_infusions = game.prestige_bought[20] * 12
    if (game.prestige_bought[20] >= 6)
        free_infusions =
            game.prestige_bought[20] ** 2 + 3 * game.prestige_bought[20] + 20
    if (game.prestige_bought[20] >= 13)
        free_infusions =
            2 * game.prestige_bought[20] ** 2 -
            22 * game.prestige_bought[20] +
            176
    if (game.ascend_complete[2] && game.ascend_bought[24]) {
        if (game.ascend_challenge !== 6 && game.collapse_challenge !== 12)
            game.global_spice_boost = game.global_spice_boost.mul(
                Decimal.pow(
                    5,
                    (
                        game.crystal_infusion + BigInt(free_infusions)
                    ).toString() *
                        24 *
                        antispice_infusions
                )
            )
        else
            game.global_spice_boost = game.global_spice_boost.mul(
                Decimal.pow(
                    5,
                    (
                        game.crystal_infusion + BigInt(free_infusions)
                    ).toString() *
                        19.2 *
                        antispice_infusions
                )
            )
    } else if (
        game.ascend_bought[7] &&
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 12
    ) {
        game.global_spice_boost = game.global_spice_boost.mul(
            Decimal.pow(
                5,
                (game.crystal_infusion + BigInt(free_infusions)).toString() *
                    20 *
                    antispice_infusions
            )
        )
    } else {
        game.global_spice_boost = game.global_spice_boost.mul(
            Decimal.pow(
                5,
                (game.crystal_infusion + BigInt(free_infusions)).toString() *
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

    if (game.unstable_spice.cmp(0.5) <= 0 && game.decay_time === 0) {
        game.decay_time = game.real_time_played[3]
    }

    let decayed_amount = game.decayed_spice
    if (decayed_amount.cmp(Decimal.pow(10, 400)) >= 0) {
        decayed_amount = decayed_amount
            .div(Decimal.pow(10, 400))
            .pow(1 / 3)
            .mul(Decimal.pow(10, 400))
    }

    if (game.decayed_spice.cmp(1) >= 0) {
        if (game.ascend_challenge !== 0)
            game.unstable_boost = decayed_amount
                .add(1)
                .pow(
                    Decimal.pow(
                        16777216,
                        game.decayed_spice
                            .div(game.total_unstable_spice)
                            .mul(0.6)
                    )
                )
        else
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

    if (game.research_complete[16] >= 1 && game.collapse_challenge !== 12) {
        if (game.unstable_spice.round().cmp(1) === -1) {
            game.unstable_boost = game.unstable_boost.pow(1.2)
        }
    }

    if (game.research_complete[19] >= 1 && game.collapse_challenge !== 12) {
        if (game.atomic_spice.cmp(1) >= 0) {
            let amount = game.atomic_spice.log(10) * 0.0008888

            if (amount > 1) {
                amount = (amount - 1) / 3 + 2
                if (amount > 3) amount = 4 - 1 / (amount - 2)
                game.unstable_boost = game.unstable_boost.pow(amount)
            } else {
                game.unstable_boost = game.unstable_boost.pow(amount + 1)
            }
        }
    }

    if (game.collapse_challenge === 8) {
        game.unstable_boost = new Decimal(1)
        game.free_deity = game.decayed_spice
            .pow(game.decayed_spice.div(game.total_unstable_spice).div(10))
            .pow(game.atomic_spice.log(10) * 0.0004444 + 1)
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
        if (game.ascend_challenge === 6 || game.collapse_challenge === 12) {
            game.total_red_spice_boost[i] = game.red_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    (game.red_strengthener +
                        game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_yellow_spice_boost[i] = game.yellow_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    (game.yellow_strengthener +
                        game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_green_spice_boost[i] = game.green_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    (game.green_strengthener +
                        game.blue_strengthener +
                        game.pink_strengthener) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_blue_spice_boost[i] = game.blue_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    (game.blue_strengthener + game.pink_strengthener) *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
            )
            game.total_pink_spice_boost[i] = game.pink_spice_boost[i].mul(
                Decimal.pow(
                    2,
                    game.pink_strengthener *
                        (1 +
                            2 *
                                game.ascend_complete[2] *
                                game.ascend_bought[24])
                ).pow(antispice_boosts)
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
            game.ascend_challenge !== 6 &&
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
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_power =
                    1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 +
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075

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
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            let effective_red_spice = game.highest_red_spice
            if (game.highest_red_spice.cmp(Decimal.pow(10, 1e12)) >= 0)
                effective_red_spice = Decimal.pow(
                    10,
                    1e12 * (game.highest_red_spice.log(10) / 1e12) ** 0.5
                )

            if (game.ascend_bought[0]) {
                if (game.antispice[1].cmp(1) >= 0) {
                    let antispice_power =
                        1 +
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
                    if (game.collapse_challenge !== 0)
                        antispice_power =
                            1 +
                            get_antispice_amount("red").log(10) ** (2 / 3) *
                                0.0075

                    game.total_yellow_spice_boost[i] =
                        game.total_yellow_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.01)
                                .add(1)
                                .pow(antispice_power)
                        )
                    game.total_green_spice_boost[i] =
                        game.total_green_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.01)
                                .add(1)
                                .pow(antispice_power)
                        )
                    game.total_blue_spice_boost[i] =
                        game.total_blue_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.01)
                                .add(1)
                                .pow(antispice_power)
                        )
                    game.total_pink_spice_boost[i] =
                        game.total_pink_spice_boost[i].mul(
                            effective_red_spice
                                .pow(0.01)
                                .add(1)
                                .pow(antispice_power)
                        )
                } else {
                    game.total_yellow_spice_boost[i] =
                        game.total_yellow_spice_boost[i].mul(
                            effective_red_spice.pow(0.01).add(1)
                        )
                    game.total_green_spice_boost[i] =
                        game.total_green_spice_boost[i].mul(
                            effective_red_spice.pow(0.01).add(1)
                        )
                    game.total_blue_spice_boost[i] =
                        game.total_blue_spice_boost[i].mul(
                            effective_red_spice.pow(0.01).add(1)
                        )
                    game.total_pink_spice_boost[i] =
                        game.total_pink_spice_boost[i].mul(
                            effective_red_spice.pow(0.01).add(1)
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
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_power =
                    1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 +
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075

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
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_power =
                    1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 +
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075

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
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(Decimal.pow(1.0135, game.color_boosts))
        }

        if (
            game.prestige_bought[19] >= 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
                Decimal.pow(
                    1.08 + 0.04 * game.ascend_bought[6],
                    (
                        game.crystal_infusion + BigInt(free_infusions)
                    ).toString() * antispice_infusions
                )
            )
        }

        if (
            game.prestige_bought[21] >= 1 &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            let exponent =
                1 /
                    (9 *
                        (1 +
                            Math.E **
                                (Math.log10(
                                    game.rainbow_spice.div(Decimal.pow(2, 466))
                                ) /
                                    8))) +
                11 / 9
            game.total_crystal_spice_boost[i] = game.total_crystal_spice_boost[
                i
            ].mul(
                game.rainbow_spice
                    .div(Decimal.pow(2, 292.5))
                    .pow(exponent)
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
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            let effective_pink_spice = game.highest_pink_spice
            if (game.highest_pink_spice.cmp(Decimal.pow(10, 2.5e11)) >= 0)
                effective_pink_spice = Decimal.pow(
                    10,
                    2.5e11 * (game.highest_pink_spice.log(10) / 2.5e11) ** 0.5
                )

            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_power =
                    1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 +
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075

                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_pink_spice
                            .pow(0.00016)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_pink_spice.pow(0.00016).add(1)
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
                        180 *
                        antispice_infusions
                )
            )

        if (
            game.ascend_bought[18] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            let effective_red_spice = game.highest_red_spice
            if (game.highest_red_spice.cmp(Decimal.pow(10, 1e12)) >= 0)
                effective_red_spice = Decimal.pow(
                    10,
                    1e12 * (game.highest_red_spice.log(10) / 1e12) ** 0.5
                )

            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_power =
                    1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 +
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075

                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_red_spice
                            .pow(0.00005)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        effective_red_spice.pow(0.00005).add(1)
                    )
            }
        }

        if (game.arcane_strengthener >= 1)
            game.total_arcane_spice_boost[i] = game.arcane_spice_boost[i].mul(
                Decimal.pow(9, game.arcane_strengthener).pow(antispice_boosts)
            )
        else game.total_arcane_spice_boost[i] = game.arcane_spice_boost[i]

        if (
            game.ascend_bought[19] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
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
                                ascension_upgrade.upgrades[25].price.log(10)) /
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
                                ascension_upgrade.upgrades[28].price.log(10)) /
                                scale -
                                Math.PI / 2
                        )
            }
            if (
                game.ansuz.cmp(ascension_upgrade.upgrades[28].price.pow(2)) >= 0
            )
                exponent = 1.6

            game.total_arcane_spice_boost[i] = game.total_arcane_spice_boost[
                i
            ].mul(game.ansuz.div(1.2379705696153568e62).add(1).pow(exponent))
        }

        if (
            game.ascend_bought[22] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_power =
                    1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 +
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075

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
                        game.highest_arcane_spice.pow(20).add(1)
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
                    13 / 12,
                    (
                        game.arcane_enchantment + game.free_enchantment
                    ).toString() * antispice_infusions
                )
            )
        }

        if (
            game.ascend_bought[30] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            let effective_red_spice = game.highest_red_spice
            if (game.highest_red_spice.cmp(Decimal.pow(10, 1e12)) >= 0)
                effective_red_spice = Decimal.pow(
                    10,
                    1e12 * (game.highest_red_spice.log(10) / 1e12) ** 0.5
                )

            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_power =
                    1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 +
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075

                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        effective_red_spice
                            .pow(0.0000000825)
                            .add(1)
                            .pow(antispice_power)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        effective_red_spice.pow(0.0000000825).add(1)
                    )
            }
        }

        if (
            game.ascend_bought[31] &&
            game.ascend_challenge !== 6 &&
            game.collapse_challenge !== 12
        ) {
            if (game.antispice[1].cmp(1) >= 0) {
                let antispice_power =
                    1 + get_antispice_amount("red").log(10) ** (2 / 3) * 0.015
                if (game.collapse_challenge !== 0)
                    antispice_power =
                        1 +
                        get_antispice_amount("red").log(10) ** (2 / 3) * 0.0075

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
            ].mul(game.unstable_boost.pow(0.015))
        }

        if (game.research_complete[10] >= 1 && game.collapse_challenge !== 12) {
            game.total_arcane_spice_boost[i] = game.total_arcane_spice_boost[
                i
            ].mul(game.unstable_boost.pow(0.000012))
        }

        if (game.antispice[0].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(
                            get_antispice_amount("pure", true),
                            7500
                        ).add(1)
                    )
            } else {
                game.total_arcane_spice_boost[i] =
                    game.total_arcane_spice_boost[i].mul(
                        Decimal.pow(
                            get_antispice_amount("pure", true),
                            15000
                        ).add(1)
                    )
            }
        }

        if (game.antispice[1].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(
                    Decimal.pow(get_antispice_amount("red", true), 1.25e9).add(
                        1
                    )
                )
            } else {
                game.total_red_spice_boost[i] = game.total_red_spice_boost[
                    i
                ].mul(
                    Decimal.pow(get_antispice_amount("red", true), 2.5e9).add(1)
                )
            }
        }

        if (game.antispice[2].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        Decimal.pow(
                            get_antispice_amount("yellow", true),
                            1.125e9
                        )
                            .mul(Decimal.pow(10, 3.5e9))
                            .add(1)
                    )
            } else {
                game.total_yellow_spice_boost[i] =
                    game.total_yellow_spice_boost[i].mul(
                        Decimal.pow(
                            get_antispice_amount("yellow", true),
                            2.25e9
                        )
                            .mul(Decimal.pow(10, 7e9))
                            .add(1)
                    )
            }
        }

        if (game.antispice[3].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(
                    get_antispice_amount("green", true)
                        .pow(1.05e9)
                        .mul(Decimal.pow(10, 1e10))
                        .add(1)
                )
            } else {
                game.total_green_spice_boost[i] = game.total_green_spice_boost[
                    i
                ].mul(
                    get_antispice_amount("green", true)
                        .pow(2.1e9)
                        .mul(Decimal.pow(10, 2e10))
                        .add(1)
                )
            }
        }

        if (game.antispice[4].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(
                    Decimal.pow(get_antispice_amount("blue", true), 1e9)
                        .mul(Decimal.pow(10, 3.75e10))
                        .add(1)
                )
            } else {
                game.total_blue_spice_boost[i] = game.total_blue_spice_boost[
                    i
                ].mul(
                    Decimal.pow(get_antispice_amount("blue", true), 2e9)
                        .mul(Decimal.pow(10, 7.5e10))
                        .add(1)
                )
            }
        }

        if (game.antispice[5].cmp(1) >= 0) {
            if (game.collapse_challenge !== 0) {
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(
                    Decimal.pow(get_antispice_amount("pink", true), 1e9)
                        .mul(Decimal.pow(10, 6e10))
                        .add(1)
                )
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        Decimal.pow(
                            get_antispice_amount("crystal", true),
                            2.5e7
                        )
                            .mul(Decimal.pow(10, 1e9))
                            .add(1)
                    )
            } else {
                game.total_pink_spice_boost[i] = game.total_pink_spice_boost[
                    i
                ].mul(
                    Decimal.pow(get_antispice_amount("pink", true), 2e9)
                        .mul(Decimal.pow(10, 1.2e11))
                        .add(1)
                )
                game.total_crystal_spice_boost[i] =
                    game.total_crystal_spice_boost[i].mul(
                        Decimal.pow(get_antispice_amount("crystal", true), 5e7)
                            .mul(Decimal.pow(10, 2e9))
                            .add(1)
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
        game.ascend_challenge !== 6 &&
        game.collapse_challenge !== 12
    ) {
        if (game.ascend_complete[1] && game.ascend_bought[20]) {
            game.total_crystal_spice_boost[0] =
                game.total_crystal_spice_boost[0].pow(1.5)
            game.total_crystal_spice_boost[1] =
                game.total_crystal_spice_boost[1].pow(1.4)
            game.total_crystal_spice_boost[2] =
                game.total_crystal_spice_boost[2].pow(1.3)
            game.total_crystal_spice_boost[3] =
                game.total_crystal_spice_boost[3].pow(1.2)
            game.total_crystal_spice_boost[4] =
                game.total_crystal_spice_boost[4].pow(1.1)
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
    } else if (
        game.ascend_complete[1] &&
        game.ascend_bought[20] &&
        (game.ascend_challenge === 6 || game.collapse_challenge === 12)
    ) {
        game.total_crystal_spice_boost[0] =
            game.total_crystal_spice_boost[0].pow(1.25)
        game.total_crystal_spice_boost[1] =
            game.total_crystal_spice_boost[1].pow(1.2)
        game.total_crystal_spice_boost[2] =
            game.total_crystal_spice_boost[2].pow(1.15)
        game.total_crystal_spice_boost[3] =
            game.total_crystal_spice_boost[3].pow(1.1)
        game.total_crystal_spice_boost[4] =
            game.total_crystal_spice_boost[4].pow(1.05)
    }

    if (game.ascend_complete[3] && game.ascend_bought[27]) {
        let powers = [1.03, 1.06, 1.1]
        for (let i = 0; i < 3; i++) {
            game.total_red_spice_boost[i + 3] = game.total_red_spice_boost[
                i + 3
            ].pow(powers[i])
            game.total_yellow_spice_boost[i + 3] =
                game.total_yellow_spice_boost[i + 3].pow(powers[i])
            game.total_green_spice_boost[i + 3] = game.total_green_spice_boost[
                i + 3
            ].pow(powers[i])
            game.total_blue_spice_boost[i + 3] = game.total_blue_spice_boost[
                i + 3
            ].pow(powers[i])
            game.total_pink_spice_boost[i + 3] = game.total_pink_spice_boost[
                i + 3
            ].pow(powers[i])
            game.total_crystal_spice_boost[i + 3] =
                game.total_crystal_spice_boost[i + 3].pow(powers[i])
            game.total_arcane_spice_boost[i + 3] =
                game.total_arcane_spice_boost[i + 3].pow(powers[i])
        }
    }

    for (let i = 0; i < 6; i++) {
        let antispice_amount = game.antispice[i]

        switch (i) {
            case 0:
                antispice_amount = get_antispice_amount("pure")
                break
            case 1:
                antispice_amount = get_antispice_amount("red")
                break
            case 2:
                antispice_amount = get_antispice_amount("yellow")
                break
            case 3:
                antispice_amount = get_antispice_amount("green")
                break
            case 4:
                antispice_amount = get_antispice_amount("blue")
                break
            case 5:
                antispice_amount = get_antispice_amount("pink")
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
                game.total_red_spice_boost[i].pow(1.01)
            game.total_yellow_spice_boost[i] =
                game.total_yellow_spice_boost[i].pow(1.01)
            game.total_green_spice_boost[i] =
                game.total_green_spice_boost[i].pow(1.01)
            game.total_blue_spice_boost[i] =
                game.total_blue_spice_boost[i].pow(1.01)
            game.total_pink_spice_boost[i] =
                game.total_pink_spice_boost[i].pow(1.01)
            game.total_crystal_spice_boost[i] =
                game.total_crystal_spice_boost[i].pow(1.01)
            game.total_arcane_spice_boost[i] =
                game.total_arcane_spice_boost[i].pow(1.01)
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
        if (!entry_unlocked[19]) entry_unlock(19)

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
                game.arcane_spice_gen[0].floor().pow(36.5).div(delta_time)
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
                    game.research_complete[34] >= 1 &&
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
                    game.ascend_challenge === 0 &&
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
                    if (game.collapse_challenge !== 0) {
                        amount = amount.pow(
                            1 +
                                get_antispice_amount("blue").log(10) ** 0.75 *
                                    0.03
                        )
                    } else {
                        amount = amount.pow(
                            1 +
                                get_antispice_amount("blue").log(10) ** 0.75 *
                                    0.06
                        )
                    }
                }
                if (game.antispice_bought[2]) {
                    amount = amount.pow(1.1)
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

    if (game.autoup_toggle[0] && game.ascend_bought[8]) {
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
    let rune_exp = 2
    if (game.research_complete[3] >= 1 && game.collapse_challenge !== 12) {
        rune_exp = 2 + 0.1 * game.research_complete[3]

        if (game.antispice_bought[0])
            rune_exp = 2 + 0.1 * 1.15 * game.research_complete[3]
    }
    if (game.ascend_challenge === 6 || game.collapse_challenge === 12)
        rune_speed = 0

    for (let i = 0; i < 3; i++) {
        if (game.rune[i].cmp(0) === 0 && game.ascend >= 1) {
            if (game.rune_power[i].cmp(250) >= 0) {
                game.rune_power[i] = game.rune_power[i].add(
                    Decimal.pow(0.5, game.rune_power[i].div(250)).mul(
                        (0.4 * rune_speed) / delta_time
                    )
                )
                game.total_rune_power = game.total_rune_power.add(
                    Decimal.pow(0.5, game.rune_power[i].div(250)).mul(
                        (0.4 * rune_speed) / delta_time
                    )
                )
            } else {
                game.rune_power[i] = game.rune_power[i].add(
                    (0.2 * rune_speed) / delta_time
                )
                game.total_rune_power = game.total_rune_power.add(
                    (0.2 * rune_speed) / delta_time
                )
            }
        } else {
            game.rune_power[i] = game.rune_power[i].add(
                game.rune[i].pow(rune_exp).mul(rune_speed).div(delta_time)
            )
            game.total_rune_power = game.total_rune_power.add(
                game.rune[i].pow(rune_exp).mul(rune_speed).div(delta_time)
            )
        }
    }

    for (let i = 0; i < 3; i++) {
        switch (i) {
            case 0:
                if (game.rune_power[i].cmp(Decimal.pow(10, 200)) >= 0) {
                    game.rune_boost[i] = Decimal.pow(
                        game.rune_power[i].floor().add(1),
                        600 *
                            Decimal.pow(10, 200).floor().div(60).log(60) **
                                (2 / 3)
                    )
                } else if (game.rune_power[i].cmp(3600) >= 0) {
                    game.rune_boost[i] = Decimal.pow(
                        game.rune_power[i].floor().add(1),
                        600 *
                            game.rune_power[i].floor().div(60).log(60) **
                                (2 / 3)
                    )
                } else {
                    game.rune_boost[i] = Decimal.pow(
                        game.rune_power[i].floor().add(1),
                        game.rune_power[i].floor().div(6)
                    )
                }
                break
            case 1:
                if (game.rune_power[i].cmp(Decimal.pow(10, 200)) >= 0) {
                    game.rune_boost[i] = Decimal.pow(
                        game.rune_power[i].floor().add(1),
                        450 *
                            Decimal.pow(10, 200).floor().div(60).log(60) **
                                (2 / 3)
                    )
                } else if (game.rune_power[i].cmp(3600) >= 0) {
                    game.rune_boost[i] = Decimal.pow(
                        game.rune_power[i].floor().add(1),
                        450 *
                            game.rune_power[i].floor().div(60).log(60) **
                                (2 / 3)
                    )
                } else {
                    game.rune_boost[i] = Decimal.pow(
                        game.rune_power[i].floor().add(1),
                        game.rune_power[i].floor().div(8)
                    )
                }
                break
            case 2:
                if (game.rune_power[i].cmp(Decimal.pow(10, 200)) >= 0) {
                    game.rune_boost[i] = Decimal.pow(
                        game.rune_power[i].floor().add(1),
                        300 *
                            Decimal.pow(10, 200).floor().div(60).log(60) **
                                (2 / 3)
                    )
                } else if (game.rune_power[i].cmp(3600) >= 0) {
                    game.rune_boost[i] = Decimal.pow(
                        game.rune_power[i].floor().add(1),
                        300 *
                            game.rune_power[i].floor().div(60).log(60) **
                                (2 / 3)
                    )
                } else {
                    game.rune_boost[i] = Decimal.pow(
                        game.rune_power[i].floor().add(1),
                        game.rune_power[i].floor().div(12)
                    )
                }
                break
        }

        if (game.research_complete[37] >= 1 && game.collapse_challenge !== 12)
            game.rune_boost[i] = game.rune_boost[i].pow(50)
        else if (
            game.research_complete[14] >= 1 &&
            game.collapse_challenge !== 12
        )
            game.rune_boost[i] = game.rune_boost[i].pow(5)
        else if (game.ascend_bought[33])
            game.rune_boost[i] = game.rune_boost[i].pow(3)
        else if (game.ascend_complete[4] && game.ascend_bought[28])
            game.rune_boost[i] = game.rune_boost[i].pow(2)
        else if (game.ascend_bought[26])
            game.rune_boost[i] = game.rune_boost[i].pow(1.5)
    }

    if (game.ansuz.cmp(6) >= 0 && !game.distribute_unlocked)
        game.distribute_unlocked = true
    if (
        game.ansuz.cmp(2.0858168697697163e64) >= 0 &&
        !game.half_distribute_unlocked
    )
        game.half_distribute_unlocked = true

    for (let i = 1; i < 6; i++) {
        if (!game.arcane_unlocked[i]) {
            if (game.arcane_spice_gen[i - 1].cmp(3) >= 0) {
                game.arcane_unlocked[i] = true
            }
        }
    }

    if (game.arcane_spice_bought[5] >= 3n && !game.arcane_max_unlocked) {
        game.arcane_max_unlocked = true
    }

    v = document.getElementById("a_runes_input").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autoas_goal[0] = new Decimal(v)
    else game.autoas_goal[0] = new Decimal(1)

    v = document.getElementById("a_runes_input2").value
    if (Number(v) !== NaN && Number(v) >= 1) game.autoas_delta = new Decimal(v)
    else game.autoas_delta = new Decimal(1)

    game.autoas_goal[1] = Number(document.getElementById("a_time_input").value)
    if (game.autoas_goal[1] === NaN) game.autoas_goal[1] = 30
    if (game.autoas_goal[1] < 0.01) game.autoas_goal[1] = 0.01

    if (
        game.ascend_bought[12] &&
        game.autoas_toggle &&
        game.ascend_challenge === 0
    ) {
        if (game.autoas_mode === 0) {
            if (game.rainbow_spice.cmp(0) === 1) {
                let amount = game.rainbow_spice.pow(1 / 128).div(256)

                if (
                    game.research_complete[12] >= 1 &&
                    game.collapse_challenge !== 12
                ) {
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

                if (
                    game.collapse_complete[4] >= 2 &&
                    game.collapse_challenge !== 11
                ) {
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
                            1 +
                                get_antispice_amount("blue").log(10) ** 0.75 *
                                    0.03
                        )
                    } else {
                        amount = amount.pow(
                            1 +
                                get_antispice_amount("blue").log(10) ** 0.75 *
                                    0.06
                        )
                    }
                }

                if (game.antispice_bought[3]) {
                    amount = amount.pow(1.125)
                }

                if (game.research_complete[8] >= 1) {
                    if (
                        amount
                            .floor()
                            .cmp(game.autoas_goal[0].mul(game.autoas_goal2)) >=
                        0
                    )
                        ascend()
                } else {
                    if (amount.floor().cmp(game.autoas_goal[0]) >= 0) ascend()
                }
            }
        } else if (game.autoas_mode === 1) {
            if (game.real_time_played[2] >= game.autoas_goal[1]) ascend()
        }
    }

    if (game.ascend_bought[25] && game.color_boosts >= 10) {
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

        game.rainbow_spice = game.rainbow_spice.add(amount.div(10 * delta_time))
        game.antitotal_spice[6] = game.antitotal_spice[6].add(
            amount.div(10 * delta_time)
        )
    }

    game.autods_portion = Number(
        document.getElementById("ds_portion_input").value / 100
    )

    if (game.autods_portion === NaN) game.autods_portion = 0.5
    if (game.autods_portion < 0) game.autods_portion = 0
    if (game.autods_portion > 1) game.autods_portion = 1

    if (game.collapse_complete[4] >= 1 && game.collapse_challenge !== 11) {
        let amount = new Decimal(0)
        if (game.rainbow_spice.cmp(Decimal.pow(2, 1024)) >= 0) {
            amount = game.rainbow_spice.pow(1 / 128).div(256)

            if (
                game.research_complete[12] >= 1 &&
                game.collapse_challenge !== 12
            ) {
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

            if (
                game.collapse_complete[4] >= 2 &&
                game.collapse_challenge !== 11
            ) {
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
        }

        game.ansuz = game.ansuz.add(amount.floor().mul(0.01 / delta_time))

        if (game.research_complete[6] >= 1) {
            game.autods_budget = game.autods_budget.add(
                amount
                    .mul(game.autods_portion)
                    .ceil()
                    .mul(0.01 / delta_time)
            )
        }
    }

    if (
        game.research_complete[6] >= 1 &&
        game.autods_toggle &&
        game.autods_budget.cmp(0) === 1
    ) {
        distribute_runes("budget")
    }

    if (
        game.research_complete[4] >= 1 &&
        game.autoup_toggle[1] &&
        game.rune[2].cmp(1) >= 0
    ) {
        for (let i = 0; i < 35; i++) {
            buy_ascension_upgrade(i)
        }
    }

    if (
        game.research_complete[11] >= 1 &&
        game.autoar_toggle &&
        game.ascend_complete[0]
    ) {
        max_all("arcane")
    }

    v = document.getElementById("co_spice_input").value
    if (Number(v) !== NaN && Number(v) >= 1)
        game.autoco_goal[0] = new Decimal(v)
    else game.autoco_goal[0] = new Decimal(1)

    game.autoco_goal[1] = Number(document.getElementById("co_time_input").value)
    if (game.autoco_goal[1] === NaN) game.autoco_goal[1] = 120
    if (game.autoco_goal[1] < 0.01) game.autoco_goal[1] = 0.01

    game.autoco_goal[2] = Number(
        document.getElementById("co_decay_input").value
    )
    if (game.autoco_goal[2] === NaN) game.autoco_goal[1] = 10
    if (game.autoco_goal[2] < 0) game.autoco_goal[1] = 0

    if (
        game.research_complete[17] >= 1 &&
        game.autoco_toggle &&
        game.collapse_challenge === 0
    ) {
        if (game.autoco_mode === 0) {
            let amount = game.collapse_spice.pow(7.125e-10).floor()

            if (amount.cmp(Decimal.pow(10, 670)) >= 0) {
                amount = amount
                    .div(Decimal.pow(10, 130))
                    .pow(80 / ((amount.log(10) * 16 + 729) ** 0.5 + 53))
                    .mul(Decimal.pow(10, 130))

                if (amount.cmp(Decimal.pow(10, 1400)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 1400))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 1400))

                if (amount.cmp(Decimal.pow(10, 10000)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 10000))
                        .pow(100 / ((amount.log(10) - 7500) ** 0.5 + 50))
                        .mul(Decimal.pow(10, 10000))
            } else if (amount.cmp(Decimal.pow(10, 130)) >= 0) {
                amount = amount
                    .div(Decimal.pow(10, 130))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 130))
            }

            if (
                game.research_complete[5] >= 1 &&
                game.collapse_challenge === 0
            ) {
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
                amount = amount.mul(rune_atomic)
            }

            let total_completions = 0
            for (let i = 0; i < 6; i++) {
                total_completions += game.collapse_complete[i]
            }
            if (
                game.research_complete[24] >= 1 &&
                game.collapse_challenge === 0
            )
                amount = amount.mul(Decimal.pow(46656, total_completions))

            if (amount.cmp(game.autoco_goal[0]) >= 0) collapse()
        } else if (game.autoco_mode === 1) {
            if (game.real_time_played[3] >= game.autoco_goal[1]) collapse()
        } else if (game.autoco_mode === 2) {
            if (
                game.unstable_spice.cmp(0.5) === -1 &&
                game.real_time_played[3] >=
                    game.autoco_goal[2] + game.decay_time
            )
                collapse()
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

                if (r === 16) {
                    if (!entry_unlocked[17]) entry_unlock(17)
                }
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

            if (game.data[r] >= goal) {
                game.research_complete[r]++
                game.research_pause = true
                game.research_select = 0
                game.data[r] = 0

                if (r === 7) {
                    if (!entry_unlocked[16]) entry_unlock(16)
                }
            }
        }
    }

    if (game.antispice_bought[0]) {
        game.halflife = 1800 * (0.67 / 1.15) ** game.research_complete[0]
    } else {
        game.halflife = 1800 * 0.67 ** game.research_complete[0]
    }
    if (game.collapse_challenge === 12) game.halflife = 1800

    if (game.research_complete[7] < 4)
        game.atomic_efficiency = 0.6 + 0.1 * game.research_complete[7]
    else game.atomic_efficiency = 0.8 + 0.05 * game.research_complete[7]

    if (game.antispice_bought[0]) {
        game.atomic_efficiency = (game.atomic_efficiency - 0.6) * 1.15 + 0.6
    }

    game.atomic_portion =
        Number(document.getElementById("collider_input").value) / 100
    if (game.atomic_portion === NaN) game.atomic_portion = 1
    if (game.atomic_portion < 0.01) game.atomic_portion = 0.01
    if (game.atomic_portion > 1) game.atomic_portion = 1

    game.atomic_timing = Number(
        document.getElementById("collider_input2").value
    )
    if (game.atomic_portion === NaN) game.atomic_portion = 1
    if (game.atomic_portion < 0.5) game.atomic_portion = 0.5

    game.augment_start = Math.round(
        (2097152 + 2097152 * game.collapse_complete[3]) * reward_scaling
    )

    if (game.research_complete[31] >= 1 && game.collapse_challenge !== 0) {
        game.pending_goal = get_collapse_goal(
            game.collapse_challenge - 7,
            game.pending_completions
        )

        let amount = game.collapse_spice.pow(7.125e-10).floor()

        if (amount.cmp(Decimal.pow(10, 670)) >= 0) {
            amount = amount
                .div(Decimal.pow(10, 130))
                .pow(80 / ((amount.log(10) * 16 + 729) ** 0.5 + 53))
                .mul(Decimal.pow(10, 130))

            if (amount.cmp(Decimal.pow(10, 1400)) >= 0)
                amount = amount
                    .div(Decimal.pow(10, 1400))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 1400))

            if (amount.cmp(Decimal.pow(10, 10000)) >= 0)
                amount = amount
                    .div(Decimal.pow(10, 10000))
                    .pow(100 / ((amount.log(10) - 7500) ** 0.5 + 50))
                    .mul(Decimal.pow(10, 10000))
        } else if (amount.cmp(Decimal.pow(10, 130)) >= 0) {
            amount = amount
                .div(Decimal.pow(10, 130))
                .pow(0.5)
                .mul(Decimal.pow(10, 130))
        }

        if (amount.cmp(game.pending_goal) >= 0) {
            game.pending_completions++
        }
    }

    let rainbow_gain = new Decimal(0)
    if (game.color_boosts <= 16)
        rainbow_gain = new Decimal(2).pow((game.color_boosts - 10) / 3)
    else rainbow_gain = new Decimal(2).pow((game.color_boosts - 8) / 4)
    if (game.research_complete[34] >= 1 && game.collapse_challenge !== 12) {
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
        game.ascend_challenge === 0 &&
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
        if (game.collapse_challenge !== 0) {
            rainbow_gain = rainbow_gain.pow(
                1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.03
            )
        } else {
            rainbow_gain = rainbow_gain.pow(
                1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.06
            )
        }
    }

    if (game.antispice_bought[2]) {
        rainbow_gain = rainbow_gain.pow(1.1)
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

    let ansuz_gain = game.rainbow_spice.pow(1 / 128).div(256)

    if (game.research_complete[12] >= 1 && game.collapse_challenge !== 12) {
        if (game.collapse <= 1224) {
            ansuz_gain = ansuz_gain.mul(
                Decimal.pow(7.27e27, (game.collapse / 10) ** 0.5)
            )
        } else {
            ansuz_gain = ansuz_gain.mul(
                Decimal.pow(7.27e27, (game.collapse - 1013.3) ** 0.25 + 7.2535)
            )
        }
    }

    if (game.collapse_complete[4] >= 2 && game.collapse_challenge !== 11) {
        ansuz_gain = ansuz_gain.mul(
            Decimal.pow(
                3,
                ((game.arcane_enchantment + game.free_enchantment).toString() **
                    0.5 *
                    game.collapse_complete[4] *
                    reward_scaling) /
                    9
            )
        )
    }

    if (game.antispice[4].cmp(1) >= 0) {
        if (game.collapse_challenge !== 0) {
            ansuz_gain = ansuz_gain.pow(
                1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.03
            )
        } else {
            ansuz_gain = ansuz_gain.pow(
                1 + get_antispice_amount("blue").log(10) ** 0.75 * 0.06
            )
        }
    }

    if (game.antispice_bought[3]) {
        ansuz_gain = ansuz_gain.pow(1.125)
    }

    if (
        ansuz_gain
            .floor()
            .div(game.ascend_time_played)
            .cmp(game.peak_ansuz_gain) === 1 &&
        game.ascend_time_played > 0
    ) {
        game.peak_ansuz_gain = ansuz_gain.div(game.ascend_time_played)
        game.peak_ansuz_amount = ansuz_gain
        game.peak_ansuz_time = game.real_time_played[2]
    }

    let atomic_gain = game.collapse_spice.pow(7.125e-10).floor()

    if (atomic_gain.cmp(Decimal.pow(10, 670)) >= 0) {
        atomic_gain = atomic_gain
            .div(Decimal.pow(10, 130))
            .pow(80 / ((atomic_gain.log(10) * 16 + 729) ** 0.5 + 53))
            .mul(Decimal.pow(10, 130))

        if (atomic_gain.cmp(Decimal.pow(10, 1400)) >= 0)
            atomic_gain = atomic_gain
                .div(Decimal.pow(10, 1400))
                .pow(0.5)
                .mul(Decimal.pow(10, 1400))

        if (atomic_gain.cmp(Decimal.pow(10, 10000)) >= 0)
            atomic_gain = atomic_gain
                .div(Decimal.pow(10, 10000))
                .pow(100 / ((atomic_gain.log(10) - 7500) ** 0.5 + 50))
                .mul(Decimal.pow(10, 10000))
    } else if (atomic_gain.cmp(Decimal.pow(10, 130)) >= 0) {
        atomic_gain = atomic_gain
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
        atomic_gain = atomic_gain.mul(rune_atomic)
    }

    let total_completions = 0
    for (let i = 0; i < 6; i++) {
        total_completions += game.collapse_complete[i]
    }
    if (game.research_complete[24] >= 1 && game.collapse_challenge === 0)
        atomic_gain = atomic_gain.mul(Decimal.pow(46656, total_completions))

    if (
        atomic_gain
            .div(game.collapse_time_played)
            .cmp(game.peak_atomic_gain) === 1 &&
        game.ascend_complete[5] &&
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
                    game.atomic_efficiency / 76
                )
                if (amount.cmp(Decimal.pow(10, 170)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 170))
                        .pow(0.6)
                        .mul(Decimal.pow(10, 170))
                if (amount.cmp(Decimal.pow(10, 515)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 515) ** 0.67 * 515
                    )
                if (amount.floor().cmp(game.antispice[0]) >= 0)
                    game.antispice[0] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 2) {
                let red_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[1].log(10) / 1e11) ** 0.5
                ).div(17)
                if (red_amount.cmp(Decimal.pow(10, 2319)) >= 0)
                    red_amount = Decimal.pow(
                        10,
                        (red_amount.log(10) / 2319) ** 0.5 * 2319
                    )

                game.spent_atomic_spice[1] = game.spent_atomic_spice[1].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[1]
                    .pow(game.atomic_efficiency / 228)
                    .div(3.2)
                    .mul(red_amount)
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
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 450) ** 0.5 * 450
                    )
                if (amount.floor().cmp(game.antispice[1]) >= 0)
                    game.antispice[1] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 3) {
                let yellow_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[2].log(10) / 2e11) ** 0.5
                ).div(38.5)
                if (yellow_amount.cmp(Decimal.pow(10, 1019)) >= 0)
                    yellow_amount = Decimal.pow(
                        10,
                        (yellow_amount.log(10) / 1019) ** 0.4 * 1019
                    )

                game.spent_atomic_spice[2] = game.spent_atomic_spice[2].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[2]
                    .pow(game.atomic_efficiency / 304)
                    .div(54)
                    .mul(yellow_amount)
                if (amount.cmp(Decimal.pow(10, 87)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 87))
                        .pow(0.55)
                        .mul(Decimal.pow(10, 87))
                if (amount.cmp(Decimal.pow(10, 372)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 372) ** 0.5 * 372
                    )
                if (amount.floor().cmp(game.antispice[2]) >= 0)
                    game.antispice[2] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 4) {
                let green_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[3].log(10) / 3e11) ** 0.5
                ).div(2340)
                if (green_amount.cmp(Decimal.pow(10, 504)) >= 0)
                    green_amount = Decimal.pow(
                        10,
                        (green_amount.log(10) / 504) ** 0.75 * 504
                    )

                game.spent_atomic_spice[3] = game.spent_atomic_spice[3].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[3]
                    .pow(game.atomic_efficiency / 380)
                    .div(108000)
                    .mul(green_amount)
                if (amount.cmp(Decimal.pow(10, 56)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 56))
                        .pow(0.55)
                        .mul(Decimal.pow(10, 56))
                if (amount.cmp(Decimal.pow(10, 225)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 225) ** 0.5 * 225
                    )
                if (amount.floor().cmp(game.antispice[3]) >= 0)
                    game.antispice[3] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 5) {
                let blue_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[4].log(10) / 5e11) ** 0.5
                ).div(8.667e9)
                if (blue_amount.cmp(Decimal.pow(10, 216)) >= 0)
                    blue_amount = Decimal.pow(
                        10,
                        (blue_amount.log(10) / 216) ** 0.8 * 216
                    )

                game.spent_atomic_spice[4] = game.spent_atomic_spice[4].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[4]
                    .pow(game.atomic_efficiency / 494)
                    .div(5.587e15)
                    .mul(blue_amount)
                if (amount.cmp(Decimal.pow(10, 40)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 40))
                        .pow(0.55)
                        .mul(Decimal.pow(10, 40))
                if (amount.cmp(Decimal.pow(10, 125)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 125) ** 0.5 * 125
                    )
                if (amount.floor().cmp(game.antispice[4]) >= 0)
                    game.antispice[4] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 6) {
                let pink_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[5].log(10) / 8e11) ** 0.5
                ).div(2.255e9)
                if (pink_amount.cmp(Decimal.pow(10, 70)) >= 0)
                    pink_amount = Decimal.pow(
                        10,
                        (pink_amount.log(10) / 70) ** 0.6 * 70
                    )

                game.spent_atomic_spice[5] = game.spent_atomic_spice[5].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[5]
                    .pow(game.atomic_efficiency / 608)
                    .div(8.098e34)
                    .mul(pink_amount)
                if (amount.cmp(Decimal.pow(10, 88)) >= 0)
                    amount = Decimal.pow(10, (amount.log(10) / 88) ** 0.5 * 88)
                if (amount.floor().cmp(game.antispice[5]) >= 0)
                    game.antispice[5] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (collider.type === 7) {
                let rainbow_amount =
                    (game.antitotal_spice[6].log(10) - 28550000) / 5400000
                if (rainbow_amount > 0.5)
                    rainbow_amount =
                        ((rainbow_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
                else rainbow_amount = 0.5
                if (rainbow_amount > 24) rainbow_amount = 24

                game.spent_atomic_spice[6] = game.spent_atomic_spice[6].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let atomic_amount =
                    (game.spent_atomic_spice[6].log(10) - 32768) / 1984
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
                    (game.antitotal_spice[1].log(10) / 1e11) ** 0.5
                ).div(17)
                if (red_amount.cmp(Decimal.pow(10, 2319)) >= 0)
                    red_amount = Decimal.pow(
                        10,
                        (red_amount.log(10) / 2319) ** 0.5 * 2319
                    )
                let yellow_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[2].log(10) / 2e11) ** 0.5
                ).div(38.5)
                if (yellow_amount.cmp(Decimal.pow(10, 1019)) >= 0)
                    yellow_amount = Decimal.pow(
                        10,
                        (yellow_amount.log(10) / 1019) ** 0.4 * 1019
                    )
                let green_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[3].log(10) / 3e11) ** 0.5
                ).div(2340)
                if (green_amount.cmp(Decimal.pow(10, 504)) >= 0)
                    green_amount = Decimal.pow(
                        10,
                        (green_amount.log(10) / 504) ** 0.75 * 504
                    )
                let blue_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[4].log(10) / 5e11) ** 0.5
                ).div(8.667e9)
                if (blue_amount.cmp(Decimal.pow(10, 216)) >= 0)
                    blue_amount = Decimal.pow(
                        10,
                        (blue_amount.log(10) / 216) ** 0.8 * 216
                    )
                let pink_amount = Decimal.pow(
                    10,
                    (game.antitotal_spice[5].log(10) / 8e11) ** 0.5
                ).div(2.255e9)
                if (pink_amount.cmp(Decimal.pow(10, 70)) >= 0)
                    pink_amount = Decimal.pow(
                        10,
                        (pink_amount.log(10) / 70) ** 0.6 * 70
                    )
                let rainbow_amount =
                    (game.antitotal_spice[6].log(10) - 28550000) / 5400000
                if (rainbow_amount > 0.5)
                    rainbow_amount =
                        ((rainbow_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
                else rainbow_amount = 0.5
                if (rainbow_amount > 24) rainbow_amount = 24
                let atomic_amount2 =
                    (game.spent_atomic_spice[6]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .log(10) -
                        32768) /
                    1984
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

                if (game.research_complete[21] >= 1) {
                    pending_amount = game.spent_atomic_spice[0]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 76)
                    if (pending_amount.cmp(Decimal.pow(10, 170)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 170))
                            .pow(0.6)
                            .mul(Decimal.pow(10, 170))
                    if (pending_amount.cmp(Decimal.pow(10, 515)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 515) ** 0.67 * 515
                        )
                    if (
                        pending_amount.sub(game.antispice[0]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[1] = true
                    }
                }

                if (game.research_complete[23] >= 1) {
                    pending_amount = game.spent_atomic_spice[1]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 228)
                        .div(3.2)
                        .mul(red_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 128)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 128))
                            .pow(0.5)
                            .mul(Decimal.pow(10, 128))
                    if (pending_amount.cmp(Decimal.pow(10, 269)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 269))
                            .pow(0.5)
                            .mul(Decimal.pow(10, 269))
                    if (pending_amount.cmp(Decimal.pow(10, 450)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 450) ** 0.5 * 450
                        )
                    if (
                        pending_amount.sub(game.antispice[1]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[2] = true
                    }
                }

                if (game.research_complete[26] >= 1) {
                    pending_amount = game.spent_atomic_spice[2]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 304)
                        .div(54)
                        .mul(yellow_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 87)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 87))
                            .pow(0.55)
                            .mul(Decimal.pow(10, 87))
                    if (pending_amount.cmp(Decimal.pow(10, 372)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 372) ** 0.5 * 372
                        )
                    if (
                        pending_amount.sub(game.antispice[2]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[3] = true
                    }
                }

                if (game.research_complete[29] >= 1) {
                    pending_amount = game.spent_atomic_spice[3]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 380)
                        .div(108000)
                        .mul(green_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 56)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 56))
                            .pow(0.55)
                            .mul(Decimal.pow(10, 56))
                    if (pending_amount.cmp(Decimal.pow(10, 225)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 225) ** 0.5 * 225
                        )
                    if (
                        pending_amount.sub(game.antispice[3]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[4] = true
                    }
                }

                if (game.research_complete[33] >= 1) {
                    pending_amount = game.spent_atomic_spice[4]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 494)
                        .div(5.587e15)
                        .mul(blue_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 40)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 40))
                            .pow(0.55)
                            .mul(Decimal.pow(10, 40))
                    if (pending_amount.cmp(Decimal.pow(10, 125)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 125) ** 0.5 * 125
                        )
                    if (
                        pending_amount.sub(game.antispice[4]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[5] = true
                    }
                }

                if (game.research_complete[36] >= 1) {
                    pending_amount = game.spent_atomic_spice[5]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 608)
                        .div(8.098e34)
                        .mul(pink_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 88)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 88) ** 0.5 * 88
                        )
                    if (
                        pending_amount.sub(game.antispice[5]).floor().cmp(1) >=
                        0
                    ) {
                        can_collide = true
                        available_spice[6] = true
                    }
                }

                if (game.research_complete[39] >= 1) {
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

                if (game.research_complete[21] >= 1 && available_spice[1]) {
                    game.spent_atomic_spice[0] =
                        game.spent_atomic_spice[0].add(atomic_amount)
                    let amount = game.spent_atomic_spice[0].pow(
                        game.atomic_efficiency / 76
                    )
                    if (amount.cmp(Decimal.pow(10, 170)) >= 0)
                        amount = amount
                            .div(Decimal.pow(10, 170))
                            .pow(0.6)
                            .mul(Decimal.pow(10, 170))
                    if (amount.cmp(Decimal.pow(10, 515)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 515) ** 0.67 * 515
                        )
                    if (amount.floor().cmp(game.antispice[0]) >= 0)
                        game.antispice[0] = amount.floor()
                }

                if (game.research_complete[23] >= 1 && available_spice[2]) {
                    game.spent_atomic_spice[1] =
                        game.spent_atomic_spice[1].add(atomic_amount)
                    let amount = game.spent_atomic_spice[1]
                        .pow(game.atomic_efficiency / 228)
                        .div(3.2)
                        .mul(red_amount)
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
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 450) ** 0.5 * 450
                        )
                    if (amount.floor().cmp(game.antispice[1]) >= 0)
                        game.antispice[1] = amount.floor()
                }

                if (game.research_complete[26] >= 1 && available_spice[3]) {
                    game.spent_atomic_spice[2] =
                        game.spent_atomic_spice[2].add(atomic_amount)
                    let amount = game.spent_atomic_spice[2]
                        .pow(game.atomic_efficiency / 304)
                        .div(54)
                        .mul(yellow_amount)
                    if (amount.cmp(Decimal.pow(10, 87)) >= 0)
                        amount = amount
                            .div(Decimal.pow(10, 87))
                            .pow(0.55)
                            .mul(Decimal.pow(10, 87))
                    if (amount.cmp(Decimal.pow(10, 372)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 372) ** 0.5 * 372
                        )
                    if (amount.floor().cmp(game.antispice[2]) >= 0)
                        game.antispice[2] = amount.floor()
                }

                if (game.research_complete[29] >= 1 && available_spice[4]) {
                    game.spent_atomic_spice[3] =
                        game.spent_atomic_spice[3].add(atomic_amount)
                    let amount = game.spent_atomic_spice[3]
                        .pow(game.atomic_efficiency / 380)
                        .div(108000)
                        .mul(green_amount)
                    if (amount.cmp(Decimal.pow(10, 56)) >= 0)
                        amount = amount
                            .div(Decimal.pow(10, 56))
                            .pow(0.55)
                            .mul(Decimal.pow(10, 56))
                    if (amount.cmp(Decimal.pow(10, 225)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 225) ** 0.5 * 225
                        )
                    if (amount.floor().cmp(game.antispice[3]) >= 0)
                        game.antispice[3] = amount.floor()
                }

                if (game.research_complete[33] >= 1 && available_spice[5]) {
                    game.spent_atomic_spice[4] =
                        game.spent_atomic_spice[4].add(atomic_amount)
                    let amount = game.spent_atomic_spice[4]
                        .pow(game.atomic_efficiency / 494)
                        .div(5.587e15)
                        .mul(blue_amount)
                    if (amount.cmp(Decimal.pow(10, 40)) >= 0)
                        amount = amount
                            .div(Decimal.pow(10, 40))
                            .pow(0.55)
                            .mul(Decimal.pow(10, 40))
                    if (amount.cmp(Decimal.pow(10, 125)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 125) ** 0.5 * 125
                        )
                    if (amount.floor().cmp(game.antispice[4]) >= 0)
                        game.antispice[4] = amount.floor()
                }

                if (game.research_complete[36] >= 1 && available_spice[6]) {
                    game.spent_atomic_spice[5] =
                        game.spent_atomic_spice[5].add(atomic_amount)
                    let amount = game.spent_atomic_spice[5]
                        .pow(game.atomic_efficiency / 608)
                        .div(8.098e34)
                        .mul(pink_amount)
                    if (amount.cmp(Decimal.pow(10, 88)) >= 0)
                        amount = Decimal.pow(
                            10,
                            (amount.log(10) / 88) ** 0.5 * 88
                        )
                    if (amount.floor().cmp(game.antispice[5]) >= 0)
                        game.antispice[5] = amount.floor()
                }

                if (game.research_complete[39] >= 1 && available_spice[7]) {
                    game.spent_atomic_spice[6] =
                        game.spent_atomic_spice[6].add(atomic_amount)

                    atomic_amount2 =
                        (game.spent_atomic_spice[6].log(10) - 32768) / 1984
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
            parseInt(eventcode.substring(5)) >= 1 &&
            parseInt(eventcode.substring(5)) <= 6
        ) {
            key.digit[parseInt(eventcode.substring(5)) - 1] = state
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

    if (eventcode === "ShiftLeft" || eventcode === "ShiftRight") {
        key.shift = state
    }
    if (eventcode === "Escape") {
        key.escape = state
    }
    if (eventcode === "Enter") {
        key.enter = state
    }
}
document.body.addEventListener("keydown", function (event) {
    let active_element = document.activeElement
    if (event.code === "Escape" || event.code === "Enter")
        switch_key(event.code, true)
    if (
        active_element.tagName == "INPUT" &&
        (active_element.type == "text" || active_element.type == "number")
    ) {
        event.stopPropagation()
    } else if (modal === "none") {
        if (event.code !== "Escape" && event.code !== "Enter")
            switch_key(event.code, true) // change corresponding key and or key.digit(if between 1-6)

        if (game.hotkeys) {
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
                        if (game.research_complete[21])
                            if (game.subtab[4] == available_subtabs[4])
                                // this research is unlocked after completing Collapse-challenge
                                // all Sub unlocked, rightmost to leftmost, else go right
                                goto_subtab(0)
                            else goto_subtab(game.subtab[4] + 1)
                        else if (game.research_complete[20])
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
                        if (game.research_complete[21])
                            if (game.subtab[4] == 0)
                                // challenge 1 completed?
                                // leftmost to rightmost, else only one left
                                goto_subtab(available_subtabs[4])
                            else goto_subtab(game.subtab[4] - 1)
                        else if (game.research_complete[20])
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
    key.escape = false
    key.enter = false
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
    if (modal !== "none") {
        if (key.escape) close_modal()
        if (key.enter) {
            switch (modal) {
                case "alert":
                    close_modal()
                    break
                case "confirm":
                    document.getElementById("confirm_yes").onclick()
                    break
                case "import":
                    import_save()
                    break
            }
        }
    }

    if (game.hotkeys && modal === "none") {
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
function manual_save() {
    save()
    if (modal === "none") {
        open_modal("alert", "Manually saved the game!")
    }
}

function save() {
    game.version = "1.7.2"
    game.save_time = Date.now()
    game.prestige_price = new Array(prestige_upgrade.upgrades.length).fill(0)
    for (const u of prestige_upgrade.upgrades) {
        game.prestige_price[u.id] = u.price
    }
    localStorage.setItem("new_spice_idle_save", JSON.stringify(game))
}

//exporting a save file
function export_save() {
    navigator.clipboard.writeText(btoa(JSON.stringify(game)))
    if (modal === "none") {
        open_modal("alert", "Exported to Clipboard!")
    }
}

//importing a save file
function pre_import_save() {
    if (modal === "none") {
        document.getElementById("import_input").value = ""
        open_modal("import")
        document.getElementById("import_input").focus()
    }
}

function import_save() {
    let input = document.getElementById("import_input").value
    close_modal()

    if (input === "cancer2" || input === "stage2") {
        notation(16)
        return
    }
    if (input === "cancer3" || input === "stage3") {
        notation(17)
        return
    }
    if (input === "cancer4" || input === "stage4") {
        notation(18)
        return
    }

    let save_file = atob(input)

    let valid_json = true
    try {
        JSON.parse(save_file)
    } catch {
        valid_json = false
    }

    if (valid_json) {
        if (JSON.parse(save_file) !== null) {
            load(JSON.parse(save_file))
            c9_modal = false
        }
    }
}

//deleting a save
function pre_delete_save() {
    if (modal === "none") {
        open_modal(
            "confirm",
            "Are you sure you want to delete your save?<br>This will reset EVERYTHING!",
            delete_save
        )
    }
}

function delete_save() {
    localStorage.removeItem("new_spice_idle_save")
    window.location.reload()
}

goto_tab(0)

//load the game
function load(savegame) {
    if (savegame === null) return
    if (savegame.red_unlock !== undefined) {
        if (modal === "none") {
            open_modal("alert", "This save file is too powerful for this game")
        }
        return
    }
    if (savegame.exp !== undefined && savegame.amp !== undefined) {
        if (modal === "none") {
            open_modal(
                "alert",
                "You just tried to load an EXP Simulator save file into Spice Idle... Why did you think that would work?"
            )
        }
        return
    }

    const [edition, major, minor] = savegame.version
        .split(".")
        .map(val => parseInt(val))

    if (major <= 6) {
        if (modal === "none") {
            open_modal(
                "alert",
                "Pre-v1.7.0 saves cannot be loaded on this version of the game, try them in Spice Idle Classic instead"
            )
        }
        return
    } else {
        game = savegame
    }

    let ver_index = edition * 10000 + major * 100 + minor

    let realm_fix = false

    if (ver_index < 10701) {
        game.entry_hidden = new Array(23).fill(false)
        game.compendium_new = false
        game.arcane_spice_price[5] = new Decimal(
            game.arcane_spice_price[5]
        ).div(27)
        game.antispice_confirm = true
        if (game.color_boosts >= game.augment_start || game.collapse >= 1) {
            game.augment_reached = true
        } else {
            game.augment_reached = false
        }
        game.atomic_timing = 1
        game.atomic_timer = 0
        game.statistics_unit = [0, 0, 0]
        game.statistics_time = 0
        game.prestige_stat_history = new Array(10).fill(-1)
        game.ascend_stat_history = new Array(10).fill(-1)
        game.collapse_stat_history = new Array(10).fill(-1)
        for (let i = 0; i < 10; i++) {
            if (game.prestige_time_history[i] !== -1)
                game.prestige_stat_history[i] = 1
            if (game.ascend_time_history[i] !== -1)
                game.ascend_stat_history[i] = 1
            if (game.collapse_time_history[i] !== -1)
                game.collapse_stat_history[i] = 1
        }
        game.realm_limit = new Decimal(
            "1.7193341424918277e+4052718281828459045"
        )
        realm_fix = true
    }
    if (ver_index < 10702) {
        game.offline_progress = true
        game.catchup_rate = 30
    }

    game.version = "1.7.2"

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

    game.ansuz = new Decimal(game.ansuz)
    for (let i = 0; i < 3; i++) {
        game.rune[i] = new Decimal(game.rune[i])
        game.rune_power[i] = new Decimal(game.rune_power[i])
    }
    game.total_rune_power = new Decimal(game.total_rune_power)

    game.arcane_spice = new Decimal(game.arcane_spice)
    game.highest_arcane_spice = new Decimal(game.highest_arcane_spice)
    game.arcane_strengthener_price = new Decimal(game.arcane_strengthener_price)
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
        game.arcane_spice_price[i] = new Decimal(game.arcane_spice_price[i])
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
    game.realm_limit = new Decimal(game.realm_limit)

    if (game.prestige_price !== undefined) {
        for (const u of prestige_upgrade.upgrades) {
            u.price = new Decimal(game.prestige_price[u.id])
        }
    }

    game.pending_goal = new Decimal(game.pending_goal)

    game.autopr_goal[1] = new Decimal(game.autopr_goal[1])
    game.autopr_delta[1] = new Decimal(game.autopr_delta[1])
    game.autopr_goal2[1] = new Decimal(game.autopr_goal2[1])
    game.autoas_goal[0] = new Decimal(game.autoas_goal[0])
    game.autoas_delta = new Decimal(game.autoas_delta)
    game.autoas_goal2 = new Decimal(game.autoas_goal2)
    game.autods_budget = new Decimal(game.autods_budget)
    game.autoco_goal[0] = new Decimal(game.autoco_goal[0])

    for (let i = 0; i < 10; i++) {
        if (game.prestige_amount_history[i] !== -1) {
            game.prestige_amount_history[i] = new Decimal(
                game.prestige_amount_history[i]
            )
        }
        if (game.ascend_amount_history[i] !== -1) {
            game.ascend_amount_history[i] = new Decimal(
                game.ascend_amount_history[i]
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
    game.peak_ansuz_gain = new Decimal(game.peak_ansuz_gain)
    game.peak_ansuz_amount = new Decimal(game.peak_ansuz_amount)
    game.peak_atomic_gain = new Decimal(game.peak_atomic_gain)
    game.peak_atomic_amount = new Decimal(game.peak_atomic_amount)

    if (realm_fix) {
        if (game.limit_active) {
            game.limit_active = false
            if (game.collapse_challenge !== 0) exit_collapse_challenge()
            else collapse(true)
        }
    }

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
    auto_toggle("distributor")
    auto_toggle("distributor")
    auto_toggle("arcane")
    auto_toggle("arcane")
    auto_toggle("collapse", true)
    auto_toggle("collapse", true)
    auto_toggle("collapse_mode")
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
    confirmations("antispice")
    confirmations("antispice")
    exponent_notation(game.exponent_notation)
    high_visibility()
    high_visibility()
    refresh_rate(game.refresh_rate)
    offline()
    offline()
    animations()
    animations()
    resource_efficiency()
    resource_efficiency()
    reduce_flashing()
    reduce_flashing()

    statistics_time()
    statistics_time()

    document.getElementById("catchup_input").value = game.catchup_rate
    document.getElementById("p_boosts_input").value = game.autopr_goal[0]
    document.getElementById("p_boosts_input2").value = game.autopr_delta[0]
    document.getElementById("p_spice_input").value = game.autopr_goal[1]
    document.getElementById("p_spice_input2").value = game.autopr_delta[1]
    document.getElementById("p_time_input").value = game.autopr_goal[2]
    document.getElementById("a_runes_input").value = game.autoas_goal[0]
    document.getElementById("a_runes_input2").value = game.autoas_delta
    document.getElementById("a_time_input").value = game.autoas_goal[1]
    document.getElementById("ds_portion_input").value =
        game.autods_portion * 100
    document.getElementById("co_spice_input").value = game.autoco_goal[0]
    document.getElementById("co_time_input").value = game.autoco_goal[1]
    document.getElementById("co_decay_input").value = game.autoco_goal[2]
    document.getElementById("collider_input").value = game.atomic_portion * 100
    document.getElementById("collider_input2").value = game.atomic_timing

    for (let i = 0; i < 5; i++) {
        if (
            game.color_boosts >= i + 1 ||
            game.prestige >= 1 ||
            game.ascend >= 1 ||
            game.collapse >= 1
        )
            entry_unlocked[i] = true
    }
    if (game.prestige >= 1 || game.ascend >= 1 || game.collapse >= 1)
        entry_unlocked[5] = true
    if (
        game.rainbow_spice.cmp(65536) >= 0 ||
        game.ascend >= 1 ||
        game.collapse >= 1
    )
        entry_unlocked[6] = true
    if (game.prestige_bought[12] >= 1) entry_unlocked[7] = true
    if (game.crystal_infusion >= 100 || game.ascend >= 1 || game.collapse >= 1)
        entry_unlocked[8] = true
    if (game.ascend >= 1 || game.collapse >= 1) entry_unlocked[9] = true
    if (game.ascend_bought[12] || game.collapse >= 1) entry_unlocked[10] = true
    if (game.ascend_complete[0] || game.collapse >= 1) entry_unlocked[11] = true
    if (game.arcane_spice_bought[5] >= 1 || game.collapse >= 1)
        entry_unlocked[12] = true
    if (game.color_boosts >= 2097152 || game.collapse >= 1)
        entry_unlocked[13] = true
    if (game.collapse >= 1) entry_unlocked[14] = true
    if (game.collapse >= 5) entry_unlocked[15] = true
    if (game.research_complete[7] >= 1) entry_unlocked[16] = true
    if (game.research_complete[16] >= 1) entry_unlocked[17] = true
    if (game.collapse_complete[0] >= 1) entry_unlocked[18] = true
    if (game.limit_active) entry_unlocked[19] = true

    for (i = 0; i < compendium.entries.length; i++) {
        entry_toggle(compendium.entries[i], game.entry_hidden[i])
    }

    if (game.compendium_new) {
        document.getElementById("compendium").className = "tab notice"
    }
}

//load the game when opened
let stored_save = JSON.parse(localStorage.getItem("new_spice_idle_save"))
if (stored_save === null) {
    let classic_save = JSON.parse(localStorage.getItem("spice_idle_save"))
    if (classic_save !== null) {
        let seen = localStorage.getItem("alert_seen")
        if (seen !== "true") {
            document.getElementById("classic_info").style.display = "block"
            localStorage.setItem("alert_seen", "true")
        }
    }
}
load(stored_save)

//setting up modals
let modal = "none"
let c9_modal = false

function open_modal(type, text, onclick) {
    modal = type

    document.getElementById("modal").style.display = "block"
    document.getElementById("modal_alert").style.display = "none"
    document.getElementById("modal_confirm").style.display = "none"
    document.getElementById("modal_import").style.display = "none"

    switch (type) {
        case "alert":
            document.getElementById("modal_alert").style.display = "block"
            document.getElementById("alert_text").innerHTML = text
            break
        case "confirm":
            document.getElementById("modal_confirm").style.display = "block"
            document.getElementById("confirm_text").innerHTML = text
            document.getElementById("confirm_yes").onclick = function () {
                onclick()
                close_modal()
            }
            break
        case "import":
            document.getElementById("modal_import").style.display = "block"
            break
    }
}

function close_modal() {
    modal = "none"
    document.getElementById("modal").style.display = "none"
}

//updating the colors on the title screen to fit your progress in the game :)
function title_update() {
    if (game.expand >= 1)
        document.getElementById("spice_idle").className =
            "spice_idle galactic_shards"
    else if (game.collapse >= 1)
        document.getElementById("spice_idle").className =
            "spice_idle atomic_spice"
    else if (game.ascend_complete[0])
        document.getElementById("spice_idle").className =
            "spice_idle arcane_spice"
    else if (game.ascend >= 1)
        document.getElementById("spice_idle").className = "spice_idle runes"
    else if (game.prestige_bought[12] >= 1)
        document.getElementById("spice_idle").className =
            "spice_idle crystal_spice"
    else if (game.prestige >= 1)
        document.getElementById("spice_idle").className =
            "spice_idle rainbow_spice"
    else {
        switch (game.color_boosts) {
            case 0:
                document.getElementById("spice_idle").className =
                    "spice_idle red_spice"
                break
            case 1:
                document.getElementById("spice_idle").className =
                    "spice_idle yellow_spice"
                break
            case 2:
                document.getElementById("spice_idle").className =
                    "spice_idle green_spice"
                break
            case 3:
                document.getElementById("spice_idle").className =
                    "spice_idle blue_spice"
                break
            default:
                document.getElementById("spice_idle").className =
                    "spice_idle pink_spice"
                break
        }
    }
}

//setting up the tick loop
function tick_loop() {
    let start_time = Date.now()
    let delta_ms = undefined
    if (delta_time === undefined) {
        delta_time = game.tickspeed / game.gamespeed
    } else {
        if (Date.now() < tick_time) tick_time = Date.now()

        delta_ms = Date.now() - tick_time
        delta_time = 1000 / (delta_ms * game.gamespeed)
    }

    if (delta_ms < 10000 || delta_ms === undefined) {
        tick_time = Date.now()

        tick()
        hotkey_tick()
        if (collider.enabled) collider_tick()

        let end_time = Date.now()
        let total_time = end_time - start_time
        if (total_time < 0) total_time = 0
        if (!pause)
            window.setTimeout(
                tick_loop,
                1000 / game.tickspeed - (total_time % (1000 / game.tickspeed))
            )
    } else {
        document.getElementById("catchup_screen").style.display = "flex"
        document.getElementById("catchup_header").innerHTML =
            "Catching up on time while the game was in the background...<br>Please keep the game on-screen"
        document.getElementById("offline_panel").style.display = "block"
        document.getElementById("catchup_skips").style.display = "none"
        document.getElementById("startup_panel").style.display = "none"
        document.getElementById("tabs_block").style.display = "none"
        document.getElementsByTagName("main")[0].style.display = "none"

        close_modal()

        title_update()

        pause = true

        ticks_run = 0
        average_time = 0
        average_rate = game.catchup_rate * game.tickspeed
        average_ticks = 0
        between_time = 0
        offline_time = Date.now()

        offline_ms = delta_ms
        total_ticks = Math.floor((offline_ms * game.tickspeed) / 1000)
        if (total_ticks >= 60000) total_ticks = 60000

        if (document.visibilityState === "visible") {
            background_timeout()
        } else if (document.visibilityState === "hidden") {
            background_while()
        }
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
    if (game.tab === 4) {
        expansion_update()
        dark_update()
    }
    if (game.tab === 5) stats_update()
    if (game.tab === 6) settings_update()
    if (game.tab === 7) compendium_update()

    let end_time = Date.now()
    let total_time = end_time - start_time
    if (total_time < 0) total_time = 0
    if (!pause)
        window.setTimeout(
            graphics_loop,
            game.refresh_rate - (total_time % game.refresh_rate)
        )
}

//setting up the save loop
function save_loop() {
    if (!pause) save()

    window.setTimeout(save_loop, 60000)
}

//setting up the offline catch up loop
function catchup_loop() {
    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    game.catchup_rate = Number(document.getElementById("catchup_input").value)

    if (game.catchup_rate > total_ticks - ticks_run) {
        delta_time =
            (1000 * (total_ticks - start_ticks)) /
            ((offline_ms - start_ms) * game.gamespeed)
        for (let i = 0; i < total_ticks - ticks_run; i++) {
            tick()
            ticks_run++
        }
    } else {
        delta_time =
            (1000 * (total_ticks - start_ticks)) /
            ((offline_ms - start_ms) * game.gamespeed)
        for (let i = 0; i < game.catchup_rate; i++) {
            tick()
            ticks_run++
        }
    }

    document.getElementById("catchup_progress").style.width =
        (ticks_run / total_ticks) * 100 + "%"

    if (ticks_run > Math.floor(total_ticks / 2))
        document.getElementById("catchup_half_skip").style.display = "none"

    let total_time = Date.now() - offline_time
    offline_time = Date.now()

    average_time += total_time
    if (average_time >= 1000) {
        average_rate = ((ticks_run - average_ticks) * 1000) / average_time
        average_ticks = ticks_run
        average_time = 0
    }

    let eta = "Estimated time to completion: "
    if (mobile) eta = "ETA: "

    if (total_ticks >= 8640000)
        document.getElementById("catchup_info").innerHTML =
            format_num(ticks_run, 0) +
            " / " +
            format_num(total_ticks, 0) +
            " ticks run (capped)<br>Currently running about " +
            format_dec(average_rate, 0) +
            " ticks/sec<br>" +
            eta +
            format_time_long((total_ticks - ticks_run) / average_rate, 0, 1)
    else
        document.getElementById("catchup_info").innerHTML =
            format_num(ticks_run, 0) +
            " / " +
            format_num(total_ticks, 0) +
            " ticks run<br>Currently running about " +
            format_dec(average_rate, 0) +
            " ticks/sec<br>" +
            eta +
            format_time_long((total_ticks - ticks_run) / average_rate, 0, 1)

    between_time += total_time
    while (between_time >= 1000 / game.tickspeed) {
        delta_time = game.tickspeed / game.gamespeed
        between_time -= 1000 / game.tickspeed
        tick()
    }

    if (ticks_run < total_ticks) {
        window.setTimeout(catchup_loop, 0)
    } else {
        document.getElementById("tabs_block").style.display = "block"
        document.getElementsByTagName("main")[0].style.display = "block"
        document.getElementById("catchup_screen").style.display = "none"

        if (pause) pause = false

        tick_time = Date.now() - 1000 / game.tickspeed

        tick_loop()
        graphics_loop()
    }
}

//setting up the background progress loops
function background_timeout() {
    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    game.catchup_rate = Number(document.getElementById("catchup_input").value)

    if (game.catchup_rate > total_ticks - ticks_run) {
        delta_time = (1000 * total_ticks) / (offline_ms * game.gamespeed)
        for (let i = 0; i < total_ticks - ticks_run; i++) {
            tick()
            ticks_run++
        }
    } else {
        delta_time = (1000 * total_ticks) / (offline_ms * game.gamespeed)
        for (let i = 0; i < game.catchup_rate; i++) {
            tick()
            ticks_run++
        }
    }

    document.getElementById("catchup_progress").style.width =
        (ticks_run / total_ticks) * 100 + "%"

    let total_time = Date.now() - offline_time
    offline_time = Date.now()

    average_time += total_time
    if (average_time >= 1000) {
        average_rate = ((ticks_run - average_ticks) * 1000) / average_time
        average_ticks = ticks_run
        average_time = 0
    }

    let eta = "Estimated time to completion: "
    if (mobile) eta = "ETA: "

    if (total_ticks >= 60000)
        document.getElementById("catchup_info").innerHTML =
            format_num(ticks_run, 0) +
            " / " +
            format_num(total_ticks, 0) +
            " ticks run (capped)<br>Currently running about " +
            format_dec(average_rate, 0) +
            " ticks/sec<br>" +
            eta +
            format_time_long((total_ticks - ticks_run) / average_rate, 0, 1)
    else
        document.getElementById("catchup_info").innerHTML =
            format_num(ticks_run, 0) +
            " / " +
            format_num(total_ticks, 0) +
            " ticks run<br>Currently running about " +
            format_dec(average_rate, 0) +
            " ticks/sec<br>" +
            eta +
            format_time_long((total_ticks - ticks_run) / average_rate, 0, 1)

    between_time += total_time
    while (between_time >= 1000 / game.tickspeed) {
        delta_time = game.tickspeed / game.gamespeed
        between_time -= 1000 / game.tickspeed
        tick()
    }

    if (ticks_run < total_ticks) {
        if (document.visibilityState === "visible") {
            window.setTimeout(background_timeout, 0)
        } else {
            background_while()
        }
    } else {
        document.getElementById("tabs_block").style.display = "block"
        document.getElementsByTagName("main")[0].style.display = "block"
        document.getElementById("catchup_screen").style.display = "none"

        if (pause) pause = false

        tick_time = Date.now() - 1000 / game.tickspeed

        tick_loop()
        graphics_loop()
    }
}

function background_while() {
    let exited = false

    while (ticks_run < total_ticks) {
        if (game.catchup_rate > total_ticks - ticks_run) {
            delta_time = (1000 * total_ticks) / (offline_ms * game.gamespeed)
            for (let i = 0; i < total_ticks - ticks_run; i++) {
                tick()
                ticks_run++
            }
        } else {
            delta_time = (1000 * total_ticks) / (offline_ms * game.gamespeed)
            for (let i = 0; i < game.catchup_rate; i++) {
                tick()
                ticks_run++
            }
        }

        let total_time = Date.now() - offline_time
        offline_time = Date.now()

        between_time += total_time
        while (between_time >= 1000 / game.tickspeed) {
            delta_time = game.tickspeed / game.gamespeed
            between_time -= 1000 / game.tickspeed
            tick()
        }

        if (document.visibilityState === "visible") {
            exited = true
            break
        }
    }

    if (exited) {
        average_time = 0
        average_rate = game.catchup_rate * game.tickspeed
        average_ticks = 0

        background_timeout()
    } else {
        document.getElementById("tabs_block").style.display = "block"
        document.getElementsByTagName("main")[0].style.display = "block"
        document.getElementById("catchup_screen").style.display = "none"

        if (pause) pause = false

        tick_time = Date.now() - 1000 / game.tickspeed

        tick_loop()
        graphics_loop()
    }
}

let offline_ms, total_ticks
let ticks_run = 0
let average_time = 0
let average_rate = game.catchup_rate * game.tickspeed
let average_ticks = 0
let between_time = 0
let offline_time = Date.now()
let start_ms = 0
let start_ticks = 0

//setting up loops and starting the game
if (game.save_time === undefined) {
    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    document.getElementById("catchup_screen").style.display = "flex"
    document.getElementById("startup_panel").style.display = "block"
    document.getElementById("catchup_header").innerHTML =
        "The universe is full of spices...<br>Use them to conquer it"
    if (mobile)
        document.getElementById("catchup_header").innerHTML =
            "The universe is full of spices...<br><br>Use them to conquer it"
    document.getElementById("offline_panel").style.display = "none"
    document.getElementById("tabs_block").style.display = "none"
    document.getElementsByTagName("main")[0].style.display = "none"

    title_update()
} else if (game.offline_progress) {
    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    document.getElementById("catchup_screen").style.display = "flex"
    document.getElementById("offline_panel").style.display = "block"
    if (mobile)
        document.getElementById("catchup_header").innerHTML =
            "Catching up on time since the game was last saved...<br><br>Please keep the game on-screen"
    document.getElementById("catchup_half_skip").style.display = "block"
    document.getElementById("startup_panel").style.display = "none"
    document.getElementById("tabs_block").style.display = "none"
    document.getElementsByTagName("main")[0].style.display = "none"

    title_update()

    offline_ms = Date.now() - game.save_time
    total_ticks = Math.floor((offline_ms * game.tickspeed) / 1000)
    if (total_ticks >= 8640000) total_ticks = 8640000

    catchup_loop()
} else {
    tick_time = Date.now()

    tick_loop()
    graphics_loop()
}

//handling animated text colors
let time = 0

let animation_time = Date.now()

function animation_loop() {
    time += (Date.now() - animation_time) / 1000
    animation_time = Date.now()

    document.querySelector(":root").style.setProperty("--time", time)
    if (!game.high_visibility) {
        document
            .querySelector(":root")
            .style.setProperty("--arcane_light", 5 * Math.sin(time) + 55 + "%")
        document
            .querySelector(":root")
            .style.setProperty("--decayed_sat", 6 * Math.sin(time) + 16 + "%")
    } else {
        document
            .querySelector(":root")
            .style.setProperty("--decayed_sat", 8 * Math.sin(time) + 32 + "%")
    }

    window.setTimeout(animation_loop, 10)
}

window.setTimeout(animation_loop, 10)

window.setTimeout(save_loop, 60000)
