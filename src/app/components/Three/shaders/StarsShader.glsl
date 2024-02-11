// Author @patriciogv - 2015
// Title: Mosaic

#ifdef GL_ES
precision mediump float;
#endif

varying vec2 texture_uv;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec2 u_cells_count;
uniform float u_line_width;
uniform vec3 u_background_color;
uniform vec3 u_stars_color;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
        43758.5453123);
}

float noise(in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm(in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for(int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

bool is_between(float value, float min, float max) {
    return value >= min && value <= max;
}

bool is_segment_border(vec2 pixel_cord, vec2 segment_coords_min, vec2 segment_coords_max) {
    return (is_between(pixel_cord.x, segment_coords_min.x, segment_coords_min.x + u_line_width) ||
        is_between(pixel_cord.x, segment_coords_max.x - u_line_width, segment_coords_max.x) ||
        is_between(pixel_cord.y, segment_coords_min.y, segment_coords_min.y + u_line_width) ||
        is_between(pixel_cord.y, segment_coords_max.y - u_line_width, segment_coords_max.y));
}

bool is_mouse_in_segment(vec2 mouse_cord, vec2 segment_coords_min, vec2 segment_coords_max) {
    return mouse_cord.x >= segment_coords_min.x && mouse_cord.y >= segment_coords_min.y &&
        mouse_cord.x <= segment_coords_max.x && mouse_cord.y <= segment_coords_max.y;
}

void main() {
    // STARS
    float s = (cos(u_time / 10.0) + 1.0) / 2.0 * 0.04 + 0.95;
    float star_grid = smoothstep(s, 1.0, random(texture_uv));

    // MIST
    vec2 st = texture_uv.xy * 3.0;
    float mist = 0.0;
    vec2 q = vec2(0.);
    q.x = fbm(st + 0.00 * u_time);
    q.y = fbm(st + vec2(1.0));
    vec2 r = vec2(0.);
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

    mist = mix(mist, 1.0, clamp(length(r.x), 0.0, 1.0));
    float filtered_mist = smoothstep(0.35, 1.0, mist) + .005;

    // MOUSE
    float aspect = u_resolution.x / u_resolution.y;
    vec2 mouse_centered = (u_mouse + 1.0) / 2.0;
    // mouse_centered.y = .5;
    // mouse_centered.x = .5;
    vec2 diff = texture_uv - mouse_centered;
    diff.x *= aspect;
    float dist = (length(diff) * -1.0) + 1.0;
    float mouse_highlight = clamp(pow(dist, 50.0), 0.0, 1.0);

    // SEGMENTS
    // vec2 segment_size = u_resolution / u_cells_count;//vec2(2., 4.);
    // vec2 pixel_cord = floor(texture_uv * u_resolution);
    // vec2 segment_index = floor(pixel_cord / segment_size);
    // vec2 segment_coords_min = vec2(segment_index * segment_size);
    // vec2 segment_coords_max = vec2(segment_index * segment_size + segment_size);
    // vec3 segment_border = vec3(0.0);
    // vec3 segment_highlight = vec3(0.0);
    // vec2 mouse_cord = mouse_centered * u_resolution;
    // if(is_mouse_in_segment(mouse_cord, segment_coords_min, segment_coords_max)) {
    //     segment_highlight = vec3(.1);
    // }
    // if(is_segment_border(pixel_cord, segment_coords_min, segment_coords_max)) {
    //     segment_border = vec3(1.0);
    // }
    // vec3 segment_mouse = segment_border * clamp(vec3(pow(dist, 20.0) / 2.0), 0.0, 1.0);
    // vec3 star_map = max(filtered_mist, mouse_highlight + segment_highlight) * star_grid + segment_mouse;
    
    gl_FragColor = vec4(mix(u_background_color, u_stars_color, star_grid * max(filtered_mist, mouse_highlight)), 1.0);
    // gl_FragColor = vec4(vec3(star_grid * max(filtered_mist, mouse_highlight)), 1.0);
}