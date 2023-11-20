//code for doing color shifts/boosts
function color_boost(override) {
    let can_boost = false
    let scaling = 1
    let scaling2 = 1n
    if (game.ascend_challenge === 3 || game.collapse_challenge === 7) {
        scaling = 10
        scaling2 = 10n
    }
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

    if (override) can_boost = true

    if (can_boost) {
        if (game.prestige_bought[22] === 0 || override) {
            game.red_spice = new Decimal(5)
            game.yellow_spice = new Decimal(5)
            game.green_spice = new Decimal(5)
            game.blue_spice = new Decimal(5)
            game.pink_spice = new Decimal(5)

            game.highest_red_spice = new Decimal(5)
            game.highest_yellow_spice = new Decimal(5)
            game.highest_green_spice = new Decimal(5)
            game.highest_blue_spice = new Decimal(5)
            game.highest_pink_spice = new Decimal(5)

            game.global_spice_boost = new Decimal(1)

            game.red_spice_gen = [
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
            ]
            game.red_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
            game.red_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.total_red_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.red_spice_price = [
                new Decimal(5),
                new Decimal(150),
                new Decimal(30000),
                new Decimal(4.5e8),
                new Decimal(6e13),
                new Decimal(9e20),
            ]
            game.red_strengthener_price = new Decimal(1000000)
            game.red_strengthener = 0

            game.yellow_spice_gen = [
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
            ]
            game.yellow_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
            game.yellow_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.total_yellow_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.yellow_spice_price = [
                new Decimal(5),
                new Decimal(250),
                new Decimal(60000),
                new Decimal(2e9),
                new Decimal(3e14),
                new Decimal(5.5e21),
            ]
            game.yellow_strengthener_price = new Decimal(3000000)
            game.yellow_strengthener = 0

            game.green_spice_gen = [
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
            ]
            game.green_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
            game.green_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.total_green_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.green_spice_price = [
                new Decimal(5),
                new Decimal(350),
                new Decimal(100000),
                new Decimal(7e9),
                new Decimal(1.5e15),
                new Decimal(3e22),
            ]
            game.green_strengthener_price = new Decimal(9000000)
            game.green_strengthener = 0

            game.blue_spice_gen = [
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
            ]
            game.blue_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
            game.blue_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.total_blue_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.blue_spice_price = [
                new Decimal(5),
                new Decimal(500),
                new Decimal(250000),
                new Decimal(3e10),
                new Decimal(7.5e15),
                new Decimal(2e23),
            ]
            game.blue_strengthener_price = new Decimal(2.5e7)
            game.blue_strengthener = 0

            game.pink_spice_gen = [
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
            ]
            game.pink_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
            game.pink_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.total_pink_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.pink_spice_price = [
                new Decimal(5),
                new Decimal(750),
                new Decimal(500000),
                new Decimal(1e11),
                new Decimal(4e16),
                new Decimal(1e24),
            ]
            game.pink_strengthener_price = new Decimal(8e7)
            game.pink_strengthener = 0

            game.color_boosts++
        } else {
            if (game.color_boosts >= 4) {
                if (game.collapse_challenge === 10) {
                    game.color_boosts =
                        Math.floor(
                            0.5 *
                                (9 -
                                    33 ** 0.5 -
                                    Math.cbrt(
                                        -8 * Number(game.pink_spice_bought[5]) -
                                            36 * 33 ** 0.5 +
                                            500
                                    ))
                        ) + 1
                } else {
                    if (game.pink_spice_bought[5] <= 150 * scaling) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    50) /
                                    25
                            ) + 1
                    } else if (game.pink_spice_bought[5] <= 1200 * scaling) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    250) /
                                    50
                            ) + 1
                    } else if (game.pink_spice_bought[5] <= 9000 * scaling) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    975) /
                                    75
                            ) + 1
                    } else if (game.pink_spice_bought[5] <= 18000 * scaling) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    4300) /
                                    100
                            ) + 1
                    } else if (game.pink_spice_bought[5] <= 63000 * scaling) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    15450) /
                                    150
                            ) + 1
                    } else if (game.pink_spice_bought[5] <= 198600 * scaling) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    41600) /
                                    200
                            ) + 1
                    } else if (game.pink_spice_bought[5] <= 1069500 * scaling) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    161700) /
                                    300
                            ) + 1
                    } else if (game.pink_spice_bought[5] <= 2768000 * scaling) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    982500) /
                                    500
                            ) + 1
                    } else if (
                        game.pink_spice_bought[5] <=
                        75270000 * scaling
                    ) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    4733000) /
                                    1000
                            ) + 1
                    } else if (
                        game.pink_spice_bought[5] <=
                        153270000 * scaling
                    ) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    44734500) /
                                    1500
                            ) + 1
                    } else if (
                        game.pink_spice_bought[5] <=
                        3989930000 * scaling
                    ) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    176737500) /
                                    2500
                            ) + 1
                    } else if (
                        game.pink_spice_bought[5] <=
                        (4000 * game.augment_start - 2676738000) * scaling
                    ) {
                        game.color_boosts =
                            Math.floor(
                                (Number(game.pink_spice_bought[5]) / scaling +
                                    2676738000) /
                                    4000
                            ) + 1
                    } else {
                        let amount = 4000 * game.augment_start - 2676738000
                        game.color_boosts =
                            Math.floor(
                                (2 * game.augment_start -
                                    8001 +
                                    ((8 * Number(game.pink_spice_bought[5])) /
                                        scaling -
                                        8 * amount +
                                        64016001) **
                                        0.5) /
                                    2
                            ) + 1
                    }
                }
            } else {
                game.color_boosts++
            }
        }
    }
}

//code for prestiging
function prestige(override) {
    if (game.color_boosts >= 10 || override) {
        if (!override) {
            let total_completions = 0
            for (let i = 0; i < 6; i++) {
                total_completions += game.collapse_complete[i]
            }

            if (game.research_complete[38] >= 1) {
                let prestige_amount =
                    1 + (1.05 ** (total_completions - 55)) ** 0.5
                if (game.ascend_bought[21])
                    game.prestige +=
                        (Math.floor(game.color_boosts / 50) + 1) *
                        Math.floor(prestige_amount)
                else game.prestige += Math.floor(prestige_amount)
            } else {
                game.prestige++
                if (game.ascend_bought[21])
                    game.prestige += Math.floor(game.color_boosts / 50)
            }
        }
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

        game.rainbow_spice = game.rainbow_spice.add(amount)
        game.antitotal_spice[6] = game.antitotal_spice[6].add(amount)
        for (let i = 8; i >= 0; i--) {
            game.prestige_amount_history[i + 1] =
                game.prestige_amount_history[i]
            game.prestige_time_history[i + 1] = game.prestige_time_history[i]
            game.prestige_real_time_history[i + 1] =
                game.prestige_real_time_history[i]
        }
        game.prestige_amount_history[0] = amount
        game.prestige_time_history[0] = game.prestige_time_played
        if (game.real_time_played[1] !== game.prestige_time_played)
            game.prestige_real_time_history[0] = game.real_time_played[1]
        else game.prestige_real_time_history[0] = -1

        game.prestige_time_played = 0
        game.real_time_played[1] = 0

        game.peak_rainbow_gain = new Decimal(0)
        game.peak_rainbow_amount = new Decimal(0)
        game.peak_rainbow_boosts = 0
        game.peak_rainbow_time = 0

        if (game.ascend_bought[9] && !override) {
            if (game.autopr_mode === 0) {
                game.autopr_goal2[0] += game.autopr_delta[0]
            }
            if (game.autopr_mode === 1) {
                game.autopr_goal2[1] = game.autopr_goal2[1].mul(
                    game.autopr_delta[1]
                )
            }
        }

        game.crystal_spice = new Decimal(0)
        game.highest_crystal_spice = new Decimal(0)
        for (let i = 0; i < 6; i++) {
            game.crystal_spice_gen[i] = new Decimal(
                game.crystal_spice_bought[i].toString()
            )
        }
        game.crystal_infusion = 0n
        game.crystal_infusion_price = new Decimal(10)

        color_boost(true)
        game.color_boosts = game.prestige_bought[4]
        if (game.prestige_bought[4] < prestige_upgrade.upgrades[4].max) {
            game.subtab[0] = 0
            if (game.tab === 0) goto_subtab(game.subtab[0])
        }
    }
}

//code for ascending
function ascend(override, challenge) {
    let goal = Decimal.pow(2, 1024)
    if (game.ascend_challenge !== 0) {
        goal = ascension_challenge.challenges[game.ascend_challenge - 1].goal
    }

    if (game.rainbow_spice.cmp(goal) >= 0 && game.collapse_challenge !== 11) {
        let ascend_ready = false

        if (override || !game.ascend_confirm) ascend_ready = true
        else {
            if (
                confirm(
                    "Are you sure you want to Ascend? This will reset EVERYTHING so far!"
                )
            ) {
                ascend_ready = true
            }
        }

        if (ascend_ready) {
            if (!override) {
                let total_completions = 0
                for (let i = 0; i < 6; i++) {
                    total_completions += game.collapse_complete[i]
                }

                if (game.research_complete[38] >= 1) {
                    let ascension_amount =
                        1 + (1.05 ** (total_completions - 55)) ** 2
                    if (ascension_amount >= 10000)
                        ascension_amount =
                            (ascension_amount / 10000) ** 0.5 * 10000
                    game.ascend += Math.floor(ascension_amount)
                } else game.ascend++
            }

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

            let reward_scaling = 1
            if (game.antispice_bought[1]) reward_scaling = 1.05
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

            game.ansuz = game.ansuz.add(amount.floor())

            if (game.research_complete[6] >= 1) {
                game.autods_budget = game.autods_budget.add(
                    amount.floor().mul(game.autods_portion).ceil()
                )
            }

            for (let i = 8; i >= 0; i--) {
                game.ascend_amount_history[i + 1] =
                    game.ascend_amount_history[i]
                game.ascend_time_history[i + 1] = game.ascend_time_history[i]
                game.ascend_real_time_history[i + 1] =
                    game.ascend_real_time_history[i]
                game.ascend_challenge_history[i + 1] =
                    game.ascend_challenge_history[i]
            }
            game.ascend_amount_history[0] = amount.floor()
            game.ascend_time_history[0] = game.ascend_time_played
            if (game.real_time_played[2] !== game.ascend_time_played)
                game.ascend_real_time_history[0] = game.real_time_played[2]
            else game.ascend_real_time_history[0] = -1
            if (game.ascend_challenge !== 0)
                game.ascend_challenge_history[0] = game.ascend_challenge
            else if (challenge !== undefined)
                game.ascend_challenge_history[0] = challenge
            else game.ascend_challenge_history[0] = -1

            game.ascend_time_played = 0
            game.real_time_played[2] = 0
            if (game.collapse_challenge === 7) game.ascend_challenge_timer = 0

            game.peak_ansuz_gain = new Decimal(0)
            game.peak_ansuz_amount = new Decimal(0)
            game.peak_ansuz_time = 0

            if (game.ascend_challenge !== 0) {
                game.ascend_complete[game.ascend_challenge - 1] = true
                game.ascend_challenge = 0
            }

            game.autopr_goal2[0] = 0
            game.autopr_goal2[1] = new Decimal(1)

            if (game.research_complete[8] >= 1 && !override) {
                if (game.autoas_mode === 0) {
                    game.autoas_goal2 = game.autoas_goal2.mul(game.autoas_delta)
                }
            }

            for (let i = 0; i < 3; i++) {
                game.rune_power[i] = new Decimal(0)
                game.rune_boost[i] = new Decimal(1)
            }

            game.prestige_bought = new Array(26).fill(0)
            game.prestige_bought[12] = 1
            game.prestige_bought[25] = 1

            prestige_upgrade.upgrades[0].price = new Decimal(1)
            prestige_upgrade.upgrades[2].price = new Decimal(2)
            prestige_upgrade.upgrades[3].price = new Decimal(4)
            prestige_upgrade.upgrades[4].price = new Decimal(8)
            prestige_upgrade.upgrades[5].price = new Decimal(16)
            prestige_upgrade.upgrades[9].price = Decimal.pow(2, 20)
            prestige_upgrade.upgrades[20].price = Decimal.pow(2, 214)

            if (game.ascend_bought[3]) {
                game.prestige_bought[0] = 5
                prestige_upgrade.upgrades[0].price = new Decimal(65536)
                game.prestige_bought[4] = 4
                prestige_upgrade.upgrades[4].price = new Decimal(2048)
                game.prestige_bought[7] = 1
                game.prestige_bought[13] = 1
                game.prestige_bought[15] = 1
                game.prestige_bought[22] = 1
            }

            game.arcane_spice = new Decimal(0)
            game.highest_arcane_spice = new Decimal(0)
            for (let i = 0; i < 6; i++) {
                game.arcane_spice_gen[i] = new Decimal(
                    game.arcane_spice_bought[i].toString()
                )
            }
            game.arcane_enchantment = 0n
            game.arcane_enchantment_price = new Decimal(25)

            game.free_enchantment = 0n
            if (
                game.research_complete[15] >= 1 &&
                game.collapse_challenge !== 12
            )
                game.free_enchantment = BigInt(game.arcane_strengthener) * 10n
            if (
                game.research_complete[27] >= 1 &&
                game.collapse_challenge !== 12
            ) {
                let collapse_free = BigInt(game.collapse) * 50n
                if (game.collapse >= 100000)
                    collapse_free = BigInt(
                        Math.floor(
                            2500000 * ((game.collapse - 87500) / 50000) ** 0.5 +
                                3750000
                        )
                    )
                if (game.collapse >= 1337500)
                    collapse_free = BigInt(game.collapse) * 5n + 9562500n
                if (collapse_free > game.arcane_enchantment / 2n)
                    collapse_free = game.arcane_enchantment / 2n

                game.free_enchantment += collapse_free
            }

            prestige(true)
            if (!game.ascend_bought[23] && game.research_complete[18] === 0)
                game.prestige = 0
            game.rainbow_spice = new Decimal(0)
            game.prestige_amount_history = new Array(10).fill(-1)
            game.prestige_time_history = new Array(10).fill(-1)

            game.crystal_spice_price = [
                Decimal.pow(2, 56),
                Decimal.pow(2, 62),
                Decimal.pow(2, 68),
                Decimal.pow(2, 84),
                Decimal.pow(2, 100),
                Decimal.pow(2, 124),
            ]
            game.crystal_spice_gen = [
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
            ]
            game.crystal_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
            game.crystal_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.crystal_strengthener = 0
            game.crystal_strengthener_price = Decimal.pow(2, 76)

            if (game.ascend === 1 && game.collapse === 0) {
                confirmations("ascend", true)
                confirmations("ascend", true)
            }
        }
    } else {
        if (override && game.collapse_challenge !== 11) {
            game.ascend_time_played = 0
            game.real_time_played[2] = 0
            if (game.collapse_challenge === 7) game.ascend_challenge_timer = 0

            game.peak_ansuz_gain = new Decimal(0)
            game.peak_ansuz_amount = new Decimal(0)
            game.peak_ansuz_time = 0

            game.autopr_goal2[0] = 0
            game.autopr_goal2[1] = new Decimal(1)

            for (let i = 0; i < 3; i++) {
                game.rune_power[i] = new Decimal(0)
                game.rune_boost[i] = new Decimal(1)
            }

            game.prestige_bought = new Array(26).fill(0)
            game.prestige_bought[12] = 1
            game.prestige_bought[25] = 1

            prestige_upgrade.upgrades[0].price = new Decimal(1)
            prestige_upgrade.upgrades[2].price = new Decimal(2)
            prestige_upgrade.upgrades[3].price = new Decimal(4)
            prestige_upgrade.upgrades[4].price = new Decimal(8)
            prestige_upgrade.upgrades[5].price = new Decimal(16)
            prestige_upgrade.upgrades[9].price = Decimal.pow(2, 20)
            prestige_upgrade.upgrades[20].price = Decimal.pow(2, 214)

            if (game.ascend_bought[3]) {
                game.prestige_bought[0] = 5
                prestige_upgrade.upgrades[0].price = new Decimal(2).pow(24)
                game.prestige_bought[4] = 4
                prestige_upgrade.upgrades[4].price = new Decimal(2048)
                game.prestige_bought[7] = 1
                game.prestige_bought[13] = 1
                game.prestige_bought[15] = 1
                game.prestige_bought[22] = 1
            }

            game.arcane_spice = new Decimal(0)
            game.highest_arcane_spice = new Decimal(0)
            for (let i = 0; i < 6; i++) {
                game.arcane_spice_gen[i] = new Decimal(
                    game.arcane_spice_bought[i].toString()
                )
            }
            game.arcane_enchantment = 0n
            game.arcane_enchantment_price = new Decimal(25)

            game.free_enchantment = 0n
            if (
                game.research_complete[15] >= 1 &&
                game.collapse_challenge !== 12
            )
                game.free_enchantment = BigInt(game.arcane_strengthener) * 10n
            if (
                game.research_complete[27] >= 1 &&
                game.collapse_challenge !== 12
            ) {
                let collapse_free = BigInt(game.collapse) * 50n
                if (game.collapse >= 100000)
                    collapse_free = BigInt(
                        Math.floor(
                            2500000 * ((game.collapse - 87500) / 50000) ** 0.5 +
                                3750000
                        )
                    )
                if (game.collapse >= 1337500)
                    collapse_free = BigInt(game.collapse) * 5n + 9562500n
                if (collapse_free > game.arcane_enchantment / 2n)
                    collapse_free = game.arcane_enchantment / 2n

                game.free_enchantment += collapse_free
            }

            prestige(true)
            if (!game.ascend_bought[23] && game.research_complete[18] === 0)
                game.prestige = 0
            game.rainbow_spice = new Decimal(0)
            game.prestige_amount_history = new Array(10).fill(-1)
            game.prestige_time_history = new Array(10).fill(-1)

            game.crystal_spice_price = [
                Decimal.pow(2, 56),
                Decimal.pow(2, 62),
                Decimal.pow(2, 68),
                Decimal.pow(2, 84),
                Decimal.pow(2, 100),
                Decimal.pow(2, 124),
            ]
            game.crystal_spice_gen = [
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
            ]
            game.crystal_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
            game.crystal_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.crystal_strengthener = 0
            game.crystal_strengthener_price = Decimal.pow(2, 76)
        }
    }
}

//code for collapsing
function collapse(override, challenge) {
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
        game.collapse_challenge === 0 &&
        challenge === undefined
    ) {
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
        amount = amount.mul(rune_atomic)
    }

    let total_completions = 0
    for (let i = 0; i < 6; i++) {
        total_completions += game.collapse_complete[i]
    }
    if (
        game.research_complete[24] >= 1 &&
        game.collapse_challenge === 0 &&
        challenge === undefined
    )
        amount = amount.mul(Decimal.pow(46656, total_completions))

    let goal = new Decimal(1)
    if (game.collapse_challenge !== 0) {
        goal = get_collapse_goal(game.collapse_challenge - 7, 0)
    }

    if (
        (game.ascend_complete[5] || game.collapse_challenge === 11) &&
        amount.cmp(goal) >= 0
    ) {
        let collapse_ready = false

        if (override || !game.collapse_confirm) collapse_ready = true
        else {
            if (
                confirm(
                    "Are you sure you want to Collapse? This will reset EVERYTHING so far!"
                )
            ) {
                collapse_ready = true
            }
        }

        if (collapse_ready) {
            if (!override) {
                if (game.research_complete[38] >= 1) {
                    let collapse_amount = 1 + 1.05 ** (total_completions - 55)
                    if (collapse_amount > 100)
                        collapse_amount = (collapse_amount / 100) ** 0.5 * 100
                    game.collapse += Math.floor(collapse_amount)
                } else game.collapse++
            }
            game.atomic_spice = game.atomic_spice.add(amount)

            game.unstable_spice = game.total_unstable_spice

            for (let i = 8; i >= 0; i--) {
                game.collapse_amount_history[i + 1] =
                    game.collapse_amount_history[i]
                game.collapse_time_history[i + 1] =
                    game.collapse_time_history[i]
                game.collapse_real_time_history[i + 1] =
                    game.collapse_real_time_history[i]
                game.collapse_challenge_history[i + 1] =
                    game.collapse_challenge_history[i]
            }
            game.collapse_amount_history[0] = amount
            game.collapse_time_history[0] = game.collapse_time_played
            if (game.real_time_played[3] !== game.collapse_time_played)
                game.collapse_real_time_history[0] = game.real_time_played[3]
            else game.collapse_real_time_history[0] = -1
            if (game.collapse_challenge !== 0)
                game.collapse_challenge_history[0] = game.collapse_challenge
            else if (challenge !== undefined)
                game.collapse_challenge_history[0] = challenge
            else game.collapse_challenge_history[0] = -1

            let old_time = game.real_time_played[3]
            game.collapse_time_played = 0
            game.real_time_played[3] = 0
            game.collapse_spice = new Decimal(5)

            game.peak_atomic_gain = new Decimal(0)
            game.peak_atomic_amount = new Decimal(0)
            game.peak_atomic_time = 0

            game.decay_time = 0

            if (game.collapse_challenge !== 0) {
                if (game.research_complete[31] >= 1) {
                    game.collapse_complete[game.collapse_challenge - 7] +=
                        game.pending_completions

                    game.pending_completions = 0
                } else game.collapse_complete[game.collapse_challenge - 7]++
                game.collapse_challenge = 0
            }

            game.ascend_challenge = 0
            game.ascend_complete = new Array(6).fill(false)

            if (game.subtab[3] > 1) game.subtab[3] = 0

            game.ascend_bought = new Array(35).fill(false)

            if (game.research_complete[1] >= 1) {
                game.ascend_bought[3] = true
                game.ascend_bought[8] = true
                game.ascend_bought[9] = true
                game.ascend_bought[10] = true
                game.ascend_bought[12] = true
                game.ascend_bought[17] = true
                game.ascend_bought[23] = true
                game.ascend_bought[25] = true
            }

            game.autoas_goal2 = new Decimal(1)

            ascend(true)
            if (game.research_complete[18] === 0) {
                game.ascend = 0
                game.prestige = 0
            }
            game.ansuz = new Decimal(0)
            game.rune = [new Decimal(0), new Decimal(0), new Decimal(0)]
            game.total_rune_power = new Decimal(0)

            game.autods_budget = new Decimal(0)

            game.ascend_amount_history = new Array(10).fill(-1)
            game.ascend_time_history = new Array(10).fill(-1)

            game.arcane_spice_price = [
                new Decimal(531441),
                Decimal.pow(3, 16),
                Decimal.pow(3, 20),
                Decimal.pow(3, 36),
                Decimal.pow(3, 73),
                Decimal.pow(3, 110),
            ]
            game.arcane_spice_gen = [
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
            ]
            game.arcane_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
            game.arcane_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.arcane_strengthener = 0
            game.arcane_strengthener_price = Decimal.pow(3, 24)

            game.free_enchantment = 0n
            if (
                game.research_complete[27] >= 1 &&
                game.collapse_challenge !== 12
            ) {
                let collapse_free = BigInt(game.collapse) * 50n
                if (game.collapse >= 100000)
                    collapse_free = BigInt(
                        Math.floor(
                            2500000 * ((game.collapse - 87500) / 50000) ** 0.5 +
                                3750000
                        )
                    )
                if (game.collapse >= 1337500)
                    collapse_free = BigInt(game.collapse) * 5n + 9562500n
                if (collapse_free > game.arcane_enchantment / 2n)
                    collapse_free = game.arcane_enchantment / 2n

                game.free_enchantment = collapse_free
            }

            game.global_spice_boost = new Decimal(1)

            let third_condition = true

            if (old_time < 0.5 && game.collider_animation)
                third_condition = false

            if (
                game.research_complete[30] >= 1 &&
                game.autosc_toggle &&
                third_condition
            )
                auto_collider()

            if (game.collapse === 1) {
                confirmations("collapse", true)
                confirmations("collapse", true)
            }
        }
    } else {
        if (override) {
            game.unstable_spice = game.total_unstable_spice

            game.collapse_time_played = 0
            game.real_time_played[3] = 0
            game.collapse_spice = new Decimal(5)

            game.peak_atomic_gain = new Decimal(0)
            game.peak_atomic_amount = new Decimal(0)
            game.peak_atomic_time = 0

            game.decay_time = 0

            game.ascend_challenge = 0
            game.ascend_complete = new Array(6).fill(false)

            if (game.subtab[3] > 1) game.subtab[3] = 0

            game.ascend_bought = new Array(35).fill(false)

            if (game.research_complete[1] >= 1) {
                game.ascend_bought[3] = true
                game.ascend_bought[8] = true
                game.ascend_bought[9] = true
                game.ascend_bought[10] = true
                game.ascend_bought[12] = true
                game.ascend_bought[17] = true
                game.ascend_bought[23] = true
                game.ascend_bought[25] = true
            }

            game.autoas_goal2 = new Decimal(1)

            ascend(true)
            if (game.research_complete[18] === 0) {
                game.ascend = 0
                game.prestige = 0
            }
            game.ansuz = new Decimal(0)
            game.rune = [new Decimal(0), new Decimal(0), new Decimal(0)]
            game.total_rune_power = new Decimal(0)

            game.autods_budget = new Decimal(0)

            game.ascend_amount_history = new Array(10).fill(-1)
            game.ascend_time_history = new Array(10).fill(-1)

            game.arcane_spice_price = [
                new Decimal(531441),
                Decimal.pow(3, 16),
                Decimal.pow(3, 20),
                Decimal.pow(3, 36),
                Decimal.pow(3, 73),
                Decimal.pow(3, 110),
            ]
            game.arcane_spice_gen = [
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
                new Decimal(0),
            ]
            game.arcane_spice_bought = [0n, 0n, 0n, 0n, 0n, 0n]
            game.arcane_spice_boost = [
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
                new Decimal(1),
            ]
            game.arcane_strengthener = 0
            game.arcane_strengthener_price = Decimal.pow(3, 24)

            game.free_enchantment = 0n
            if (
                game.research_complete[27] >= 1 &&
                game.collapse_challenge !== 12
            ) {
                let collapse_free = BigInt(game.collapse) * 50n
                if (game.collapse >= 100000)
                    collapse_free = BigInt(
                        Math.floor(
                            2500000 * ((game.collapse - 87500) / 50000) ** 0.5 +
                                3750000
                        )
                    )
                if (game.collapse >= 1337500)
                    collapse_free = BigInt(game.collapse) * 5n + 9562500n
                if (collapse_free > game.arcane_enchantment / 2n)
                    collapse_free = game.arcane_enchantment / 2n

                game.free_enchantment = collapse_free
            }

            game.global_spice_boost = new Decimal(1)
        }
    }
}
