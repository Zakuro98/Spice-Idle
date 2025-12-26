//graphics updates for expansion
function expansion_update() {
    let spice_unit = " g"
    if (game.notation === 14) spice_unit = ""

    let expand_amount = Decimal.pow(
        phi,
        game.expand_spice
            .div(Decimal.pow(10, 4.05e18 + Math.E * 1e15))
            .log(10) / 5e17
    )
        .mul(2)
        .floor()

    if (expand_amount.cmp(2584) >= 0)
        expand_amount = expand_amount
            .div(2584)
            .pow(2 / 3)
            .mul(2584)

    let power = 10
    while (expand_amount.cmp(Decimal.pow(10, power)) >= 0) {
        expand_amount = expand_amount.pow(
            (4 * power ** 0.5 * (power + 8 * expand_amount.log(10)) ** 0.5 -
                4 * power) /
                (8 * expand_amount.log(10))
        )
        if (power === 50) {
            expand_amount = expand_amount
                .div(Decimal.pow(10, power))
                .pow(0.5)
                .mul(Decimal.pow(10, power))
        }
        power *= 5
    }

    if (expand_amount.cmp(1) >= 0 && game.antispice_bought[8]) {
        if (game.selected_realm !== -1) {
            document.getElementById("expand_button").className =
                "expand_button ex_unlocked"
            if (!game.realms_visited.includes(game.selected_realm)) {
                document.getElementById("expand_span").innerHTML =
                    "Expand Your Empire"
                document.getElementById("expand_span").className =
                    "galactic_span bold"
            } else {
                document.getElementById("expand_span").innerHTML =
                    "Revisit This Realm"
                document.getElementById("expand_span").className =
                    "galactic_span"
            }
        } else {
            document.getElementById("expand_button").className =
                "expand_button ex_locked"
        }
        document.getElementById("expand_up").style.display = "block"
        document.getElementById("expand_req2").style.display = "none"

        if (expand_amount.cmp(1) === 0)
            document.getElementById("expand_up").innerHTML =
                "+" +
                format_inum(expand_amount, game.notation) +
                " galactic shard"
        else
            document.getElementById("expand_up").innerHTML =
                "+" +
                format_inum(expand_amount, game.notation) +
                " galactic shards"

        if (expand_amount.cmp(1000) === -1) {
            document.getElementById("expand_req").style.display = "block"
            document.getElementById("expand_req").innerHTML =
                format_idec(
                    game.realm_limit.mul(
                        Decimal.pow(
                            10,
                            expand_amount.add(1).div(2).log(phi) * 5e17
                        )
                    ),
                    game.notation
                ) +
                spice_unit +
                " total " +
                spice_text[0] +
                " required for next galactic shard"
        } else {
            document.getElementById("expand_req").style.display = "none"
        }

        let total_pending_shards = 0
        for (let i = 0; i < 7; i++) {
            total_pending_shards += game.pending_shards[i]
        }
        if (total_pending_shards >= 1) {
            document.getElementById("exotic_up").style.display = "block"
            if (total_pending_shards === 1)
                document.getElementById("exotic_up").innerHTML =
                    "+" +
                    format_num(total_pending_shards, game.notation) +
                    " exotic shard"
            else
                document.getElementById("exotic_up").innerHTML =
                    "+" +
                    format_num(total_pending_shards, game.notation) +
                    " exotic shards"
        } else {
            document.getElementById("exotic_up").style.display = "none"
        }

        if (game.resource_efficiency) {
            document.getElementById("expand_efficiency").style.display = "block"

            let efficiency_str =
                "Currently: +" +
                format_idec(
                    expand_amount.div(game.real_time_played[4]).mul(60),
                    game.notation
                ) +
                " galactic shards/min"
            if (expand_amount.div(game.real_time_played[4]).cmp(1 / 60) === -1)
                efficiency_str =
                    "Currently: +" +
                    format_idec(
                        expand_amount.div(game.real_time_played[4]).mul(3600),
                        game.notation
                    ) +
                    " galactic shards/hour"

            if (game.galactic_bought[18]) {
                switch (game.autore_mode) {
                    case 0:
                        if (game.peak_galactic_gain.cmp(1 / 60) === -1)
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_galactic_gain.mul(3600),
                                    game.notation
                                ) +
                                " galactic shards/hour at +" +
                                format_idec(
                                    game.peak_galactic_amount,
                                    game.notation
                                ) +
                                " galactic shards"
                        else
                            efficiency_str +=
                                "<br>Peak: +" +
                                format_idec(
                                    game.peak_galactic_gain.mul(60),
                                    game.notation
                                ) +
                                " galactic shards/min at +" +
                                format_idec(
                                    game.peak_galactic_amount,
                                    game.notation
                                ) +
                                " galactic shards"
                        break
                    case 1:
                        if (game.peak_galactic_time < 1) {
                            if (game.peak_galactic_gain.cmp(1 / 60) === -1)
                                efficiency_str +=
                                    "<br>Peak: +" +
                                    format_idec(
                                        game.peak_galactic_gain.mul(3600),
                                        game.notation
                                    ) +
                                    " galactic shards/hour at " +
                                    game.peak_galactic_time.toFixed(2) +
                                    "s"
                            else
                                efficiency_str +=
                                    "<br>Peak: +" +
                                    format_idec(
                                        game.peak_galactic_gain.mul(60),
                                        game.notation
                                    ) +
                                    " galactic shards/min at " +
                                    game.peak_galactic_time.toFixed(2) +
                                    "s"
                        } else {
                            if (game.peak_galactic_gain.cmp(1 / 60) === -1)
                                efficiency_str +=
                                    "<br>Peak: +" +
                                    format_idec(
                                        game.peak_galactic_gain.mul(3600),
                                        game.notation
                                    ) +
                                    " galactic shards/hour at " +
                                    format_dec(
                                        game.peak_galactic_time,
                                        game.notation
                                    ) +
                                    "s"
                            else
                                efficiency_str +=
                                    "<br>Peak: +" +
                                    format_idec(
                                        game.peak_galactic_gain.mul(60),
                                        game.notation
                                    ) +
                                    " galactic shards/min at " +
                                    format_dec(
                                        game.peak_galactic_time,
                                        game.notation
                                    ) +
                                    "s"
                        }
                        break
                }
            } else {
                if (game.peak_galactic_gain.cmp(1 / 60) === -1)
                    efficiency_str +=
                        "<br>Peak: +" +
                        format_idec(
                            game.peak_galactic_gain.mul(3600),
                            game.notation
                        ) +
                        " galactic shards/hour"
                else
                    efficiency_str +=
                        "<br>Peak: +" +
                        format_idec(
                            game.peak_galactic_gain.mul(60),
                            game.notation
                        ) +
                        " galactic shards/min"
            }

            document.getElementById("expand_efficiency").innerHTML =
                efficiency_str
        } else {
            document.getElementById("expand_efficiency").style.display = "none"
        }
    } else {
        document.getElementById("expand_button").className =
            "expand_button ex_locked"
        document.getElementById("expand_req2").style.display = "block"
        document.getElementById("expand_up").style.display = "none"
        document.getElementById("expand_req").style.display = "none"
        document.getElementById("exotic_up").style.display = "none"

        if (game.resource_efficiency) {
            document.getElementById("expand_efficiency").style.display = "block"

            let efficiency_str =
                "Currently: +" +
                format_dec(0, game.notation) +
                " galactic shards/hour"

            efficiency_str +=
                "<br>Peak: +" +
                format_dec(0, game.notation) +
                " galactic shards/hour"

            document.getElementById("expand_efficiency").innerHTML =
                efficiency_str
        } else {
            document.getElementById("expand_efficiency").style.display = "none"
        }
    }

    if (game.galactic_bought[18]) {
        document.getElementById("revisit_auto_block").style.display = "block"

        if (game.autore_mode === 0) {
            document.getElementById("revisit_shards").style.display = "flex"
            document.getElementById("revisit_time").style.display = "none"
        } else if (game.autore_mode === 1) {
            document.getElementById("revisit_shards").style.display = "none"
            document.getElementById("revisit_time").style.display = "flex"
        }
    } else {
        document.getElementById("revisit_auto_block").style.display = "none"
    }

    if (game.galactic_bought[25]) {
        document.getElementById("expand_auto_block").style.display = "block"

        if (game.autoex_mode === 0) {
            document.getElementById("expand_auto_instruction").style.display =
                "block"
        } else if (game.autoex_mode === 1) {
            document.getElementById("expand_auto_instruction").style.display =
                "none"
        }
    } else {
        document.getElementById("expand_auto_block").style.display = "none"
    }

    let highest_bought = -1
    for (let i = 0; i < 32; i++) {
        if (game.galactic_bought[i]) highest_bought = i
    }

    let crystals_equipped = 0
    for (let i = 0; i < 3; i++) {
        if (game.equip[i] !== null) crystals_equipped++
    }

    if (
        game.hovered_realm !== -1 &&
        game.hovered_realm !== game.selected_realm &&
        game.hovered_realm !== game.target_realm
    ) {
        let realm_str = ""
        if (realm.realms[game.hovered_realm].normal >= 0)
            realm_str =
                "+" +
                format_dec(
                    realm.realms[game.hovered_realm].normal,
                    game.notation
                ) +
                "% normal " +
                spice_text[0] +
                " power"
        else
            realm_str =
                "-" +
                format_dec(
                    -realm.realms[game.hovered_realm].normal,
                    game.notation
                ) +
                "% normal " +
                spice_text[0] +
                " power"
        if (realm.realms[game.hovered_realm].special >= 0)
            realm_str +=
                "<br>+" +
                format_dec(
                    realm.realms[game.hovered_realm].special,
                    game.notation
                ) +
                "% special " +
                spice_text[0] +
                " power"
        else
            realm_str +=
                "<br>-" +
                format_dec(
                    -realm.realms[game.hovered_realm].special,
                    game.notation
                ) +
                "% special " +
                spice_text[0] +
                " power"
        if (realm.realms[game.hovered_realm].reset > 0)
            realm_str +=
                "<br>+" +
                format_dec(
                    realm.realms[game.hovered_realm].reset,
                    game.notation
                ) +
                "% reset gain power"
        else if (realm.realms[game.hovered_realm].reset < 0)
            realm_str +=
                "<br>-" +
                format_dec(
                    -realm.realms[game.hovered_realm].reset,
                    game.notation
                ) +
                "% reset gain power"

        document.getElementById("realm_view_panel").style.display = "flex"

        if (game.hovered_realm === 0) {
            document.getElementById("realm_view").innerHTML = "?????"
            realm_str = "?????"
        } else if (game.hovered_realm < 6) {
            document.getElementById("realm_view").innerHTML = "?????"
            realm_str = "It seems you can't access this realm for now..."
        } else if (
            (realm.realms[game.hovered_realm].x ** 2 +
                realm.realms[game.hovered_realm].y ** 2) **
                0.5 <=
                160 &&
            crystals_equipped === 0
        ) {
            document.getElementById("realm_view").innerHTML = "?????"
            if (highest_bought >= 12)
                realm_str =
                    "A galactic crystal must be equipped to enter this realm"
            else realm_str = "It seems you can't access this realm for now..."
        } else {
            document.getElementById("realm_view").innerHTML =
                realm.realms[game.hovered_realm].name
        }

        document.getElementById("realm_view2").innerHTML = realm_str
    } else if (
        game.target_realm !== -1 &&
        game.hovered_realm !== game.selected_realm
    ) {
        let realm_str = ""
        if (realm.realms[game.target_realm].normal >= 0)
            realm_str =
                "+" +
                format_dec(
                    realm.realms[game.target_realm].normal,
                    game.notation
                ) +
                "% normal " +
                spice_text[0] +
                " power"
        else
            realm_str =
                "-" +
                format_dec(
                    -realm.realms[game.target_realm].normal,
                    game.notation
                ) +
                "% normal " +
                spice_text[0] +
                " power"
        if (realm.realms[game.target_realm].special >= 0)
            realm_str +=
                "<br>+" +
                format_dec(
                    realm.realms[game.target_realm].special,
                    game.notation
                ) +
                "% special " +
                spice_text[0] +
                " power"
        else
            realm_str +=
                "<br>-" +
                format_dec(
                    -realm.realms[game.target_realm].special,
                    game.notation
                ) +
                "% special " +
                spice_text[0] +
                " power"
        if (realm.realms[game.target_realm].reset > 0)
            realm_str +=
                "<br>+" +
                format_dec(
                    realm.realms[game.target_realm].reset,
                    game.notation
                ) +
                "% reset gain power"
        else if (realm.realms[game.target_realm].reset < 0)
            realm_str +=
                "<br>-" +
                format_dec(
                    -realm.realms[game.target_realm].reset,
                    game.notation
                ) +
                "% reset gain power"

        document.getElementById("realm_view_panel").style.display = "flex"

        if (game.target_realm === 0) {
            document.getElementById("realm_view").innerHTML = "?????"
            realm_str = "?????"
        } else if (game.target_realm < 6) {
            document.getElementById("realm_view").innerHTML = "?????"
            realm_str = "It seems you can't access this realm for now..."
        } else if (
            (realm.realms[game.target_realm].x ** 2 +
                realm.realms[game.target_realm].y ** 2) **
                0.5 <=
                160 &&
            crystals_equipped === 0
        ) {
            document.getElementById("realm_view").innerHTML = "?????"
            if (highest_bought >= 12)
                realm_str =
                    "A galactic crystal must be equipped to enter this realm"
            else realm_str = "It seems you can't access this realm for now..."
        } else {
            document.getElementById("realm_view").innerHTML =
                realm.realms[game.target_realm].name
        }

        document.getElementById("realm_view2").innerHTML = realm_str
    } else {
        if (game.selected_realm !== -1) {
            let realm_str = ""
            if (realm.realms[game.selected_realm].normal >= 0)
                realm_str =
                    "+" +
                    format_dec(
                        realm.realms[game.selected_realm].normal,
                        game.notation
                    ) +
                    "% normal " +
                    spice_text[0] +
                    " power"
            else
                realm_str =
                    "-" +
                    format_dec(
                        -realm.realms[game.selected_realm].normal,
                        game.notation
                    ) +
                    "% normal " +
                    spice_text[0] +
                    " power"
            if (realm.realms[game.selected_realm].special >= 0)
                realm_str +=
                    "<br>+" +
                    format_dec(
                        realm.realms[game.selected_realm].special,
                        game.notation
                    ) +
                    "% special " +
                    spice_text[0] +
                    " power"
            else
                realm_str +=
                    "<br>-" +
                    format_dec(
                        -realm.realms[game.selected_realm].special,
                        game.notation
                    ) +
                    "% special " +
                    spice_text[0] +
                    " power"
            if (realm.realms[game.selected_realm].reset > 0)
                realm_str +=
                    "<br>+" +
                    format_dec(
                        realm.realms[game.selected_realm].reset,
                        game.notation
                    ) +
                    "% reset gain power"
            else if (realm.realms[game.selected_realm].reset < 0)
                realm_str +=
                    "<br>-" +
                    format_dec(
                        -realm.realms[game.selected_realm].reset,
                        game.notation
                    ) +
                    "% reset gain power"

            document.getElementById("realm_view_panel").style.display = "flex"

            if (game.selected_realm === 0) {
                document.getElementById("realm_view").innerHTML = "?????"
                realm_str = "?????"
            } else if (game.selected_realm < 6) {
                document.getElementById("realm_view").innerHTML = "?????"
                realm_str = "It seems you can't access this realm for now..."
            } else if (
                (realm.realms[game.selected_realm].x ** 2 +
                    realm.realms[game.selected_realm].y ** 2) **
                    0.5 <=
                    160 &&
                crystals_equipped === 0
            ) {
                document.getElementById("realm_view").innerHTML = "?????"
                if (highest_bought >= 12)
                    realm_str =
                        "A galactic crystal must be equipped to enter this realm"
                else
                    realm_str =
                        "It seems you can't access this realm for now..."
            } else {
                document.getElementById("realm_view").innerHTML =
                    realm.realms[game.selected_realm].name
            }

            document.getElementById("realm_view2").innerHTML = realm_str
        } else {
            document.getElementById("realm_view_panel").style.display = "none"
        }
    }

    document.getElementById("center_distance").innerHTML =
        "Distance to center: " +
        format_num(
            Math.round(
                (realm.realms[game.current_realm].x ** 2 +
                    realm.realms[game.current_realm].y ** 2) **
                    0.5
            ),
            game.notation
        ) +
        " units"

    if (game.galactic_bought[21]) {
        document.getElementById("exploration_view").className = "view_scroll"
        document.getElementById("zoom_out").style.display = "inline-block"
        document.getElementById("zoom_reset").style.display = "inline-block"
        document.getElementById("zoom_in").style.display = "inline-block"
    } else {
        document.getElementById("exploration_view").className = "view_noscroll"
        document.getElementById("zoom_out").style.display = "none"
        document.getElementById("zoom_reset").style.display = "none"
        document.getElementById("zoom_in").style.display = "none"
    }

    document.getElementById("galactic_shards_num").innerHTML = format_inum(
        game.galactic_shards,
        game.notation
    )
    document.getElementById("galactic_shards_num2").innerHTML = format_inum(
        game.galactic_shards,
        game.notation
    )
    document.getElementById("galactic_shards_num3").innerHTML = format_inum(
        game.galactic_shards,
        game.notation
    )
    document.getElementById("galactic_shards_num4").innerHTML = format_inum(
        game.galactic_shards,
        game.notation
    )
    if (game.galactic_shards.cmp(1) === 0) {
        document.getElementById("galactic_shards_text").innerHTML =
            "galactic shard"
        document.getElementById("galactic_shards_text2").innerHTML =
            "galactic shard"
        document.getElementById("galactic_shards_text3").innerHTML =
            "galactic shard"
        document.getElementById("galactic_shards_text4").innerHTML =
            "galactic shard"
    } else {
        document.getElementById("galactic_shards_text").innerHTML =
            "galactic shards"
        document.getElementById("galactic_shards_text2").innerHTML =
            "galactic shards"
        document.getElementById("galactic_shards_text3").innerHTML =
            "galactic shards"
        document.getElementById("galactic_shards_text4").innerHTML =
            "galactic shards"
    }

    let realm_str = ""
    if (game.realm_effects[0] >= 0)
        realm_str +=
            "+" +
            format_dec(game.realm_effects[0], game.notation) +
            "% normal " +
            spice_text[0] +
            " power"
    else
        realm_str +=
            "-" +
            format_dec(-game.realm_effects[0], game.notation) +
            "% normal " +
            spice_text[0] +
            " power"
    if (game.realm_effects[1] >= 0)
        realm_str +=
            "<br>+" +
            format_dec(game.realm_effects[1], game.notation) +
            "% special " +
            spice_text[0] +
            " power"
    else
        realm_str +=
            "<br>-" +
            format_dec(-game.realm_effects[1], game.notation) +
            "% special " +
            spice_text[0] +
            " power"
    if (game.realm_effects[2] > 0)
        realm_str +=
            "<br>+" +
            format_dec(game.realm_effects[2], game.notation) +
            "% reset gain power"
    else if (game.realm_effects[2] < 0)
        realm_str +=
            "<br>-" +
            format_dec(-game.realm_effects[2], game.notation) +
            "% reset gain power"
    document.getElementById("realm_current2").innerHTML =
        realm_str +
        "<br><br>(Dark " +
        spice_text[0] +
        " and galactic shards are unaffected by these effects)"
    document.getElementById("realm_current").innerHTML =
        realm.realms[game.current_realm].name

    document.getElementById("realm_capacity_text").innerHTML =
        "Realm Capacity<br>" +
        format_idec(game.realm_limit, game.notation) +
        spice_unit +
        " red " +
        spice_text[0]
    document.getElementById("realm_capacity_cost").innerHTML =
        "-" +
        format_inum(game.realm_limit_price, game.notation) +
        " galactic shards"
    if (game.galactic_shards.cmp(game.realm_limit_price) >= 0) {
        document.getElementById("realm_capacity_button").className =
            "ex_upgrade ex_unlocked3"
        document.getElementById("realm_capacity_cost").className =
            "bold galactic_span"
    } else {
        document.getElementById("realm_capacity_button").className =
            "ex_upgrade ex_locked"
        document.getElementById("realm_capacity_cost").className = "bold"
    }

    document.getElementById("jump_distance_text").innerHTML =
        "Max Jump Distance<br>" +
        format_num(40 + 10 * game.jump_distance_level, game.notation) +
        " units"
    if (game.jump_distance_level >= 4) {
        document.getElementById("jump_distance_cost").innerHTML = "Maxed"
        document.getElementById("jump_distance_button").className =
            "ex_upgrade ex_bought"
        document.getElementById("jump_distance_cost").className = "bold"
    } else {
        document.getElementById("jump_distance_cost").innerHTML =
            "-" +
            format_inum(game.jump_distance_price, game.notation) +
            " galactic shards"
        if (game.galactic_shards.cmp(game.jump_distance_price) >= 0) {
            document.getElementById("jump_distance_button").className =
                "ex_upgrade ex_unlocked3"
            document.getElementById("jump_distance_cost").className =
                "bold galactic_span"
        } else {
            document.getElementById("jump_distance_button").className =
                "ex_upgrade ex_locked"
            document.getElementById("jump_distance_cost").className = "bold"
        }
    }

    let bought = 0
    for (const u of galactic_upgrade.upgrades) {
        switch (u.id) {
            case 13:
                if (game.expand >= 300)
                    u.desc =
                        "Times Expanded stat boosts atomic " +
                        spice_text[0] +
                        " gains, even in Collapse Challenges<br>(Currently: " +
                        format_idec(
                            Decimal.pow(
                                10,
                                1500 * phi ** 2 * (game.expand / 300) ** 0.5
                            ),
                            game.notation
                        ) +
                        "x)"
                else
                    u.desc =
                        "Times Expanded stat boosts atomic " +
                        spice_text[0] +
                        " gains, even in Collapse Challenges<br>(Currently: " +
                        format_idec(
                            Decimal.pow(10, 5 * phi ** 2 * game.expand),
                            game.notation
                        ) +
                        "x)"
                break
            case 22:
                u.desc =
                    "All " +
                    spice_text[0] +
                    " production except dark " +
                    spice_text[0] +
                    " is " +
                    format_dec(
                        (game.realms_visited.length *
                            (game.new_generation ? 1 : 8 / 7)) **
                            0.5 /
                            1.6 ** 0.5,
                        game.notation
                    ) +
                    "% stronger<br>(based on realms visited)"
                break
            case 27:
                u.desc =
                    "Dark " +
                    spice_text[0] +
                    " production is boosted by unspent galactic shards<br>(Currently: " +
                    format_idec(
                        game.galactic_shards.div(fib(603, true)).pow(2).add(1),
                        game.notation
                    ) +
                    "x)"
                break
        }

        let button = galactic_map.get(u)

        if (highest_bought + 8 >= u.id) {
            button.style.visibility = "visible"
        } else {
            button.style.visibility = "hidden"
        }

        if (highest_bought + 4 >= u.id || game.galactic_bought[u.id]) {
            document.getElementById("ex_desc" + u.id).innerHTML = u.desc
        } else {
            document.getElementById("ex_desc" + u.id).innerHTML = "?????"
        }

        if (u.price.cmp(1) === 0)
            document.getElementById("ex_cost" + u.id).innerHTML =
                "-" + format_inum(u.price, game.notation) + " galactic shard"
        else
            document.getElementById("ex_cost" + u.id).innerHTML =
                "-" + format_inum(u.price, game.notation) + " galactic shards"

        if (key.shift >= 0) {
            document.getElementById("ex_cost" + u.id).style.display = "none"
            document.getElementById("ex_desc" + u.id).innerHTML =
                '<span class="big">' + format_num(u.id + 1, 0) + "</span>"
        } else {
            document.getElementById("ex_cost" + u.id).style.display = "block"
        }

        if (game.galactic_bought[u.id]) {
            button.className = "galactic_upgrade ex_bought"
            document.getElementById("ex_desc" + u.id).className = ""
            document.getElementById("ex_cost" + u.id).className = "bold"
            bought++
        } else {
            if (
                game.galactic_shards.cmp(u.price) >= 0 &&
                (game.galactic_bought[0] || u.id === 0)
            ) {
                button.className = "galactic_upgrade ex_unlocked2"
                document.getElementById("ex_desc" + u.id).className =
                    "galactic_span"
                document.getElementById("ex_cost" + u.id).className =
                    "bold galactic_span"
            } else {
                button.className = "galactic_upgrade ex_locked"
                document.getElementById("ex_desc" + u.id).className = ""
                document.getElementById("ex_cost" + u.id).className = "bold"
            }
        }
    }

    if (bought >= 32) {
        document.getElementById("coming_soon").style.display = "block"
    } else {
        document.getElementById("coming_soon").style.display = "none"
    }

    if (game.galactic_bought[20]) {
        document.getElementById("galactic_crystals").innerHTML =
            "GALACTIC CRYSTALS"
        if (game.subtab[5] === 3)
            document.getElementById("galactic_crystals").className =
                "subtab selected"
        else
            document.getElementById("galactic_crystals").className =
                "subtab unlocked"
    } else {
        document.getElementById("galactic_crystals").innerHTML = "LOCKED"
        document.getElementById("galactic_crystals").className = "subtab locked"
    }
}

//graphics updates for dark spice
function dark_update() {
    let spice_unit = " kg"
    if (game.notation === 14) {
        spice_unit = ""
    }

    document.getElementById("dark_spice_num").innerHTML =
        format_idec(game.dark_spice, game.notation) + spice_unit

    let synergy_str = ""
    if (game.galactic_bought[0]) {
        if (game.total_dark_spice.cmp(1e10) >= 0)
            synergy_str =
                "<br><br>Dark " +
                spice_text[0] +
                " synergies:<br>Dark " +
                spice_text[0] +
                " extractor production " +
                format_idec(
                    Decimal.max(
                        game.total_dark_spice
                            .div(10)
                            .sub(5.24701e8)
                            .pow(0.25)
                            .mul(32)
                            .add(866.28),
                        1
                    ),
                    game.notation
                ) +
                "x"
        else
            synergy_str =
                "<br><br>Dark " +
                spice_text[0] +
                " synergies:<br>Dark " +
                spice_text[0] +
                " extractor production " +
                format_idec(
                    Decimal.max(
                        game.total_dark_spice.div(320).pow(0.5).add(1),
                        1
                    ),
                    game.notation
                ) +
                "x"
    }
    if (game.galactic_bought[11]) {
        synergy_str +=
            "<br>Arcane " +
            spice_text[0] +
            " production " +
            format_idec(
                Decimal.max(game.total_dark_spice.pow(1e11).add(1), 1),
                game.notation
            ) +
            "x"
    }

    document.getElementById("dark_spice_up").innerHTML =
        "+" +
        format_idec(
            game.dark_spice_gen[0]
                .floor()
                .mul(game.total_dark_spice_boost[0])
                .mul(
                    game.realtime_production
                        ? game.gamespeed ** (game.dark_gamespeed_level / 100)
                        : 1
                ),
            game.notation
        ) +
        spice_unit +
        " dark " +
        spice_text[0] +
        "/sec" +
        synergy_str
    if (game.dark_spice_bought[0] >= 1n)
        document.getElementById("dark_spice_up").innerHTML =
            "+" +
            format_idec(
                game.dark_spice_gen[0]
                    .floor()
                    .mul(game.total_dark_spice_boost[0])
                    .mul(
                        game.realtime_production
                            ? game.gamespeed **
                                  (game.dark_gamespeed_level / 100)
                            : 1
                    ),
                game.notation
            ) +
            spice_unit +
            " dark " +
            spice_text[0] +
            "/sec" +
            synergy_str +
            "<br><br>For every dark " +
            spice_text[0] +
            " generator bought after the first, that generator's boost is multiplied by " +
            format_dec(phi, game.notation)

    for (const gen of spice_gen.generators) {
        let element = spice_map.get(gen)
        let info = element.querySelector(".spice_gen_info")
        let boost = element.querySelector(".spice_gen_boost")

        let info_str = ""

        const dark_reduction = [1, 720, 1440, 576000, 2.88e10, 1.728e17]

        switch (gen.color) {
            case "dark":
                info_str =
                    "You have " +
                    format_inum(
                        game.dark_spice_gen[gen.id].floor(),
                        game.notation
                    ) +
                    " dark " +
                    spice_text[0] +
                    " " +
                    gen.plural
                if (
                    game.dark_spice_gen[gen.id].cmp(
                        new Decimal(game.dark_spice_bought[gen.id].toString())
                    ) === 0
                ) {
                    info_str += ",<br>producing "
                } else {
                    info_str +=
                        " (" +
                        format_small(game.dark_spice_bought[gen.id]) +
                        " bought),<br>producing "
                }
                if (gen.id === 0) {
                    info_str +=
                        format_idec(
                            game.dark_spice_gen[gen.id]
                                .floor()
                                .mul(game.total_dark_spice_boost[gen.id])
                                .mul(
                                    game.realtime_production
                                        ? game.gamespeed **
                                              (game.dark_gamespeed_level / 100)
                                        : 1
                                ),
                            game.notation
                        ) +
                        spice_unit +
                        " dark " +
                        spice_text[0] +
                        "/sec"
                } else {
                    if (
                        game.dark_spice_gen[gen.id]
                            .floor()
                            .mul(game.total_dark_spice_boost[gen.id])
                            .mul(
                                game.realtime_production
                                    ? game.gamespeed **
                                          (game.dark_gamespeed_level / 100)
                                    : 1
                            )
                            .div(dark_reduction[gen.id])
                            .cmp(1 / 60) === -1
                    ) {
                        info_str +=
                            format_idec(
                                game.dark_spice_gen[gen.id]
                                    .floor()
                                    .mul(game.total_dark_spice_boost[gen.id])
                                    .mul(
                                        game.realtime_production
                                            ? game.gamespeed **
                                                  (game.dark_gamespeed_level /
                                                      100)
                                            : 1
                                    )
                                    .mul(3600 / dark_reduction[gen.id]),
                                game.notation
                            ) +
                            " dark " +
                            spice_text[0] +
                            " " +
                            spice_gen.generators[gen.rid - 1].plural +
                            "/hour"
                    } else if (
                        game.dark_spice_gen[gen.id]
                            .floor()
                            .mul(game.total_dark_spice_boost[gen.id])
                            .mul(
                                game.realtime_production
                                    ? game.gamespeed **
                                          (game.dark_gamespeed_level / 100)
                                    : 1
                            )
                            .div(dark_reduction[gen.id])
                            .cmp(1) === -1
                    ) {
                        info_str +=
                            format_idec(
                                game.dark_spice_gen[gen.id]
                                    .floor()
                                    .mul(game.total_dark_spice_boost[gen.id])
                                    .mul(
                                        game.realtime_production
                                            ? game.gamespeed **
                                                  (game.dark_gamespeed_level /
                                                      100)
                                            : 1
                                    )
                                    .mul(60 / dark_reduction[gen.id]),
                                game.notation
                            ) +
                            " dark " +
                            spice_text[0] +
                            " " +
                            spice_gen.generators[gen.rid - 1].plural +
                            "/min"
                    } else {
                        info_str +=
                            format_idec(
                                game.dark_spice_gen[gen.id]
                                    .floor()
                                    .mul(game.total_dark_spice_boost[gen.id])
                                    .mul(
                                        game.realtime_production
                                            ? game.gamespeed **
                                                  (game.dark_gamespeed_level /
                                                      100)
                                            : 1
                                    )
                                    .div(dark_reduction[gen.id]),
                                game.notation
                            ) +
                            " dark " +
                            spice_text[0] +
                            " " +
                            spice_gen.generators[gen.rid - 1].plural +
                            "/sec"
                    }
                }
                if (gen.id <= 4 && game.galactic_bought[19]) {
                    info_str +=
                        ",<br> and boosting dark " +
                        spice_text[0] +
                        " " +
                        spice_gen.generators[gen.rid + 1].name +
                        " production " +
                        format_idec(
                            game.dark_spice_gen[gen.id].pow(0.075).add(1),
                            game.notation
                        ) +
                        "x"
                }
                if (game.condensed)
                    info_str =
                        format_inum(
                            game.dark_spice_gen[gen.id].floor(),
                            game.notation
                        ) +
                        " " +
                        gen.plural +
                        " <span class='bold'>" +
                        format_idec(
                            game.total_dark_spice_boost[gen.id],
                            game.notation
                        ) +
                        "x</span>"
                info.innerHTML = info_str

                boost.innerHTML =
                    "Your dark " +
                    spice_text[0] +
                    " " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_dark_spice_boost[gen.id],
                        game.notation
                    ) +
                    "x"

                if (game.condensed) boost.style.display = "none"
                else boost.style.display = "block"

                if (game.dark_spice_price[gen.id].cmp(1) === 0)
                    document.getElementById("dark_cost" + gen.id).innerHTML =
                        "-" +
                        format_inum(
                            game.dark_spice_price[gen.id],
                            game.notation
                        ) +
                        " galactic shard"
                else
                    document.getElementById("dark_cost" + gen.id).innerHTML =
                        "-" +
                        format_inum(
                            game.dark_spice_price[gen.id],
                            game.notation
                        ) +
                        " galactic shards"
                if (
                    game.galactic_shards.cmp(game.dark_spice_price[gen.id]) >= 0
                ) {
                    document.getElementById("dark_cost" + gen.id).className =
                        "galactic_cost"
                    document.getElementById("dark_buy" + gen.id).className =
                        "spice_buy can_buy"
                } else {
                    document.getElementById("dark_cost" + gen.id).className =
                        "empty_cost"
                    document.getElementById("dark_buy" + gen.id).className =
                        "spice_buy"
                }

                if (game.reduce_flashing) {
                    let width =
                        (document.getElementById("dark_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("dark_buy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    document.getElementById("dark_buy" + gen.id).style.width =
                        "auto"

                    let width2 =
                        (document.getElementById("dark_buy" + gen.id)
                            .offsetWidth -
                            1) /
                            parseFloat(
                                getComputedStyle(
                                    document.getElementById("dark_buy" + gen.id)
                                )["font-size"]
                            ) -
                        0.8

                    if (width2 > width) {
                        document.getElementById(
                            "dark_buy" + gen.id
                        ).style.width = width2 + 0.89 + "em"
                    } else {
                        document.getElementById(
                            "dark_buy" + gen.id
                        ).style.width = width + 0.89 + "em"
                    }
                } else {
                    document.getElementById("dark_buy" + gen.id).style.width =
                        "auto"
                }

                if (gen.id === 0) {
                    element.style.display = "block"
                } else {
                    if (game.dark_spice_gen[gen.id - 1].cmp(1) >= 0) {
                        element.style.display = "block"
                    } else {
                        element.style.display = "none"
                    }
                }
                break
        }
    }

    if (game.dark_spice_gen[1].cmp(1) >= 0) {
        document.getElementById("dark_gen_a").style.display = "block"

        let a_str =
            "You have " +
            format_small(game.dark_gamespeed_level, game.notation) +
            " dark " +
            spice_text[0] +
            " accelerators,<br> applying the gamespeed boost to dark " +
            spice_text[0] +
            " production with " +
            format_small(game.dark_gamespeed_level, game.notation) +
            "% strength,<br> effectively making dark " +
            spice_text[0] +
            " production " +
            format_dec(
                game.gamespeed ** (game.dark_gamespeed_level / 100),
                game.notation
            ) +
            "x faster"

        document.getElementById("dark_info_a").innerHTML = a_str
        if (game.dark_gamespeed_level >= 100) {
            document.getElementById("dark_cost_a").innerHTML = "Maxed"
            document.getElementById("dark_cost_a").className = "empty_cost"
            document.getElementById("dark_buy_a").className = "spice_buy"
        } else {
            document.getElementById("dark_cost_a").innerHTML =
                "-" +
                format_inum(game.dark_gamespeed_price, game.notation) +
                " galactic shards"
            if (game.galactic_shards.cmp(game.dark_gamespeed_price) >= 0) {
                document.getElementById("dark_cost_a").className =
                    "galactic_cost"
                document.getElementById("dark_buy_a").className =
                    "spice_buy can_buy"
            } else {
                document.getElementById("dark_cost_a").className = "empty_cost"
                document.getElementById("dark_buy_a").className = "spice_buy"
            }
        }

        if (game.reduce_flashing) {
            let width =
                (document.getElementById("dark_buy_a").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("dark_buy_a"))[
                            "font-size"
                        ]
                    ) -
                0.8

            document.getElementById("dark_buy_a").style.width = "auto"

            let width2 =
                (document.getElementById("dark_buy_a").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("dark_buy_a"))[
                            "font-size"
                        ]
                    ) -
                0.8

            if (width2 > width) {
                document.getElementById("dark_buy_a").style.width =
                    width2 + 0.89 + "em"
            } else {
                document.getElementById("dark_buy_a").style.width =
                    width + 0.89 + "em"
            }
        } else {
            document.getElementById("dark_buy_a").style.width = "auto"
        }
    } else {
        document.getElementById("dark_gen_a").style.display = "none"
    }

    if (game.dark_spice_gen[2].cmp(1) >= 0) {
        document.getElementById("dark_gen_s").style.display = "block"

        let s_str =
            "You have " +
            format_small(game.dark_strengthener) +
            " dark " +
            spice_text[0] +
            " strengtheners,<br>boosting all dark " +
            spice_text[0] +
            " generators " +
            format_idec(
                Decimal.pow(phi ** 2, game.dark_strengthener),
                game.notation
            ) +
            "x"

        document.getElementById("dark_info_s").innerHTML = s_str
        document.getElementById("dark_cost_s").innerHTML =
            "-" +
            format_inum(game.dark_strengthener_price, game.notation) +
            " galactic shards"
        if (game.galactic_shards.cmp(game.dark_strengthener_price) >= 0) {
            document.getElementById("dark_cost_s").className = "galactic_cost"
            document.getElementById("dark_buy_s").className =
                "spice_buy can_buy"
        } else {
            document.getElementById("dark_cost_s").className = "empty_cost"
            document.getElementById("dark_buy_s").className = "spice_buy"
        }

        if (game.reduce_flashing) {
            let width =
                (document.getElementById("dark_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("dark_buy_s"))[
                            "font-size"
                        ]
                    ) -
                0.8

            document.getElementById("dark_buy_s").style.width = "auto"

            let width2 =
                (document.getElementById("dark_buy_s").offsetWidth - 1) /
                    parseFloat(
                        getComputedStyle(document.getElementById("dark_buy_s"))[
                            "font-size"
                        ]
                    ) -
                0.8

            if (width2 > width) {
                document.getElementById("dark_buy_s").style.width =
                    width2 + 0.89 + "em"
            } else {
                document.getElementById("dark_buy_s").style.width =
                    width + 0.89 + "em"
            }
        } else {
            document.getElementById("dark_buy_s").style.width = "auto"
        }
    } else {
        document.getElementById("dark_gen_s").style.display = "none"
    }

    let s_str =
        "You have " + format_small(game.dark_construct) + " dark constructs"
    if (game.galactic_bought[23]) {
        if (game.dark_construct_boost.pow(1 / 850000).cmp(1.005) >= 0)
            s_str +=
                ",<br>boosting all normal " +
                spice_text[0] +
                " generators " +
                format_idec(game.dark_construct_boost, game.notation) +
                "x,<br>boosting all crystallized " +
                spice_text[0] +
                " generators " +
                format_idec(
                    game.dark_construct_boost.pow(1 / 275),
                    game.notation
                ) +
                "x,<br>boosting all arcane " +
                spice_text[0] +
                " generators " +
                format_idec(
                    game.dark_construct_boost.pow(1 / 150000),
                    game.notation
                ) +
                "x,<br>and boosting all dark " +
                spice_text[0] +
                " generators " +
                format_idec(
                    Decimal.pow(phi, Number(game.dark_construct) / 50),
                    game.notation
                ) +
                "x"
        else if (game.dark_construct_boost.pow(1 / 275).cmp(1.005) >= 0)
            s_str +=
                ",<br>boosting all normal " +
                spice_text[0] +
                " generators " +
                format_idec(game.dark_construct_boost, game.notation) +
                "x,<br>boosting all crystallized " +
                spice_text[0] +
                " generators " +
                format_idec(
                    game.dark_construct_boost.pow(1 / 275),
                    game.notation
                ) +
                "x,<br>and boosting all dark " +
                spice_text[0] +
                " generators " +
                format_idec(
                    Decimal.pow(phi, Number(game.dark_construct) / 50),
                    game.notation
                ) +
                "x"
        else
            s_str +=
                ",<br>boosting all normal " +
                spice_text[0] +
                " generators " +
                format_idec(game.dark_construct_boost, game.notation) +
                "x,<br>and boosting all dark " +
                spice_text[0] +
                " generators " +
                format_idec(
                    Decimal.pow(phi, Number(game.dark_construct) / 50),
                    game.notation
                ) +
                "x"
    } else {
        if (game.dark_construct_boost.pow(1 / 850000).cmp(1.005) >= 0)
            s_str +=
                ",<br>boosting all normal " +
                spice_text[0] +
                " generators " +
                format_idec(game.dark_construct_boost, game.notation) +
                "x,<br>boosting all crystallized " +
                spice_text[0] +
                " generators " +
                format_idec(
                    game.dark_construct_boost.pow(1 / 275),
                    game.notation
                ) +
                "x,<br>and boosting all arcane " +
                spice_text[0] +
                " generators " +
                format_idec(
                    game.dark_construct_boost.pow(1 / 150000),
                    game.notation
                ) +
                "x"
        else if (game.dark_construct_boost.pow(1 / 275).cmp(1.005) >= 0)
            s_str +=
                ",<br>boosting all normal " +
                spice_text[0] +
                " generators " +
                format_idec(game.dark_construct_boost, game.notation) +
                "x,<br>and boosting all crystallized " +
                spice_text[0] +
                " generators " +
                format_idec(
                    game.dark_construct_boost.pow(1 / 275),
                    game.notation
                ) +
                "x"
        else
            s_str +=
                ",<br>boosting all normal " +
                spice_text[0] +
                " generators " +
                format_idec(game.dark_construct_boost, game.notation) +
                "x"
    }

    document.getElementById("dark_info_cs").innerHTML = s_str
    document.getElementById("dark_cost_cs").innerHTML =
        "-" +
        format_idec(game.dark_construct_price, game.notation) +
        spice_unit +
        " dark " +
        spice_text[0]
    if (game.dark_spice.cmp(game.dark_construct_price) >= 0) {
        document.getElementById("dark_cost_cs").className = "dark_cost"
        document.getElementById("dark_buy_cs").className = "spice_buy can_buy"
    } else {
        document.getElementById("dark_cost_cs").className = "empty_cost"
        document.getElementById("dark_buy_cs").className = "spice_buy"
    }

    if (game.reduce_flashing) {
        let width =
            (document.getElementById("dark_buy_cs").offsetWidth - 1) /
                parseFloat(
                    getComputedStyle(document.getElementById("dark_buy_cs"))[
                        "font-size"
                    ]
                ) -
            0.8

        document.getElementById("dark_buy_cs").style.width = "auto"

        let width2 =
            (document.getElementById("dark_buy_cs").offsetWidth - 1) /
                parseFloat(
                    getComputedStyle(document.getElementById("dark_buy_cs"))[
                        "font-size"
                    ]
                ) -
            0.8

        if (width2 > width) {
            document.getElementById("dark_buy_cs").style.width =
                width2 + 0.89 + "em"
        } else {
            document.getElementById("dark_buy_cs").style.width =
                width + 0.89 + "em"
        }
    } else {
        document.getElementById("dark_buy_cs").style.width = "auto"
    }

    if (game.dark_construct >= 26 || game.expand >= 2) {
        document.getElementById("dark_gen_cv").style.display = "block"
    } else {
        document.getElementById("dark_gen_cv").style.display = "none"
    }

    s_str =
        "You have " + format_small(game.dark_conversion) + " dark conversions"
    s_str +=
        ",<br>increasing atomic " +
        spice_text[0] +
        " efficiency by " +
        format_dec(game.dark_efficiency * 100, game.notation) +
        "%"
    if (game.galactic_bought[4])
        s_str +=
            ",<br>and boosting research speed " +
            format_num(3 ** game.dark_conversion, game.notation) +
            "x"
    if (game.galactic_bought[26])
        s_str +=
            ",<br>and boosting Prestige, Ascension, and Collapse stat gains " +
            format_dec(10 ** (game.dark_conversion / 120), game.notation) +
            "x"

    document.getElementById("dark_info_cv").innerHTML = s_str
    document.getElementById("dark_cost_cv").innerHTML =
        "-" +
        format_idec(game.dark_conversion_price, game.notation) +
        spice_unit +
        " dark " +
        spice_text[0]
    if (game.dark_spice.cmp(game.dark_conversion_price) >= 0) {
        document.getElementById("dark_cost_cv").className = "dark_cost"
        document.getElementById("dark_buy_cv").className = "spice_buy can_buy"
    } else {
        document.getElementById("dark_cost_cv").className = "empty_cost"
        document.getElementById("dark_buy_cv").className = "spice_buy"
    }

    if (game.reduce_flashing) {
        let width =
            (document.getElementById("dark_buy_cv").offsetWidth - 1) /
                parseFloat(
                    getComputedStyle(document.getElementById("dark_buy_cv"))[
                        "font-size"
                    ]
                ) -
            0.8

        document.getElementById("dark_buy_cv").style.width = "auto"

        let width2 =
            (document.getElementById("dark_buy_cv").offsetWidth - 1) /
                parseFloat(
                    getComputedStyle(document.getElementById("dark_buy_cv"))[
                        "font-size"
                    ]
                ) -
            0.8

        if (width2 > width) {
            document.getElementById("dark_buy_cv").style.width =
                width2 + 0.89 + "em"
        } else {
            document.getElementById("dark_buy_cv").style.width =
                width + 0.89 + "em"
        }
    } else {
        document.getElementById("dark_buy_cv").style.width = "auto"
    }

    if (game.dark_spice_bought[5] >= 1n) {
        document.getElementById("dark_max_all").style.display = "inline"
    } else {
        document.getElementById("dark_max_all").style.display = "none"
    }

    if (game.galactic_bought[1]) {
        document.getElementById("construct_auto").style.display = "inline"
        document.getElementById("conversion_auto").style.display = "inline"
    } else {
        document.getElementById("construct_auto").style.display = "none"
        document.getElementById("conversion_auto").style.display = "none"
    }
}

//graphics updates for galactic crystals
function crafting_update() {
    document.getElementById("red_shards_num").innerHTML = format_num(
        game.exotic_shards[0],
        game.notation
    )
    if (game.recipe[0] === 0)
        document.getElementById("red_shards_num").innerHTML = format_num(
            game.exotic_shards[0] - game.recipe[1],
            game.notation
        )
    if (game.exotic_shards[0] === 1) {
        document.getElementById("red_shards_text").innerHTML = "red shard"
    } else {
        document.getElementById("red_shards_text").innerHTML = "red shards"
    }
    document.getElementById("yellow_shards_num").innerHTML = format_num(
        game.exotic_shards[1],
        game.notation
    )
    if (game.recipe[0] === 1)
        document.getElementById("yellow_shards_num").innerHTML = format_num(
            game.exotic_shards[1] - game.recipe[1],
            game.notation
        )
    if (game.exotic_shards[1] === 1) {
        document.getElementById("yellow_shards_text").innerHTML = "yellow shard"
    } else {
        document.getElementById("yellow_shards_text").innerHTML =
            "yellow shards"
    }
    document.getElementById("green_shards_num").innerHTML = format_num(
        game.exotic_shards[2],
        game.notation
    )
    if (game.recipe[0] === 2)
        document.getElementById("green_shards_num").innerHTML = format_num(
            game.exotic_shards[2] - game.recipe[1],
            game.notation
        )
    if (game.exotic_shards[2] === 1) {
        document.getElementById("green_shards_text").innerHTML = "green shard"
    } else {
        document.getElementById("green_shards_text").innerHTML = "green shards"
    }
    document.getElementById("blue_shards_num").innerHTML = format_num(
        game.exotic_shards[3],
        game.notation
    )
    if (game.recipe[0] === 3)
        document.getElementById("blue_shards_num").innerHTML = format_num(
            game.exotic_shards[3] - game.recipe[1],
            game.notation
        )
    if (game.exotic_shards[3] === 1) {
        document.getElementById("blue_shards_text").innerHTML = "blue shard"
    } else {
        document.getElementById("blue_shards_text").innerHTML = "blue shards"
    }
    document.getElementById("pink_shards_num").innerHTML = format_num(
        game.exotic_shards[4],
        game.notation
    )
    if (game.recipe[0] === 4)
        document.getElementById("pink_shards_num").innerHTML = format_num(
            game.exotic_shards[4] - game.recipe[1],
            game.notation
        )
    if (game.exotic_shards[4] === 1) {
        document.getElementById("pink_shards_text").innerHTML = "pink shard"
    } else {
        document.getElementById("pink_shards_text").innerHTML = "pink shards"
    }
    if (game.rainbow_shards) {
        document.getElementById("rainbow_shards_block").style.display = "block"
        document.getElementById("rainbow_shards_num").innerHTML = format_num(
            game.exotic_shards[5],
            game.notation
        )
        if (game.recipe[0] === 5)
            document.getElementById("rainbow_shards_num").innerHTML =
                format_num(
                    game.exotic_shards[5] - game.recipe[1],
                    game.notation
                )
        if (game.exotic_shards[5] === 1) {
            document.getElementById("rainbow_shards_text").innerHTML =
                "rainbow shard"
        } else {
            document.getElementById("rainbow_shards_text").innerHTML =
                "rainbow shards"
        }
    } else {
        document.getElementById("rainbow_shards_block").style.display = "none"
    }
    if (game.dark_shards) {
        document.getElementById("dark_shards_block").style.display = "block"
        document.getElementById("dark_shards_num").innerHTML = format_num(
            game.exotic_shards[6],
            game.notation
        )
        if (game.recipe[0] === 6)
            document.getElementById("dark_shards_num").innerHTML = format_num(
                game.exotic_shards[6] - game.recipe[1],
                game.notation
            )
        if (game.exotic_shards[6] === 1) {
            document.getElementById("dark_shards_text").innerHTML = "dark shard"
        } else {
            document.getElementById("dark_shards_text").innerHTML =
                "dark shards"
        }
    } else {
        document.getElementById("dark_shards_block").style.display = "none"
    }

    document.getElementById("level_count").innerHTML =
        "LVL " + format_num(game.crystal_level, game.notation)
    document.getElementById("level_plus").innerHTML =
        "+" + format_num(game.recipe_change, game.notation)
    document.getElementById("level_minus").innerHTML =
        "-" + format_num(game.recipe_change, game.notation)
    document.getElementById("recipe_count").innerHTML = format_num(
        game.recipe[1],
        game.notation
    )
    document.getElementById("recipe_plus").innerHTML =
        "+" + format_num(game.recipe_change, game.notation)
    document.getElementById("recipe_minus").innerHTML =
        "-" + format_num(game.recipe_change, game.notation)
    switch (game.recipe[0]) {
        case 0:
            document.getElementById("recipe_type").innerHTML = "RED"
            document.getElementById("recipe_type").className =
                "recipe_text red_shards"
            document.getElementById("recipe_count").className =
                "recipe_text red_shards"
            break
        case 1:
            document.getElementById("recipe_type").innerHTML = "YELLOW"
            document.getElementById("recipe_type").className =
                "recipe_text yellow_shards"
            document.getElementById("recipe_count").className =
                "recipe_text yellow_shards"
            break
        case 2:
            document.getElementById("recipe_type").innerHTML = "GREEN"
            document.getElementById("recipe_type").className =
                "recipe_text green_shards"
            document.getElementById("recipe_count").className =
                "recipe_text green_shards"
            break
        case 3:
            document.getElementById("recipe_type").innerHTML = "BLUE"
            document.getElementById("recipe_type").className =
                "recipe_text blue_shards"
            document.getElementById("recipe_count").className =
                "recipe_text blue_shards"
            break
        case 4:
            document.getElementById("recipe_type").innerHTML = "PINK"
            document.getElementById("recipe_type").className =
                "recipe_text pink_shards"
            document.getElementById("recipe_count").className =
                "recipe_text pink_shards"
            break
        case 5:
            document.getElementById("recipe_type").innerHTML = "RAINBOW"
            document.getElementById("recipe_type").className =
                "recipe_text rainbow_shards"
            document.getElementById("recipe_count").className =
                "recipe_text rainbow_shards"
            break
        case 6:
            document.getElementById("recipe_type").innerHTML = "DARK"
            document.getElementById("recipe_type").className =
                "recipe_text dark_shards"
            document.getElementById("recipe_count").className =
                "recipe_text dark_shards"
            break
    }

    document.getElementById("level_count").style.width = "auto"
    document.getElementById("recipe_count").style.width = "auto"
    document.getElementById("recipe_type").style.width = "auto"
    let max_width = 0
    let width = document.getElementById("level_count").offsetWidth
    if (width > max_width) max_width = width
    width = document.getElementById("recipe_count").offsetWidth
    if (width > max_width) max_width = width
    width = document.getElementById("recipe_type").offsetWidth
    if (width > max_width) max_width = width
    document.getElementById("level_count").style.width = max_width + "px"
    document.getElementById("recipe_count").style.width = max_width + "px"
    document.getElementById("recipe_type").style.width = max_width + "px"

    if (game.preview !== null) {
        if (game.recipe[1] === 0) {
            document.getElementById("preview_crystal").style.display = "none"
            document.getElementById("preview_level").style.display = "none"
            document.getElementById("craft_button").style.display = "none"
            document.getElementById("preview_essence").innerHTML =
                "You must use at least one exotic shard to craft a galactic crystal"
        } else {
            const shard_type = [
                "red",
                "yellow",
                "green",
                "blue",
                "pink",
                "rainbow",
                "dark",
            ]

            document.getElementById("preview_crystal").style.display =
                "inline-block"
            document.getElementById("preview_crystal").className =
                shard_type[game.recipe[0]] + "_crystal"
            document.getElementById("crystal_img").src =
                "img/" + shard_type[game.recipe[0]] + "_crystal.png"

            document.getElementById("preview_level").style.display = "block"
            document.getElementById("preview_level").innerHTML =
                "Galactic Crystal<br>LVL " +
                format_num(game.preview.level, game.notation)

            let str =
                '<span class="' +
                shard_type[game.preview.type] +
                '_spice">' +
                format_dec(game.preview.essence, game.notation) +
                "% " +
                shard_type[game.preview.type] +
                " essence"
            for (let i = 0; i < game.preview.effects.length; i++) {
                str +=
                    "<br>" +
                    interpret_effect(
                        game.preview.type,
                        game.preview.effects[i],
                        game.preview.essence,
                        game.preview.level,
                        game.preview.effects.length
                    )
            }
            str += "</span>"
            document.getElementById("preview_essence").innerHTML = str

            document.getElementById("craft_button").style.display = "block"
            let price = fib(232 + 4 * game.crystal_level, true)
            const shard_mul = [1, 10, 100, 1000, 10000, 1e36, 1e81]
            const shard_power = [1, 1.025, 1.05, 1.075, 1.1, 1.15, 1.2]
            let base = 1 + game.recipe[1] / 15
            let mult = Decimal.pow(
                base,
                6.898 +
                    17.1 *
                        (Math.max(Math.log(game.recipe[1]), 0) /
                            Math.log(6e14)) **
                            2
            ).pow(shard_power[game.recipe[0]])
            price = price.mul(mult).mul(shard_mul[game.recipe[0]])
            document.getElementById("craft_price").innerHTML =
                "-" +
                format_inum(price.floor(), game.notation) +
                " galactic shards"
            if (game.galactic_shards.cmp(price) >= 0) {
                document.getElementById("craft_price").className =
                    "galactic_cost"
            } else {
                document.getElementById("craft_price").className = "empty_cost"
            }
        }
    } else {
        document.getElementById("preview_crystal").style.display = "none"
        document.getElementById("preview_level").style.display = "none"
        document.getElementById("craft_button").style.display = "none"
        document.getElementById("preview_essence").innerHTML =
            "Add exotic shards to craft a galactic crystal!"
    }

    if (game.galactic_bought[24])
        document.getElementById("slot32").style.display = "block"
    else document.getElementById("slot32").style.display = "none"
    document.getElementById("slot33").style.display = "none"
    document.getElementById("slot34").style.display = "none"

    if (game.selected_slot[0] !== -1) {
        if (game.selected_slot[0] >= 30) {
            if (game.equip[game.selected_slot[0] - 30] !== null) {
                document.getElementById("inventory_center").style.display =
                    "none"
                document.getElementById("equipped_center").style.display =
                    "none"

                if (game.selected_slot[1] === -1) {
                    document.getElementById("equipped_center").style.display =
                        "flex"
                    document.getElementById("unequip_button").style.display =
                        "block"
                    document.getElementById("scrap_button2").style.display =
                        "block"
                } else {
                    document.getElementById("unequip_button").style.display =
                        "none"
                    document.getElementById("scrap_button2").style.display =
                        "none"
                }

                if (game.selected_slot[1] !== -1) {
                    if (game.selected_slot[1] >= 30) {
                        document.getElementById(
                            "equipped_center"
                        ).style.display = "flex"
                        if (game.equip[game.selected_slot[1] - 30] === null) {
                            document.getElementById(
                                "move_button2"
                            ).style.display = "block"
                            document.getElementById(
                                "swap_button2"
                            ).style.display = "none"
                        } else {
                            document.getElementById(
                                "move_button2"
                            ).style.display = "none"
                            document.getElementById(
                                "swap_button2"
                            ).style.display = "block"
                        }
                    } else {
                        if (game.inventory[game.selected_slot[1]] === null) {
                            document.getElementById(
                                "equipped_center"
                            ).style.display = "flex"
                            document.getElementById(
                                "unequip_button"
                            ).style.display = "block"
                            document.getElementById(
                                "move_button2"
                            ).style.display = "none"
                            document.getElementById(
                                "swap_button2"
                            ).style.display = "none"
                        } else {
                            document.getElementById(
                                "inventory_center"
                            ).style.display = "flex"
                            document.getElementById(
                                "move_button"
                            ).style.display = "none"
                            document.getElementById(
                                "swap_button"
                            ).style.display = "block"
                        }
                    }
                } else {
                    document.getElementById("move_button").style.display =
                        "none"
                    document.getElementById("swap_button").style.display =
                        "none"
                    document.getElementById("move_button2").style.display =
                        "none"
                    document.getElementById("swap_button2").style.display =
                        "none"
                }
            } else {
                document.getElementById("inventory_center").style.display =
                    "none"
                document.getElementById("equipped_center").style.display =
                    "none"
            }
        } else {
            document.getElementById("equipped_center").style.display = "none"

            if (game.inventory[game.selected_slot[0]] !== null) {
                document.getElementById("inventory_center").style.display =
                    "flex"

                if (game.selected_slot[1] === -1) {
                    if (
                        game.equip[0] === null ||
                        game.equip[1] === null ||
                        (game.equip[2] === null && game.galactic_bought[24])
                    )
                        document.getElementById("equip_button").style.display =
                            "block"
                    else
                        document.getElementById("equip_button").style.display =
                            "none"
                    document.getElementById("scrap_button").style.display =
                        "block"
                } else {
                    document.getElementById("equip_button").style.display =
                        "none"
                    document.getElementById("scrap_button").style.display =
                        "none"
                }

                if (game.selected_slot[1] !== -1) {
                    if (game.selected_slot[1] >= 30) {
                        if (game.equip[game.selected_slot[1] - 30] === null) {
                            document.getElementById(
                                "equip_button"
                            ).style.display = "block"
                            document.getElementById(
                                "move_button"
                            ).style.display = "none"
                            document.getElementById(
                                "swap_button"
                            ).style.display = "none"
                        } else {
                            document.getElementById(
                                "move_button"
                            ).style.display = "none"
                            document.getElementById(
                                "swap_button"
                            ).style.display = "block"
                        }
                    } else {
                        if (game.inventory[game.selected_slot[1]] === null) {
                            document.getElementById(
                                "move_button"
                            ).style.display = "block"
                            document.getElementById(
                                "swap_button"
                            ).style.display = "none"
                        } else {
                            document.getElementById(
                                "move_button"
                            ).style.display = "none"
                            document.getElementById(
                                "swap_button"
                            ).style.display = "block"
                        }
                    }
                } else {
                    document.getElementById("move_button").style.display =
                        "none"
                    document.getElementById("swap_button").style.display =
                        "none"
                }
            } else {
                document.getElementById("inventory_center").style.display =
                    "none"
            }
        }
    } else {
        document.getElementById("inventory_center").style.display = "none"
        document.getElementById("equipped_center").style.display = "none"
    }

    if (game.selected_slot[0] !== -1 || game.hovered_slot !== -1) {
        let crystal = null
        if (game.hovered_slot !== -1) {
            if (game.hovered_slot >= 30) {
                if (game.equip[game.hovered_slot - 30] !== null)
                    crystal = game.equip[game.hovered_slot - 30]
            } else {
                if (game.inventory[game.hovered_slot] !== null)
                    crystal = game.inventory[game.hovered_slot]
            }
        }
        if (game.selected_slot[0] !== -1 && crystal === null) {
            if (game.selected_slot[0] >= 30) {
                if (game.equip[game.selected_slot[0] - 30] !== null)
                    crystal = game.equip[game.selected_slot[0] - 30]
            } else {
                if (game.inventory[game.selected_slot[0]] !== null)
                    crystal = game.inventory[game.selected_slot[0]]
            }
        }

        if (crystal !== null) {
            document.getElementById("crystal_info_panel").style.visibility =
                "visible"

            if (crystal.new) {
                const shard_type = [
                    "red",
                    "yellow",
                    "green",
                    "blue",
                    "pink",
                    "rainbow",
                    "dark",
                ]

                document.getElementById("inventory_crystal").className =
                    shard_type[crystal.type] + "_crystal"
                document.getElementById("inventory_img").src =
                    "img/" + shard_type[crystal.type] + "_crystal.png"

                document.getElementById("inventory_level").innerHTML =
                    "Galactic Crystal<br>LVL " +
                    format_num(crystal.level, game.notation)

                let str =
                    '<span class="' +
                    shard_type[crystal.type] +
                    '_spice">' +
                    format_dec(crystal.essence, game.notation) +
                    "% " +
                    shard_type[crystal.type] +
                    " essence"
                for (let i = 0; i < crystal.effects.length; i++) {
                    str +=
                        "<br>" +
                        interpret_effect(
                            crystal.type,
                            crystal.effects[i],
                            crystal.essence,
                            crystal.level,
                            crystal.effects.length
                        )
                }
                str += "</span>"
                if (crystal.recipe !== undefined) {
                    str +=
                        '<br><br><span class="recipe_text2">Recipe:</span>' +
                        ' <span class="recipe_text3 ' +
                        shard_type[crystal.type] +
                        '_shards">' +
                        format_num(crystal.recipe, game.notation) +
                        " " +
                        shard_type[crystal.type] +
                        " shards</span>"
                }

                document.getElementById("inventory_essence").innerHTML = str
            } else {
                document.getElementById("inventory_crystal").className =
                    "crystal_type" + crystal.essence.length
                document.getElementById("inventory_img").src =
                    "img/crystal" + crystal.essence.length + ".png"
                for (let i = 1; i <= crystal.essence.length; i++) {
                    switch (crystal.essence[i - 1][0]) {
                        case 0:
                            document
                                .getElementById("inventory_crystal")
                                .style.setProperty("--color" + i, "#ff2714")
                            break
                        case 1:
                            document
                                .getElementById("inventory_crystal")
                                .style.setProperty("--color" + i, "#ffd107")
                            break
                        case 2:
                            document
                                .getElementById("inventory_crystal")
                                .style.setProperty("--color" + i, "#25dd8a")
                            break
                        case 3:
                            document
                                .getElementById("inventory_crystal")
                                .style.setProperty("--color" + i, "#0072ff")
                            break
                        case 4:
                            document
                                .getElementById("inventory_crystal")
                                .style.setProperty("--color" + i, "#ff3dd8")
                            break
                    }
                }

                document.getElementById("inventory_level").innerHTML =
                    "Galactic Crystal<br>LVL " +
                    format_num(crystal.level, game.notation)

                let str = ""
                const shard_type = [
                    "red",
                    "yellow",
                    "green",
                    "blue",
                    "pink",
                    "rainbow",
                    "dark",
                ]
                for (let i = 0; i < crystal.essence.length; i++) {
                    if (str === "") {
                        str =
                            '<span class="' +
                            shard_type[crystal.essence[i][0]] +
                            '_spice">' +
                            format_dec(crystal.essence[i][1], game.notation) +
                            "% " +
                            shard_type[crystal.essence[i][0]] +
                            " essence"
                        for (let j = 0; j < crystal.effects[i].length; j++) {
                            str +=
                                "<br>" +
                                interpret_effect(
                                    crystal.essence[i][0],
                                    crystal.effects[i][j],
                                    crystal.essence[i][1],
                                    crystal.level,
                                    crystal.effects[i].length
                                )
                        }
                        str += "</span>"
                    } else {
                        str +=
                            '<br><br><span class="' +
                            shard_type[crystal.essence[i][0]] +
                            '_spice">' +
                            format_dec(crystal.essence[i][1], game.notation) +
                            "% " +
                            shard_type[crystal.essence[i][0]] +
                            " essence"
                        for (let j = 0; j < crystal.effects[i].length; j++) {
                            str +=
                                "<br>" +
                                interpret_effect(
                                    crystal.essence[i][0],
                                    crystal.effects[i][j],
                                    crystal.essence[i][1],
                                    crystal.level,
                                    crystal.effects[i].length
                                )
                        }
                        str += "</span>"
                    }
                }
                if (crystal.recipe !== undefined) {
                    str += '<br><br><span class="recipe_text2">Recipe:</span>'
                    for (let i = 0; i < 7; i++) {
                        if (crystal.recipe[i] > 0) {
                            str +=
                                ' <span class="recipe_text3 ' +
                                shard_type[i] +
                                '_shards">' +
                                format_num(crystal.recipe[i], game.notation) +
                                "</span>"
                        }
                    }
                }
                str +=
                    "<br><br>This galactic crystal was created before v1.9.0 β9 and has no effect!"

                document.getElementById("inventory_essence").innerHTML = str
            }
        } else {
            document.getElementById("crystal_info_panel").style.visibility =
                "hidden"
        }
    } else {
        document.getElementById("crystal_info_panel").style.visibility =
            "hidden"
    }

    let crystal_effects = ["", "", "", "", "", ""]
    let color = ["red", "yellow", "green", "blue", "pink", "rainbow"]
    let color_cap = ["Red", "Yellow", "Green", "Blue", "Pink", "Rainbow"]
    let equipped = 0

    for (let i = 0; i < 5; i++) {
        let crystal = game.equip[i]
        if (crystal !== null) {
            if (crystal.new) {
                equipped++

                for (let j = 0; j < crystal.effects.length; j++) {
                    switch (crystal.effects[j]) {
                        case 0:
                            switch (crystal.type) {
                                case 5:
                                    if (crystal_effects[crystal.type] !== "")
                                        crystal_effects[crystal.type] += "<br>"
                                    crystal_effects[crystal.type] +=
                                        "Rainbow " +
                                        spice_text[0] +
                                        " gain " +
                                        format_idec(
                                            game.crystal_boost[crystal.type][0],
                                            game.notation
                                        ) +
                                        "x"
                                    break
                                default:
                                    if (crystal_effects[crystal.type] !== "")
                                        crystal_effects[crystal.type] += "<br>"
                                    crystal_effects[crystal.type] +=
                                        color_cap[crystal.type] +
                                        " " +
                                        spice_text[0] +
                                        " production " +
                                        format_idec(
                                            game.crystal_boost[crystal.type][0],
                                            game.notation
                                        ) +
                                        "x"
                                    break
                            }
                            break
                        case 1:
                            switch (crystal.type) {
                                case 5:
                                    if (crystal_effects[crystal.type] !== "")
                                        crystal_effects[crystal.type] += "<br>"
                                    crystal_effects[crystal.type] +=
                                        "Crystal strengtheners are " +
                                        format_dec(
                                            game.crystal_boost[crystal.type][1],
                                            game.notation
                                        ) +
                                        "x stronger"
                                    break
                                default:
                                    if (crystal_effects[crystal.type] !== "")
                                        crystal_effects[crystal.type] += "<br>"
                                    crystal_effects[crystal.type] +=
                                        color_cap[crystal.type] +
                                        " strengtheners are " +
                                        format_dec(
                                            game.crystal_boost[crystal.type][1],
                                            game.notation
                                        ) +
                                        "x stronger"
                                    break
                            }
                            break
                        case 2:
                            switch (crystal.type) {
                                case 0:
                                    if (crystal_effects[0] !== "")
                                        crystal_effects[0] += "<br>"
                                    crystal_effects[0] +=
                                        "Pre-Expansion synergies are " +
                                        format_dec(
                                            game.crystal_boost[0][2] * 100 -
                                                100,
                                            game.notation
                                        ) +
                                        "% stronger"
                                    break
                                case 1:
                                    if (crystal_effects[1] !== "")
                                        crystal_effects[1] += "<br>"
                                    crystal_effects[1] +=
                                        "Color boosts are " +
                                        format_dec(
                                            game.crystal_boost[1][2],
                                            game.notation
                                        ) +
                                        "x stronger"
                                    break
                                case 2:
                                    if (crystal_effects[2] !== "")
                                        crystal_effects[2] += "<br>"
                                    crystal_effects[2] +=
                                        "Crystal infusions & arcane enchantments are " +
                                        format_dec(
                                            game.crystal_boost[2][2] * 100 -
                                                100,
                                            game.notation
                                        ) +
                                        "% stronger"
                                    break
                                case 3:
                                    if (crystal_effects[3] !== "")
                                        crystal_effects[3] += "<br>"
                                    crystal_effects[3] +=
                                        "Research is " +
                                        format_dec(
                                            game.crystal_boost[3][2],
                                            game.notation
                                        ) +
                                        "x faster"
                                    break
                                case 4:
                                    if (crystal_effects[4] !== "")
                                        crystal_effects[4] += "<br>"
                                    crystal_effects[4] +=
                                        "Crystallized " +
                                        spice_text[0] +
                                        " production " +
                                        format_idec(
                                            game.crystal_boost[4][2],
                                            game.notation
                                        ) +
                                        "x"
                                    break
                                case 5:
                                    if (crystal_effects[5] !== "")
                                        crystal_effects[5] += "<br>"
                                    crystal_effects[crystal.type] +=
                                        "Sixth generators are " +
                                        format_dec(
                                            game.crystal_boost[
                                                crystal.type
                                            ][2] *
                                                100 -
                                                100,
                                            game.notation
                                        ) +
                                        "% stronger"
                                    break
                            }
                            break
                        case 3:
                            let position = [
                                "First",
                                "Second",
                                "Third",
                                "Fourth",
                                "Fifth",
                            ]
                            crystal_effects[crystal.type] +=
                                "<br>" +
                                position[crystal.type] +
                                " generators are " +
                                format_dec(
                                    game.crystal_boost[crystal.type][3] * 100 -
                                        100,
                                    game.notation
                                ) +
                                "% stronger"
                            break
                    }
                }
            }
        }
    }

    if (equipped === 0) {
        document.getElementById("total_crystal_effects").innerHTML = "None"
    } else {
        let str = ""
        const shard_type = [
            "red",
            "yellow",
            "green",
            "blue",
            "pink",
            "rainbow",
            "dark",
        ]

        for (let i = 0; i < 6; i++) {
            if (crystal_effects[i] !== "") {
                if (str === "") {
                    str =
                        '<span class="' +
                        shard_type[i] +
                        '_spice">' +
                        crystal_effects[i] +
                        "</span>"
                } else {
                    str +=
                        '<br><br><span class="' +
                        shard_type[i] +
                        '_spice">' +
                        crystal_effects[i] +
                        "</span>"
                }
            }
        }

        if (equipped >= 3) {
            str +=
                "<br><br>These effects have been slightly reduced due to having 3+ crystals equipped"
        }

        document.getElementById("total_crystal_effects").innerHTML = str
    }
}
