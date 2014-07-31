function debug_load()
{
    setTimeout(function() {

        $('#dev_reload').click(function() {
            location.reload();
        });
        $('#dev_to_first').click(function() {
            localStorage.setItem("firststartup", "true")
        });
        ;
        $('#cur_day span').html(day);
        $('#debug_day').change(function() {
            set_value('day', 'current_day', this.value).done(function(result) {
                set_day();
                reinit_switches(true);
            });
        });
        $('#debug_time').change(function() {

//{"current_day":"Saturday"}
            set_value('time', 'time', this.value);
            var tim = (this.value).split(":");
            time.setMinutes(tim[1]);
            time.setHours(tim[0]);
            reinit_switches(true);
        });
    }, 500);
}